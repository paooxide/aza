export const appConstant = {
  APP_BASE_URL: process.env.AZA_BASE_URL,
  REDIS: {
    MODE: {
      EX: 'EX',
      REDIS_DURATION: 86400,
    },
  },
  REDIS_CONNECTION_FAILED: 'Redis connection failed',
  TOKENS: {
    REFRESH: {
      REDIS_DURATION: 7776000, // in seconds
      JWT_DURATION: '90d',
    },
  },
  OTP: {
    REDIS_DURATION: 180, // in seconds
  },
  S3: {
    PROFILE_BUCKET_NAME:
      'thumbnailerstack-allimagesbucket8fed7bdd-izhknl4w51f1',
  },
  REGEX: {
    PASSWORD:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"#$%&'()+,-.:;<=>?@[\]^_`{|}~*])(?=.{8,})/,
    VERIFY_MESSAGE:
      'it should contain atleast one lowercase, uppercase, number, special character, and minimum 8 character length',
  },
  CLAIMS: {
    EXP_TIME: 24, // in hour
  },
};
