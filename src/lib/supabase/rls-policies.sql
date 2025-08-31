-- Políticas RLS para as tabelas profiles e services
-- Execute este SQL no Supabase SQL Editor

-- =============================================
-- TABELA PROFILES
-- =============================================

-- Habilitar RLS na tabela profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Política para SELECT: usuários podem ver apenas seu próprio perfil
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Política para INSERT: usuários podem criar apenas seu próprio perfil
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Política para UPDATE: usuários podem atualizar apenas seu próprio perfil
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Política para DELETE: usuários podem deletar apenas seu próprio perfil
CREATE POLICY "Users can delete own profile" ON profiles
  FOR DELETE USING (auth.uid() = id);

-- =============================================
-- TABELA SERVICES
-- =============================================

-- Habilitar RLS na tabela services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Política para SELECT: usuários podem ver apenas seus próprios serviços
CREATE POLICY "Users can view own services" ON services
  FOR SELECT USING (auth.uid() = profile_id);

-- Política para INSERT: usuários podem criar serviços apenas para seu próprio perfil
CREATE POLICY "Users can insert own services" ON services
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- Política para UPDATE: usuários podem atualizar apenas seus próprios serviços
CREATE POLICY "Users can update own services" ON services
  FOR UPDATE USING (auth.uid() = profile_id);

-- Política para DELETE: usuários podem deletar apenas seus próprios serviços
CREATE POLICY "Users can delete own services" ON services
  FOR DELETE USING (auth.uid() = profile_id);

-- =============================================
-- VERIFICAÇÃO DAS POLÍTICAS
-- =============================================

-- Para verificar se as políticas foram criadas corretamente:
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies 
-- WHERE tablename IN ('profiles', 'services');

-- =============================================
-- TABELA AVAILABILITIES
-- =============================================

-- Habilitar RLS na tabela availabilities
ALTER TABLE availabilities ENABLE ROW LEVEL SECURITY;

-- Política para SELECT: usuários podem ver suas próprias disponibilidades + disponibilidades públicas
CREATE POLICY "Users can view availabilities" ON availabilities
  FOR SELECT USING (
    auth.uid() = profile_id OR 
    EXISTS (SELECT 1 FROM profiles WHERE id = profile_id)
  );

-- Política para INSERT: usuários podem criar disponibilidades apenas para seu próprio perfil
CREATE POLICY "Users can insert own availabilities" ON availabilities
  FOR INSERT WITH CHECK (auth.uid() = profile_id);

-- Política para UPDATE: usuários podem atualizar apenas suas próprias disponibilidades
CREATE POLICY "Users can update own availabilities" ON availabilities
  FOR UPDATE USING (auth.uid() = profile_id);

-- Política para DELETE: usuários podem deletar apenas suas próprias disponibilidades
CREATE POLICY "Users can delete own availabilities" ON availabilities
  FOR DELETE USING (auth.uid() = profile_id);

-- =============================================
-- GRANTS PARA USUÁRIOS AUTENTICADOS
-- =============================================

-- Garantir que usuários autenticados tenham as permissões necessárias
GRANT SELECT, INSERT, UPDATE, DELETE ON profiles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON services TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON availabilities TO authenticated;

-- Garantir que usuários autenticados possam usar as sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;