export class HttpRequestError extends Error {
  code: number;
  body: any;
  name = 'HttpRequestError';

  constructor(message?: string, code = 400, body?: any) {
    // 'Error' breaks prototype chain here
    super(message);

    this.code = code;
    this.body = body;

    // restore prototype chain
    const actualProto = new.target.prototype;

    Object.setPrototypeOf(this, actualProto);
  }
}
