import type { FieldValues, UseFormSetError } from 'react-hook-form';
import type { ZodSafeParseError } from 'zod/v4';

export function setValidationErrors<T extends FieldValues>(result: ZodSafeParseError<T>, setError: UseFormSetError<T>) {
  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as Parameters<typeof setError>[0];
    setError(field, { message: issue.message });
  });
}
