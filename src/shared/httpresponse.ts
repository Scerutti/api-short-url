import { HttpStatus } from '@nestjs/common';

export type HttpResponse<T> = SuccessResponse<T> | ErrorResponse;

interface SuccessResponse<T> {
  data: T;
  httpStatus: HttpStatus;
}

interface ErrorResponse {
  message: string;
  httpStatus: HttpStatus;
}