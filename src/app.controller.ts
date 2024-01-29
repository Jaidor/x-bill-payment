import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * Check health 
   * status
   * @returns string
   */

  @Get()
  getHealthStatus(): string {
    return this.appService.getHealthStatus();
  }
}
