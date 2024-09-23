import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  appName: process.env.APP_NAME || 'Learning App',
  appVersion: process.env.APP_VERSION || '1.0.0',
}));
