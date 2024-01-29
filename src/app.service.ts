import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  /**
   * Health check
   * @returns string
   */
  getHealthStatus(): string {
    return 'X bill payment application is healthy!';
  }
}
