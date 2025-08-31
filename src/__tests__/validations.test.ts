import { availabilitySchema, availabilityArraySchema } from '@/lib/validations'

describe('Availability Validations', () => {
  describe('availabilitySchema', () => {
    it('deve validar um objeto de disponibilidade válido', () => {
      const validAvailability = {
        day_of_week: 1,
        start_time: '09:00',
        end_time: '18:00',
      }

      const result = availabilitySchema.safeParse(validAvailability)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar day_of_week inválido (menor que 0)', () => {
      const invalidAvailability = {
        day_of_week: -1,
        start_time: '09:00',
        end_time: '18:00',
      }

      const result = availabilitySchema.safeParse(invalidAvailability)
      expect(result.success).toBe(false)
    })

    it('deve rejeitar day_of_week inválido (maior que 6)', () => {
      const invalidAvailability = {
        day_of_week: 7,
        start_time: '09:00',
        end_time: '18:00',
      }

      const result = availabilitySchema.safeParse(invalidAvailability)
      expect(result.success).toBe(false)
    })

    it('deve rejeitar formato de horário inválido', () => {
      const invalidAvailability = {
        day_of_week: 1,
        start_time: '9:00', // formato inválido
        end_time: '18:00',
      }

      const result = availabilitySchema.safeParse(invalidAvailability)
      expect(result.success).toBe(false)
    })

    it('deve rejeitar quando start_time é posterior a end_time', () => {
      const invalidAvailability = {
        day_of_week: 1,
        start_time: '18:00',
        end_time: '09:00',
      }

      const result = availabilitySchema.safeParse(invalidAvailability)
      expect(result.success).toBe(false)
    })

    it('deve rejeitar quando start_time é igual a end_time', () => {
      const invalidAvailability = {
        day_of_week: 1,
        start_time: '12:00',
        end_time: '12:00',
      }

      const result = availabilitySchema.safeParse(invalidAvailability)
      expect(result.success).toBe(false)
    })

    it('deve rejeitar campos obrigatórios ausentes', () => {
      const incompleteAvailability = {
        day_of_week: 1,
        start_time: '09:00',
        // end_time ausente
      }

      const result = availabilitySchema.safeParse(incompleteAvailability)
      expect(result.success).toBe(false)
    })
  })

  describe('availabilityArraySchema', () => {
    it('deve validar um array vazio', () => {
      const result = availabilityArraySchema.safeParse([])
      expect(result.success).toBe(true)
    })

    it('deve validar um array com múltiplas disponibilidades válidas', () => {
      const validAvailabilities = [
        {
          day_of_week: 1,
          start_time: '09:00',
          end_time: '12:00',
        },
        {
          day_of_week: 2,
          start_time: '14:00',
          end_time: '18:00',
        },
      ]

      const result = availabilityArraySchema.safeParse(validAvailabilities)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar array com disponibilidade inválida', () => {
      const invalidAvailabilities = [
        {
          day_of_week: 1,
          start_time: '09:00',
          end_time: '12:00',
        },
        {
          day_of_week: 8, // inválido
          start_time: '14:00',
          end_time: '18:00',
        },
      ]

      const result = availabilityArraySchema.safeParse(invalidAvailabilities)
      expect(result.success).toBe(false)
    })

    it('deve validar horários em formato 24h', () => {
      const validAvailabilities = [
        {
          day_of_week: 0,
          start_time: '00:00',
          end_time: '23:59',
        },
      ]

      const result = availabilityArraySchema.safeParse(validAvailabilities)
      expect(result.success).toBe(true)
    })

    it('deve rejeitar horários com minutos inválidos', () => {
      const invalidAvailabilities = [
        {
          day_of_week: 1,
          start_time: '09:60', // minutos inválidos
          end_time: '18:00',
        },
      ]

      const result = availabilityArraySchema.safeParse(invalidAvailabilities)
      expect(result.success).toBe(false)
    })
  })
})