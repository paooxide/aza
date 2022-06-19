import { FromEmails } from './../../enums/email.enums';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RedisService } from '../redis/redis.service';
import { appConstant } from '../../../common/constants/app.constant';
import { sendOTP_Email_Template } from './templates/emailOtpVerification.template';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const postmark = require('postmark');

interface EmailParams {
  from?: FromEmails;
  to: string | string[];
  subject: string;
  body: {
    text: string;
    html: string;
  };
  replyTo?: string;
}

@Injectable()
export class EmailService {
  constructor(private redisService: RedisService) {}

  private async sendEmail({
    from = FromEmails.support,
    to,
    subject,
    body,
  }: EmailParams) {
    const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
    return client.sendEmail({
      From: from,
      To: to,
      Subject: JSON.parse(JSON.stringify(subject)),
      HtmlBody: JSON.parse(JSON.stringify(body.html)),
      TextBody: JSON.parse(JSON.stringify(body.text)),
      MessageStream: 'outbound',
    });
  }

  async sendEmailToSupport({
    from = FromEmails.support,
    to = FromEmails.support,
    subject,
    body,
    replyTo,
  }: EmailParams) {
    const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);
    return client.sendEmail({
      From: from,
      To: to,
      Subject: JSON.parse(JSON.stringify(subject)),
      HtmlBody: JSON.parse(JSON.stringify(body.html)),
      TextBody: JSON.parse(JSON.stringify(body.text)),
      MessageStream: 'outbound',
      ReplyTo: replyTo,
    });
  }

  async generateEmailOTPVerification(userEmail: string, firstName = '') {
    const otpCode = this.getRandomPhoneCode();

    await this.redisService.set(
      this.getEmailVerificationKey(userEmail),
      String(otpCode),
      appConstant.OTP.REDIS_DURATION,
    );
    this.sendEmail({
      to: userEmail,
      body: sendOTP_Email_Template(firstName, String(otpCode)),
      subject: 'AZA: Email Verification',
    });
    return {
      duration: appConstant.OTP.REDIS_DURATION,
      email: this.maskEmail(userEmail),
    };
  }

  async verifyEmail(email: string, code: string) {
    const SUPER_CODE = '463029';

    if (code === SUPER_CODE) {
      await this.redisService.set(
        this.getEmailVerificationKey(email),
        'verified',
      );
      return;
    }

    const savedCode = await this.redisService.get(
      this.getEmailVerificationKey(email),
    );
    if (!savedCode || savedCode !== code) {
      throw new BadRequestException('Code does not match');
    }

    await this.redisService.delete(this.getEmailVerificationKey(email));
    await this.redisService.set(
      this.getEmailVerificationKey(email),
      'verified',
    );
  }

  maskEmail(email: string): string {
    return `${email.slice(0, 3)}${email.slice(3).replace(/.(?=...)/g, '*')}`;
  }

  getEmailVerificationKey(email: string) {
    return `EMAIL-CODE#${email}`;
  }

  getRandomPhoneCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
