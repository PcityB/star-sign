import { z } from 'zod';

export const signUpRequestSchema = z.object({
  name: z.string().min(1, 'Name must be at least 1 character long'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 6 characters long'),
});

export const signUpRequestSchemaFront = z
  .object({
    name: z.string().min(1, 'Name must be at least 3 character long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 6 characters long'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const signInRequestSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export const UserPatchRequestSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required' })
    .max(100, { message: 'Name must be at most 100 characters' })
    .optional(),

  gender: z.enum(['male', 'female', 'other']).optional(),

  birthTimestamp: z.date().optional(),

  birthLongitude: z.string().optional(),

  birthLatitude: z.string().optional(),

  birthCity: z.string().max(200, { message: 'City of birth must be at most 200 characters' }).optional(),
  birthCountry: z.string().max(200, { message: 'Country of birth must be at most 200 characters' }).optional(),

  photos: z
    .array(z.union([z.instanceof(File), z.string().url()]))
    .max(10, { message: 'No more than 10 photos are allowed.' })
    .optional(),

  description: z.string().max(500, { message: 'Description must be at most 500 characters' }).optional(),
});
