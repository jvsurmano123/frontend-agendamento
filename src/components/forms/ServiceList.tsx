'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { ServiceForm } from './ServiceForm'
import type { Service } from '@/lib/validations'

interface ServiceWithId extends Service {
  id: string
  created_at: string
  updated_at: string
}

interface ServiceListProps {
  onServiceChange?: () => void
}

export function ServiceList({ onServiceChange }: ServiceListProps) {
  const [services, setServices] = useState<ServiceWithId[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingService, setEditingService] = useState<ServiceWithId | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const loadServices = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      const { data, error: fetchError } = await supabase
        .from('services')
        .select('*')
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false })

      if (fetchError) throw fetchError

      setServices(data || [])
    } catch (err) {
      console.error('Erro ao carregar serviços:', err)
      setError('Erro ao carregar serviços. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [supabase, router])

  useEffect(() => {
    loadServices()
  }, [loadServices])

  const handleDeleteService = async (serviceId: string) => {
    if (!confirm('Tem certeza que deseja excluir este serviço?')) {
      return
    }

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/login')
        return
      }

      const { error: deleteError } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId)
        .eq('profile_id', user.id) // Garantir que só deleta seus próprios serviços

      if (deleteError) throw deleteError

      await loadServices()
      onServiceChange?.()
    } catch (err) {
      console.error('Erro ao excluir serviço:', err)
      setError('Erro ao excluir serviço. Tente novamente.')
    }
  }

  const handleServiceSuccess = async () => {
    setEditingService(null)
    setShowCreateForm(false)
    await loadServices()
    onServiceChange?.()
  }

  const formatDuration = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}min`
    }
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}min` : `${hours}h`
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Seus Serviços</CardTitle>
          <CardDescription>Carregando serviços...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showCreateForm) {
    return (
      <ServiceForm
        mode="create"
        onSuccess={handleServiceSuccess}
        onCancel={() => setShowCreateForm(false)}
      />
    )
  }

  if (editingService) {
    return (
      <ServiceForm
        mode="edit"
        initialData={editingService}
        onSuccess={handleServiceSuccess}
        onCancel={() => setEditingService(null)}
      />
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Seus Serviços</CardTitle>
            <CardDescription>
              Gerencie os serviços que você oferece
            </CardDescription>
          </div>
          <Button onClick={() => setShowCreateForm(true)}>
            Adicionar Serviço
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {services.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Você ainda não tem serviços cadastrados.</p>
            <Button onClick={() => setShowCreateForm(true)}>
              Criar Primeiro Serviço
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <Badge variant="secondary">
                      {formatDuration(service.duration)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    Criado em {new Date(service.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingService(service)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}