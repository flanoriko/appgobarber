import { ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}
export default function getValidationErros(err: ValidationError): Errors {
  const validationErrors: Errors = {};
  err.inner.forEach(element => {
    validationErrors[element.path] = element.message;
  });

  return validationErrors;
}
