import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const statusCode = exception.getStatus();
      const responseBody = (exception.getResponse() as any) ?? {};
      console.log(exception);
      return response.status(statusCode).json({
        statusCode,
        ...responseBody,
        status: false,
        data: [],
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
  