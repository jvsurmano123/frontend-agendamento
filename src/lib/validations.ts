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

// Tipos TypeScript derivados dos schemas
export type BusinessProfile = z.infer<typeof businessProfileSchema>
export type Service = z.infer<typeof serviceSchema>