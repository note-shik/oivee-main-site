import { z } from 'zod'

export const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name is too long')
    .transform((v) => v.trim()),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(200, 'Email is too long')
    .transform((v) => v.trim().toLowerCase()),
  phone: z
    .string()
    .max(20, 'Phone number is too long')
    .optional()
    .transform((v) => v?.trim()),
  business_name: z
    .string()
    .max(200, 'Business name is too long')
    .optional()
    .transform((v) => v?.trim()),
  message: z
    .string()
    .max(2000, 'Message is too long')
    .optional()
    .transform((v) => v?.trim()),
  source: z.enum(['website', 'whatsapp', 'ads']).default('website'),
})

export type LeadInput = z.input<typeof leadSchema>
export type LeadData = z.output<typeof leadSchema>

export const trackEventSchema = z.object({
  event: z.string().min(1).max(100),
  metadata: z.record(z.string(), z.unknown()).optional(),
})

export type TrackEventInput = z.input<typeof trackEventSchema>
