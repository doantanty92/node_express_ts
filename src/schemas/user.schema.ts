import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
    password: string({
      required_error: 'Password is required',
    })
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /(?=.*[A-Za-z])(?=.*\d).{8,}/,
        'Password must contain at least one letter and one number'
      ),
    confirmPassword: string({
      required_error: 'Password confirmation is required',
    }),
    firstName: string({
      required_error: 'First name is required',
    }),
    lastName: string({
      required_error: 'Last name is required',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
});

export const verifyUserSchema = object({
  query: object({
    token: string({
      required_error: 'Token is required',
    }),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['query'];
