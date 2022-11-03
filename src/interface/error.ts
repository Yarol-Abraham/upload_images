export interface dataError {
    message: string;
    status: string;
    statusCode: number;
    isOperational: boolean;
    stack: any
}

export interface fieldError {
    name: string;
    message: string;
}