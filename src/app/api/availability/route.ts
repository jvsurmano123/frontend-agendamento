import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { availabilityArraySchema } from '@/lib/validations'

// GET /api/availability - Buscar disponibilidade do usuário logado
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

    // Buscar perfil do usuário para obter o profile_id
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (profileError) {
      return NextResponse.json(
        { error: 'Perfil não encontrado' },
        { status: 404 }
      )
    }

    // Buscar disponibilidades do usuário
    const { data: availabilities, error: availabilityError } = await supabase
      .from('availabilities')
      .select('*')
      .eq('profile_id', profile.id)
      .order('day_of_week', { ascending: true })

    if (availabilityError) {
      throw availabilityError
    }

    return NextResponse.json({ availabilities: availabilities || [] })
  } catch (error) {
    console.error('Erro ao buscar disponibilidade:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/availability - Atualizar disponibilidade do usuário logado
export async function PUT(request: NextRequest) {
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
    const validationResult = availabilityArraySchema.safeParse(body.availabilities)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: validationResult.error.issues
        },
        { status: 400 }
      )
    }

    const availabilities = validationResult.data

    // Buscar perfil do usuário
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    if (profileError) {
      return NextResponse.json(
        { error: 'Perfil não encontrado' },
        { status: 404 }
      )
    }

    // Remover todas as disponibilidades existentes do usuário
    const { error: deleteError } = await supabase
      .from('availabilities')
      .delete()
      .eq('profile_id', profile.id)

    if (deleteError) {
      throw deleteError
    }

    // Inserir novas disponibilidades se houver
    let result = []
    if (availabilities.length > 0) {
      const availabilitiesToInsert = availabilities.map(availability => ({
        profile_id: profile.id,
        day_of_week: availability.day_of_week,
        start_time: availability.start_time,
        end_time: availability.end_time,
      }))

      const { data, error: insertError } = await supabase
        .from('availabilities')
        .insert(availabilitiesToInsert)
        .select()

      if (insertError) {
        throw insertError
      }

      result = data
    }

    return NextResponse.json({ availabilities: result })
  } catch (error) {
    console.error('Erro ao salvar disponibilidade:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}