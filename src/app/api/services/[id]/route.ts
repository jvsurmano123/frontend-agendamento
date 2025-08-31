import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { serviceSchema } from '@/lib/validations'

interface RouteParams {
  params: Promise<{ id: string }>
}

// PUT /api/services/[id] - Atualizar serviço específico
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validar dados com Zod
    const validationResult = serviceSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: validationResult.error.issues
        },
        { status: 400 }
      )
    }

    const { name, duration } = validationResult.data

    // Verificar se o serviço existe e pertence ao usuário
    const { data: existingService } = await supabase
      .from('services')
      .select('id, profile_id')
      .eq('id', id)
      .eq('profile_id', user.id)
      .single()

    if (!existingService) {
      return NextResponse.json(
        { error: 'Serviço não encontrado' },
        { status: 404 }
      )
    }

    // Atualizar serviço
    const { data: service, error: updateError } = await supabase
      .from('services')
      .update({
        name,
        duration,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .eq('profile_id', user.id)
      .select()
      .single()

    if (updateError) throw updateError

    return NextResponse.json({ service })
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// DELETE /api/services/[id] - Excluir serviço específico
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    // Verificar se o serviço existe e pertence ao usuário
    const { data: existingService } = await supabase
      .from('services')
      .select('id, profile_id')
      .eq('id', id)
      .eq('profile_id', user.id)
      .single()

    if (!existingService) {
      return NextResponse.json(
        { error: 'Serviço não encontrado' },
        { status: 404 }
      )
    }

    // Excluir serviço
    const { error: deleteError } = await supabase
      .from('services')
      .delete()
      .eq('id', id)
      .eq('profile_id', user.id)

    if (deleteError) throw deleteError

    return NextResponse.json({ message: 'Serviço excluído com sucesso' })
  } catch (error) {
    console.error('Erro ao excluir serviço:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// GET /api/services/[id] - Buscar serviço específico
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { data: service, error: serviceError } = await supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .eq('profile_id', user.id)
      .single()

    if (serviceError) {
      if (serviceError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Serviço não encontrado' },
          { status: 404 }
        )
      }
      throw serviceError
    }

    return NextResponse.json({ service })
  } catch (error) {
    console.error('Erro ao buscar serviço:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}