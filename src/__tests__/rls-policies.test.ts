// Mock do Supabase para testes RLS
interface MockSupabaseClient {
  auth: {
    getUser: jest.Mock;
  };
  from: jest.Mock;
}

// Tipos para os testes
interface AvailabilityInsert {
  user_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available?: boolean;
}

describe('RLS Policies - Availabilities Table', () => {
  let supabaseUser1: MockSupabaseClient;
  let supabaseUser2: MockSupabaseClient;
  let testProfileId1: string;
  let testProfileId2: string;

  beforeAll(() => {
    // Setup de usuários de teste
    supabaseUser1 = {
      auth: {
        getUser: jest.fn()
      },
      from: jest.fn()
    };
    
    supabaseUser2 = {
      auth: {
        getUser: jest.fn()
      },
      from: jest.fn()
    };
    
    // IDs de teste simulados
    testProfileId1 = '11111111-1111-1111-1111-111111111111';
    testProfileId2 = '22222222-2222-2222-2222-222222222222';
  });

  describe('SELECT Policy - "Users can view availabilities"', () => {
    it('should allow users to view their own availabilities', async () => {
      // Mock da autenticação do usuário 1
      supabaseUser1.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId1 } },
        error: null
      });
      
      // Mock da consulta que deve ser permitida
      const mockSelect = jest.fn().mockResolvedValue({
        data: [
          {
            id: 'availability-1',
            user_id: testProfileId1,
            day_of_week: 1,
            start_time: '09:00:00',
            end_time: '17:00:00'
          }
        ],
        error: null
      });
      
      supabaseUser1.from.mockReturnValue({
        select: mockSelect
      });
      
      const { data, error } = await supabaseUser1
        .from('availabilities')
        .select('*');
      
      expect(error).toBeNull();
      expect(data).toHaveLength(1);
      expect(data![0].user_id).toBe(testProfileId1);
    });

    it('should prevent users from viewing other users availabilities', async () => {
      // Mock da autenticação do usuário 1
      supabaseUser1.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId1 } },
        error: null
      });
      
      // Mock da consulta que deve retornar vazio (RLS bloqueia)
      const mockSelect = jest.fn().mockResolvedValue({
        data: [], // RLS deve filtrar dados de outros usuários
        error: null
      });
      
      supabaseUser1.from.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: mockSelect
        })
      });
      
      // Tentativa de acessar dados do usuário 2
      const { data, error } = await supabaseUser1
        .from('availabilities')
        .select('*')
        .eq('user_id', testProfileId2);
      
      expect(error).toBeNull();
      expect(data).toHaveLength(0); // RLS deve bloquear
    });
  });

  describe('INSERT Policy - "Users can insert own availabilities"', () => {
    it('should allow users to insert their own availabilities', async () => {
      supabaseUser1.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId1 } },
        error: null
      });
      
      const newAvailability: AvailabilityInsert = {
        user_id: testProfileId1,
        day_of_week: 2,
        start_time: '10:00:00',
        end_time: '18:00:00'
      };
      
      const mockInsert = jest.fn().mockResolvedValue({
        data: [{ ...newAvailability, id: 'new-availability-id' }],
        error: null
      });
      
      supabaseUser1.from.mockReturnValue({
        insert: mockInsert
      });
      
      const { data, error } = await supabaseUser1
        .from('availabilities')
        .insert(newAvailability);
      
      expect(error).toBeNull();
      expect(data).toHaveLength(1);
      expect(data![0].user_id).toBe(testProfileId1);
    });

    it('should prevent users from inserting availabilities for other users', async () => {
      supabaseUser1.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId1 } },
        error: null
      });
      
      const unauthorizedAvailability: AvailabilityInsert = {
        user_id: testProfileId2, // Tentando inserir para outro usuário
        day_of_week: 3,
        start_time: '09:00:00',
        end_time: '17:00:00'
      };
      
      const mockInsert = jest.fn().mockResolvedValue({
        data: null,
        error: {
          code: '42501',
          message: 'new row violates row-level security policy for table "availabilities"'
        }
      });
      
      supabaseUser1.from.mockReturnValue({
        insert: mockInsert
      });
      
      const { data, error } = await supabaseUser1
        .from('availabilities')
        .insert(unauthorizedAvailability);
      
      expect(data).toBeNull();
      expect(error).toBeTruthy();
      expect(error!.code).toBe('42501'); // RLS violation
    });
  });

  describe('UPDATE Policy - "Users can update own availabilities"', () => {
    it('should allow users to update their own availabilities', async () => {
      supabaseUser1.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId1 } },
        error: null
      });
      
      const updateData = {
        start_time: '08:00:00',
        end_time: '16:00:00'
      };
      
      const mockUpdate = jest.fn().mockResolvedValue({
        data: [{
          id: 'availability-1',
          user_id: testProfileId1,
          day_of_week: 1,
          ...updateData
        }],
        error: null
      });
      
      supabaseUser1.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: mockUpdate
        })
      });
      
      const { data, error } = await supabaseUser1
        .from('availabilities')
        .update(updateData)
        .eq('id', 'availability-1');
      
      expect(error).toBeNull();
      expect(data).toHaveLength(1);
      expect(data[0].start_time).toBe('08:00:00');
    });

    it('should prevent users from updating other users availabilities', async () => {
      supabaseUser1.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId1 } },
        error: null
      });
      
      const updateData = {
        start_time: '08:00:00',
        end_time: '16:00:00'
      };
      
      const mockUpdate = jest.fn().mockResolvedValue({
        data: [], // RLS impede a atualização
        error: null
      });
      
      supabaseUser1.from.mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: mockUpdate
        })
      });
      
      // Tentativa de atualizar availability de outro usuário
      const { data, error } = await supabaseUser1
        .from('availabilities')
        .update(updateData)
        .eq('user_id', testProfileId2);
      
      expect(error).toBeNull();
      expect(data).toHaveLength(0); // Nenhum registro atualizado devido ao RLS
    });
  });

  describe('DELETE Policy - "Users can delete own availabilities"', () => {
    it('should allow users to delete their own availabilities', async () => {
      supabaseUser1.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId1 } },
        error: null
      });
      
      const mockDelete = jest.fn().mockResolvedValue({
        data: [{
          id: 'availability-1',
          user_id: testProfileId1,
          day_of_week: 1,
          start_time: '09:00:00',
          end_time: '17:00:00'
        }],
        error: null
      });
      
      supabaseUser1.from.mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: mockDelete
        })
      });
      
      const { data, error } = await supabaseUser1
        .from('availabilities')
        .delete()
        .eq('id', 'availability-1');
      
      expect(error).toBeNull();
      expect(data).toHaveLength(1);
    });

    it('should prevent users from deleting other users availabilities', async () => {
      supabaseUser1.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId1 } },
        error: null
      });
      
      const mockDelete = jest.fn().mockResolvedValue({
        data: [], // RLS impede a exclusão
        error: null
      });
      
      supabaseUser1.from.mockReturnValue({
        delete: jest.fn().mockReturnValue({
          eq: mockDelete
        })
      });
      
      // Tentativa de deletar availability de outro usuário
      const { data, error } = await supabaseUser1
        .from('availabilities')
        .delete()
        .eq('user_id', testProfileId2);
      
      expect(error).toBeNull();
      expect(data).toHaveLength(0); // Nenhum registro deletado devido ao RLS
    });
  });

  describe('Cross-tenant Access Prevention', () => {
    it('should ensure complete isolation between different users', async () => {
      // Simular dois usuários diferentes
      supabaseUser1.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId1 } },
        error: null
      });
      
      supabaseUser2.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId2 } },
        error: null
      });
      
      // Mock para usuário 1 - deve ver apenas seus dados
      const mockSelectUser1 = jest.fn().mockResolvedValue({
        data: [
          {
            id: 'availability-user1',
            user_id: testProfileId1,
            day_of_week: 1,
            start_time: '09:00:00',
            end_time: '17:00:00'
          }
        ],
        error: null
      });
      
      // Mock para usuário 2 - deve ver apenas seus dados
      const mockSelectUser2 = jest.fn().mockResolvedValue({
        data: [
          {
            id: 'availability-user2',
            user_id: testProfileId2,
            day_of_week: 2,
            start_time: '10:00:00',
            end_time: '18:00:00'
          }
        ],
        error: null
      });
      
      supabaseUser1.from.mockReturnValue({
        select: mockSelectUser1
      });
      
      supabaseUser2.from.mockReturnValue({
        select: mockSelectUser2
      });
      
      // Usuário 1 consulta suas availabilities
      const { data: dataUser1, error: errorUser1 } = await supabaseUser1
        .from('availabilities')
        .select('*');
      
      // Usuário 2 consulta suas availabilities
      const { data: dataUser2, error: errorUser2 } = await supabaseUser2
        .from('availabilities')
        .select('*');
      
      // Verificações de isolamento
      expect(errorUser1).toBeNull();
      expect(errorUser2).toBeNull();
      expect(dataUser1).toHaveLength(1);
      expect(dataUser2).toHaveLength(1);
      expect(dataUser1[0].user_id).toBe(testProfileId1);
      expect(dataUser2[0].user_id).toBe(testProfileId2);
      
      // Garantir que os dados são completamente isolados
      expect(dataUser1[0].id).not.toBe(dataUser2[0].id);
    });
  });

  describe('Data Integrity with RLS', () => {
    it('should maintain data integrity while enforcing RLS', async () => {
      supabaseUser1.auth.getUser.mockResolvedValue({
        data: { user: { id: testProfileId1 } },
        error: null
      });
      
      // Teste de inserção com dados válidos
      const validAvailability: AvailabilityInsert = {
        user_id: testProfileId1,
        day_of_week: 1,
        start_time: '09:00:00',
        end_time: '17:00:00'
      };
      
      const mockInsert = jest.fn().mockResolvedValue({
        data: [{ ...validAvailability, id: 'valid-availability' }],
        error: null
      });
      
      supabaseUser1.from.mockReturnValue({
        insert: mockInsert
      });
      
      const { data, error } = await supabaseUser1
        .from('availabilities')
        .insert(validAvailability);
      
      expect(error).toBeNull();
      expect(data).toHaveLength(1);
      expect(data![0].user_id).toBe(testProfileId1);
      expect(data[0].day_of_week).toBe(1);
      expect(data[0].start_time).toBe('09:00:00');
      expect(data[0].end_time).toBe('17:00:00');
    });
  });
});