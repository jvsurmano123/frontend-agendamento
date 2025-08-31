import { z } from 'zod'

// Schema para validação do perfil do negócio
export const businessProfileSchema = z.object({
  business_name: z
    .string()
    .min(1, 'Nome do negócio é obrigatório')
    .min(2, 'Nome do negócio deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do negócio deve ter no máximo 100 caracteres')
    .trim(),
})

// Schema para validação de serviços
export const serviceSchema = z.object({
  name: z
    .string()
    .min(1, 'Nome do serviço é obrigatório')
    .min(2, 'Nome do serviço deve ter pelo menos 2 caracteres')
    .max(100, 'Nome do serviço deve ter no máximo 100 caracteres')
    .trim(),
  duration: z
    .number()
    .min(15, 'Duração mínima é de 15 minutos')
    .max(480, 'Duração máxima é de 8 horas')
    .int('Duração deve ser um número inteiro'),
})

// Schema para validação de disponibilidade
export const availabilitySchema = z.object({
  day_of_week: z
    .number()
    .min(0, 'Dia da semana deve ser entre 0 e 6')
    .max(6, 'Dia da semana deve ser entre 0 e 6')
    .int('Dia da semana deve ser um número inteiro'),
  start_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de horário inválido (HH:MM)')
    .min(1, 'Horário de início é obrigatório'),
  end_time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Formato de horário inválido (HH:MM)')
    .min(1, 'Horário de fim é obrigatório'),
}).refine((data) => data.start_time < data.end_time, {
  message: 'Horário de início deve ser anterior ao horário de fim',
  path: ['start_time']
})

// Schema para array de disponibilidades
export const availabilityArraySchema = z.array(availabilitySchema)

// Tipos TypeScript derivados dos schemas
export type BusinessProfile = z.infer<typeof businessProfileSchema>
export type Service = z.infer<typeof serviceSchema>
export type Availability = z.infer<typeof availabilitySchema>