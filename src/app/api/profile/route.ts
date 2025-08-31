import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { businessProfileSchema } from '@/lib/validations'

// GET /api/profile - Buscar perfil do usuário logado
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

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError) {
      if (profileError.code === 'PGRST116') {
        // Perfil não encontrado
        return NextResponse.json(
          { error: 'Perfil não encontrado' },
          { status: 404 }
        )
      }
      throw profileError
    }

    return NextResponse.json({ profile })
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}

// PUT /api/profile - Atualizar perfil do usuário logado
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
    const validationResult = businessProfileSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos',
          details: validationResult.error.issues
        },
        { status: 400 }
      )
    }

    const { business_name } = validationResult.data

    // Verificar se perfil já existe
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single()

    let result
    
    if (existingProfile) {
      // Atualizar perfil existente
      const { data, error } = await supabase
        .from('profiles')
        .update({
          business_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single()

      if (error) throw error
      result = data
    } else {
      // Criar novo perfil
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: user.id,
          business_name,
        })
        .select()
        .single()

      if (error) throw error
      result = data
    }

    return NextResponse.json({ profile: result })
  } catch (error) {
    console.error('Erro ao salvar perfil:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}