# Configuração do Supabase

Este guia explica como configurar o Supabase para o projeto.

## 📋 Pré-requisitos

- Conta no Supabase (gratuita)
- Acesso ao painel do Supabase

## 🚀 Passo a Passo

### 1. Criar/Acessar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em "New Project" ou acesse um projeto existente
4. Escolha uma organização
5. Defina:
   - **Nome do projeto**: Ex: "landing-page-app"
   - **Senha do banco**: Anote esta senha (será necessária para conexões diretas)
   - **Região**: Escolha a mais próxima (ex: South America - São Paulo)

### 2. Obter Credenciais da API

1. No painel do projeto, vá em **Settings** > **API**
2. Copie as seguintes informações:
   - **Project URL**: `https://seu-projeto-id.supabase.co`
   - **anon public**: Chave pública para uso no frontend
   - **service_role**: Chave privada para operações administrativas (opcional)

### 3. Configurar Variáveis de Ambiente

1. Abra o arquivo `.env.local` na raiz do projeto
2. Substitua os valores placeholder pelas suas credenciais:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_aqui
```

### 4. Verificar Configuração

Após configurar as variáveis:

```bash
# Reiniciar o servidor de desenvolvimento
npm run dev
```

### 5. Configurar Banco de Dados (Opcional)

Para este projeto básico, o Supabase já vem com autenticação configurada. Para funcionalidades avançadas, você pode:

1. Ir em **Database** > **Tables**
2. Criar tabelas conforme necessário
3. Configurar Row Level Security (RLS)

## 🔒 Segurança

- ✅ **NEXT_PUBLIC_SUPABASE_URL**: Seguro expor no frontend
- ✅ **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Seguro expor no frontend (tem permissões limitadas)
- ❌ **SUPABASE_SERVICE_ROLE_KEY**: NUNCA expor no frontend (apenas server-side)

## 🆘 Problemas Comuns

### Erro de Conexão
- Verifique se as URLs estão corretas
- Confirme se as chaves não têm espaços extras
- Reinicie o servidor de desenvolvimento

### Erro de Autenticação
- Verifique se a chave anônima está correta
- Confirme se o projeto está ativo no Supabase

## 📚 Recursos Úteis

- [Documentação do Supabase](https://supabase.com/docs)
- [Guia de Autenticação](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)