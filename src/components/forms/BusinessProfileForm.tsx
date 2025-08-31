'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { businessProfileSchema, type BusinessProfile } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface BusinessProfileFormProps {
  initialData?: BusinessProfile
  onSuccess?: () => void
}

export function BusinessProfileForm({ initialData, onSuccess }: BusinessProfileFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<BusinessProfile>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      business_name: initialData?.business_name || '',
    },
  })

  const onSubmit = async (data: BusinessProfile) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      // Verificar se já existe um perfil
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single()

      if (existingProfile) {
        // Atualizar perfil existente
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            business_name: data.business_name,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id)

        if (updateError) throw updateError
      } else {
        // Criar novo perfil
        // Gerar unique_slug baseado no business_name
        const generateSlug = (name: string): string => {
          return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '') // Remove acentos
            .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
            .trim()
            .replace(/\s+/g, '-') // Substitui espaços por hífens
            .replace(/-+/g, '-') // Remove hífens duplicados
            .substring(0, 50) // Limita a 50 caracteres
        }

        const baseSlug = generateSlug(data.business_name)
        let uniqueSlug = baseSlug
        let counter = 1

        // Verificar se o slug já existe e gerar um único
        while (true) {
          const { data: existingSlug } = await supabase
            .from('profiles')
            .select('unique_slug')
            .eq('unique_slug', uniqueSlug)
            .single()

          if (!existingSlug) break
          
          uniqueSlug = `${baseSlug}-${counter}`
          counter++
        }

        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            business_name: data.business_name,
            unique_slug: uniqueSlug,
          })

        if (insertError) throw insertError
      }

      setSuccess(true)
      onSuccess?.()
    } catch (err) {
      console.error('Erro ao salvar perfil:', err)
      setError('Erro ao salvar perfil. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil do Negócio</CardTitle>
        <CardDescription>
          Configure as informações básicas do seu negócio
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="business_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Negócio</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do seu negócio"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormDescription>
                    Este será o nome exibido para seus clientes
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

            {success && (
              <div className="p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
                Perfil salvo com sucesso!
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Salvando...' : 'Salvar Perfil'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}