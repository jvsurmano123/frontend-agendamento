'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

export default function TestSupabasePage() {
  const [connectionStatus, setConnectionStatus] = useState<string>('Testando...')
  const [projectInfo, setProjectInfo] = useState<{
    url?: string;
    hasSession?: boolean;
    realtimeSchema?: unknown;
  } | null>(null)

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient()
        
        // Teste básico de conexão
        const { data, error } = await supabase.from('_realtime_schema').select('*').limit(1)
        
        if (error) {
          // Se der erro na tabela _realtime_schema, vamos tentar uma query mais simples
          const { data: authData, error: authError } = await supabase.auth.getSession()
          
          if (authError) {
            setConnectionStatus(`❌ Erro de conexão: ${authError.message}`)
          } else {
            setConnectionStatus('✅ Conexão com Supabase estabelecida com sucesso!')
            setProjectInfo({
              url: process.env.NEXT_PUBLIC_SUPABASE_URL,
              hasSession: !!authData.session
            })
          }
        } else {
          setConnectionStatus('✅ Conexão com Supabase estabelecida com sucesso!')
          setProjectInfo({
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            realtimeSchema: data
          })
        }
      } catch (err) {
        setConnectionStatus(`❌ Erro inesperado: ${err instanceof Error ? err.message : 'Erro desconhecido'}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Teste de Conexão Supabase</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Status da Conexão</h2>
        <p className="text-lg">{connectionStatus}</p>
      </div>

      {projectInfo && (
        <div className="bg-gray-50 shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Informações do Projeto</h2>
          <div className="space-y-2">
            <p><strong>URL do Projeto:</strong> {projectInfo.url}</p>
            {projectInfo.hasSession !== undefined && (
              <p><strong>Sessão Ativa:</strong> {projectInfo.hasSession ? 'Sim' : 'Não'}</p>
            )}
            {projectInfo.realtimeSchema !== undefined && (
              <p><strong>Schema Realtime:</strong> Acessível</p>
            )}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Link 
          href="/" 
          className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          ← Voltar para Home
        </Link>
      </div>
    </div>
  )
}