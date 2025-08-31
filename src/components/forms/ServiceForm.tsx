'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceSchema, type Service } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface ServiceFormProps {
  initialData?: Service & { id?: string }
  onSuccess?: () => void
  onCancel?: () => void
  mode?: 'create' | 'edit'
}

export function ServiceForm({ initialData, onSuccess, onCancel, mode = 'create' }: ServiceFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<Service>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      name: initialData?.name || '',
      duration: initialData?.duration || 30,
    },
  })

  const onSubmit = async (data: Service) => {
    setIsLoading(true)
    setError(null)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Verificar se o usuário tem um perfil
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

      if (!profile) {
        setError('Você precisa configurar seu perfil primeiro.')
        return
      }

      if (mode === 'edit' && initialData?.id) {
        // Atualizar serviço existente
        const { error: updateError } = await supabase
          .from('services')
          .update({
            name: data.name,
            duration: data.duration,
            updated_at: new Date().toISOString(),
          })
          .eq('id', initialData.id)
          .eq('profile_id', user.id) // Garantir que só edita seus próprios serviços

        if (updateError) throw updateError
      } else {
        // Criar novo serviço
        const { error: insertError } = await supabase
          .from('services')
          .insert({
            profile_id: user.id,
            name: data.name,
            duration: data.duration,
          })

        if (insertError) throw insertError
      }

      onSuccess?.()
    } catch (err) {
      console.error('Erro ao salvar serviço:', err)
      setError('Erro ao salvar serviço. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {mode === 'edit' ? 'Editar Serviço' : 'Novo Serviço'}
        </CardTitle>
        <CardDescription>
          {mode === 'edit' 
            ? 'Atualize as informações do serviço'
            : 'Adicione um novo serviço ao seu negócio'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Serviço</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ex: Corte de cabelo, Manicure, Consulta"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Nome que será exibido para seus clientes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duração (minutos)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="30"
                      min="15"
                      max="480"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Tempo estimado para realizar o serviço (mínimo 15 minutos)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading 
                  ? 'Salvando...' 
                  : mode === 'edit' 
                    ? 'Atualizar Serviço' 
                    : 'Criar Serviço'
                }
              </Button>
              {onCancel && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}