import { HttpStatus } from '@nestjs/common';

/**
 * Response status
 */
export const responseStatus = {
    SUCCESS: true,
    FAILED: false,
};

/**
 * Success definition
 * message
 */
export const successResponseMessage = {
  SUCCESS_SIGNEDUP_MESSAGE: "Congratulations! You have successfully signed up",
  SUCCESS_LOGIN_MESSAGE: "Login was successful",
  SUCCESS_FETCHED_MESSAGE: "Record fetched successfully",
  SUCCESS_WALLET_FUNDING_MESSAGE: "Your wallet has been funded successfully"
};

/**
 * Error definiton
 * message
 */
export const errorResponseMessage = {
  NOT_FOUND: "Record not found",
  SERVER_ERROR: "Internal server error",
  BAD_REQUEST: "Invalid request sent",
  UNIQUE: "Record already exist",
  FAILED_SIGNEDUP_MESSAGE: "Unable to signup, please try again later",
  FAILED_LOGIN_MESSAGE: "Unable to login, please try again later",
  FAILED_FETCHED_MESSAGE: "Unable to fetch record",
  FAILED_WALLET_FUNDING_MESSAGE: "Unable to fund your wallet, please try again later"
};

/**
 * Exception message
 */
export class Exceptions {
  static getResponse(code: string){
    let status: any;
    switch (code) {
      case 'P2000':
        status = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: errorResponseMessage.BAD_REQUEST,
          status: responseStatus.FAILED,
          data: []
        }
        break;
      case 'P2002':
        status = {
          statusCode: HttpStatus.CONFLICT,
          message: errorResponseMessage.UNIQUE,
          status: responseStatus.FAILED,
          data: []
        }
        break;
      case 'P2025':
        status = {
          statusCode: HttpStatus.NOT_FOUND,
          message: errorResponseMessage.NOT_FOUND,
          status: responseStatus.FAILED,
          data: []
        }
        break;
      default:
        status = {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: errorResponseMessage.SERVER_ERROR,
          status: responseStatus.FAILED,
          data: []
        };
        break;
    }
      return status;
  }
}
