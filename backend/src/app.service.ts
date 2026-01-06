import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      status: 'success',
      service: 'Tech-Xpression API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      message: 'System Operational'
    };
  }
}
