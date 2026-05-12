import { z } from 'zod/v4';

const envSchema = z.object({
  VITE_API_URL: z.string().default('http://localhost:5173/api'),
  VITE_MSW_ENABLED: z
    .string()
    .default('false')
    .transform((v) => v === 'true'),
});

const parsed = envSchema.safeParse(import.meta.env);

if (!parsed.success) {
  console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
