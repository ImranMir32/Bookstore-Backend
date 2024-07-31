import { Response } from 'express';
import { ResponseObject } from '../models/response/responseObject';

export const response = async (
  res: Response,
  payload: () => Promise<any>,
  successStatus = 200,
  headers = {} as any,
): Promise<void> => {
  const responseObject = new ResponseObject<any>(true, null, '', successStatus);

  try {
    const data = await payload();
    responseObject.data = data;
    responseObject.message = 'Success';

    // Attach headers if provided
    Object.keys(headers).forEach((headerKey) => {
      res.setHeader(headerKey, headers[headerKey]);
    });

    responseObject.send(res);
  } catch (error: any) {
    responseObject.setError(error);
    responseObject.send(res);
  }
};
