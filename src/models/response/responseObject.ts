import { Response } from 'express';
import { HttpRequestError } from '../../helpers/http-request-error';

export class ResponseObject<T> {
  success: boolean;
  data: T | null;
  message: string;
  code: number;

  private defaultErrorCode = 400;
  private defaultErrorMessage = 'Bad Request!';

  constructor(success: boolean, data: T | null, message: string, code = 200) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.code = code;
  }

  setStatus(status: number) {
    this.code = status;
  }

  setBody(body: any) {
    this.data = body;
  }

  setError(error: any, logError = true) {
    this.setStatus(error.code || this.defaultErrorCode);
    this.setBody({
      error: true,
      message: this.getErrorMessage(error),
      errorBody: error.body,
    });

    // Validation errors are not logged intentionally,
    // as they are not considered useful and might obscure real errors.
    logError && !this.isValidationError(error) && this.logError(error);
  }

  private isValidationError(error: any): boolean {
    // Add your validation error logic here
    return error instanceof HttpRequestError;
  }

  private getErrorMessage(error: any): string {
    if (error instanceof HttpRequestError) {
      return error.message;
    }

    return this.defaultErrorMessage;
  }

  private logError(error: any) {
    console.error('RESPONSE-ERROR-NAME: ', error.name);
    console.error('RESPONSE-ERROR-MESSAGE: ', error.message);
    console.error('RESPONSE-ERROR-STACK: ', error.stack);
  }

  send(res: Response) {
    res.status(this.code).json(this.data);
  }
}
