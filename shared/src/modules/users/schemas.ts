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

  email: z.string().email({ message: 'Invalid email address' }).optional(),

  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(50, { message: 'Password must be at most 50 characters' })
    .optional(),

  gender: z.enum(['male', 'female', 'other']).optional(),

  birthTimestamp: z.date().optional(),

  longitude: z.number().optional(),

  latitude: z.number().optional(),

  locationOfBirth: z.string().max(200, { message: 'Location of birth must be at most 200 characters' }).optional(),

  photos: z.array(z.string().url()).max(10, { message: 'You can upload up to 10 photos.' }).optional(),

  description: z.string().max(500, { message: 'Description must be at most 500 characters' }).optional(),

  minAge: z.number().int().min(18, { message: 'Minimum age must be at least 18' }).optional(),

  maxAge: z.number().int().max(100, { message: 'Maximum age must be at most 100' }).optional(),

  currentLocation: z.string().max(200, { message: 'Current location must be at most 200 characters' }).optional(),
});
