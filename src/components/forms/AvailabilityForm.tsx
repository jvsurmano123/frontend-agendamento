'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { availabilityArraySchema, type Availability } from '@/lib/validations'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface AvailabilityFormProps {
  onSuccess?: () => void
}

const availabilityFormSchema = z.object({
  availabilities: availabilityArraySchema,
})

type AvailabilityFormData = z.infer<typeof availabilityFormSchema>

const DAYS_OF_WEEK = [
  { value: 0, label: 'Domingo' },
  { value: 1, label: 'Segunda-feira' },
  { value: 2, label: 'Terça-feira' },
  { value: 3, label: 'Quarta-feira' },
  { value: 4, label: 'Quinta-feira' },
  { value: 5, label: 'Sexta-feira' },
  { value: 6, label: 'Sábado' },
]

const TIME_OPTIONS = Array.from({ length: 24 * 4 }, (_, i) => {
  const hour = Math.floor(i / 4)
  const minute = (i % 4) * 15
  const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  return { value: timeString, label: timeString }
})

export function AvailabilityForm({ onSuccess }: AvailabilityFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [availabilities, setAvailabilities] = useState<Availability[]>([])
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<AvailabilityFormData>({
    resolver: zodResolver(availabilityFormSchema),
    defaultValues: {
      availabilities: [],
    },
  })

  // Carregar disponibilidades existentes
  useEffect(() => {
    const loadAvailabilities = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (!user) {
          router.push('/login')
          return
        }

        const response = await fetch('/api/availability')
        if (response.ok) {
          const data = await response.json()
          setAvailabilities(data.availabilities || [])
          form.setValue('availabilities', data.availabilities || [])
        }
      } catch (error) {
        console.error('Erro ao carregar disponibilidades:', error)
      }
    }

    loadAvailabilities()
  }, [supabase, router, form])

  const addAvailability = () => {
    const newAvailability: Availability = {
      day_of_week: 1, // Segunda-feira por padrão
      start_time: '09:00',
      end_time: '18:00',
    }
    const updatedAvailabilities = [...availabilities, newAvailability]
    setAvailabilities(updatedAvailabilities)
    form.setValue('availabilities', updatedAvailabilities)
  }

  const removeAvailability = (index: number) => {
    const updatedAvailabilities = availabilities.filter((_, i) => i !== index)
    setAvailabilities(updatedAvailabilities)
    form.setValue('availabilities', updatedAvailabilities)
  }

  const updateAvailability = (index: number, field: keyof Availability, value: string | number | boolean) => {
    const updatedAvailabilities = availabilities.map((availability, i) => {
      if (i === index) {
        return { ...availability, [field]: value }
      }
      return availability
    })
    setAvailabilities(updatedAvailabilities)
    form.setValue('availabilities', updatedAvailabilities)
  }

  const onSubmit = async (data: AvailabilityFormData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      const response = await fetch('/api/availability', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ availabilities: data.availabilities }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Erro ao salvar disponibilidade')
      }

      setSuccess(true)
      onSuccess?.()
    } catch (error) {
      console.error('Erro ao salvar disponibilidade:', error)
      setError(error instanceof Error ? error.message : 'Erro desconhecido')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuração de Disponibilidade</CardTitle>
        <CardDescription>
          Configure seus horários de trabalho por dia da semana
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Horários de Trabalho</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addAvailability}
                  disabled={isLoading}
                >
                  Adicionar Horário
                </Button>
              </div>

              {availabilities.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Nenhum horário configurado. Clique em &quot;Adicionar Horário&quot; para começar.
                </p>
              ) : (
                <div className="space-y-4">
                  {availabilities.map((availability, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <label className="text-sm font-medium">Dia da Semana</label>
                        <Select
                          value={availability.day_of_week.toString()}
                          onValueChange={(value) => updateAvailability(index, 'day_of_week', parseInt(value))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {DAYS_OF_WEEK.map((day) => (
                              <SelectItem key={day.value} value={day.value.toString()}>
                                {day.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex-1">
                        <label className="text-sm font-medium">Horário de Início</label>
                        <Select
                          value={availability.start_time}
                          onValueChange={(value) => updateAvailability(index, 'start_time', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((time) => (
                              <SelectItem key={time.value} value={time.value}>
                                {time.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex-1">
                        <label className="text-sm font-medium">Horário de Fim</label>
                        <Select
                          value={availability.end_time}
                          onValueChange={(value) => updateAvailability(index, 'end_time', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {TIME_OPTIONS.map((time) => (
                              <SelectItem key={time.value} value={time.value}>
                                {time.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeAvailability(index)}
                        disabled={isLoading}
                      >
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <div className="text-red-600 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm">
                Disponibilidade salva com sucesso!
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Salvando...' : 'Salvar Disponibilidade'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}