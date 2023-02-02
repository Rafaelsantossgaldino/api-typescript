import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { SchemaOf, ValidationError } from 'yup';


type TProperty =  'body' | 'header' | 'params' | 'query';

type TAllSchemas = Record<TProperty, SchemaOf<any>>

type TValidation = (shemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (shemas) => async (req, res, next) => {
  const errorsResult:  Record<string, Record<string, string>> = {};

  Object.entries(shemas).forEach(([key, shema]) => {
    try {
      shema.validateSync(req[key as TProperty], { abortEarly: false });
    } catch (error){
      const yupError = error as ValidationError;
      const errors:  Record<string, string> = {};

      yupError.inner.forEach(error => {
        if (error.path  === undefined) return;

        errors[error.path] = error.message;
      });

      errorsResult[key] = errors;
    }
  });

  if (Object.entries(errorsResult).length === 0){
    return next();
  } else{
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errorsResult });
  }
};
