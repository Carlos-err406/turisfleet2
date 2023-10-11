import { error, type HttpError_1 } from '@sveltejs/kit';
import type { ErrorCode } from './types/ErrorCodes';

export default class CustomError extends Error {
    public body: { detail: { exception_id: ErrorCode; message: string } };

    public constructor(exception_id: ErrorCode, message: string) {
        super(message);
        this.body = {
            detail: {
                exception_id: exception_id,
                message: message
            }
        };
    }
}

export class CustomHttpError implements HttpError_1 {
    public error: { exceptionId: ErrorCode; message: string };
    public status: number;
    public body: App.Error;

    public constructor(status: number, exceptionId: ErrorCode, message?: string) {
        this.status = status
        this.body = { message: message ?? '' }
        this.error = {
            exceptionId,
            message: message ?? ''
        };
    }
    public build(): HttpError_1 {
        return error(this.status, this.error)
    }
    public throw() {
        throw this.build()
    }
}
