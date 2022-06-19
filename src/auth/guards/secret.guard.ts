import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class SecretGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const head = {
      apiSecret: request.headers['client_secret'],
      apiKey: request.headers['api_key'],
    };
    const keyUser = await this.authService.getKeyUser(head);
    if (keyUser) {
      request.user = keyUser;
      return true;
    }
    return false;
  }
}
