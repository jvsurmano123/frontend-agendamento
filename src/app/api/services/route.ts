import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { serviceSchema } from '@/lib/validations'

// GET /api/services - Listar serviços do usuário logado
export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Não autorizado' },
        { status: 401 }
      )
    }

    const { data: services, error: servicesError } = await supabase
      .from('services')
      .select('*')
      .eq('profile_id', user.id)
      .order('created_at', { ascending: false })

    if (servicesError) throw servicesError

    return NextResponse.json({ services: services || [] })
  } catch (error) {
    console.error('Erro ao buscar serviços:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// POST /api/services - Criar novo serviço
export async function POST(request: NextRequest) {
  try {
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

    // Verificar se o usuário tem um perfil
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return NextResponse.json(
        { error: 'Você precisa configurar seu perfil primeiro' },
        { status: 400 }
      )
    }

    // Criar novo serviço
    const { data: service, error: insertError } = await supabase
      .from('services')
      .insert({
        profile_id: user.id,
        name,
        duration,
      })
      .select()
      .single()

    if (insertError) throw insertError

    return NextResponse.json({ service }, { status: 201 })
  } catch (error) {
    console.error('Erro ao criar serviço:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}