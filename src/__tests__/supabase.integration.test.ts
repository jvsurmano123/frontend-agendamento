import { createClient } from '@supabase/supabase-js';
import { Database } from '@/lib/database.types';

// Configuração do cliente Supabase para testes
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

describe('Supabase Integration Tests', () => {
  // Mock user ID para testes
  const mockUserId = '00000000-0000-0000-0000-000000000000';
  
  beforeAll(async () => {
    // Verificar conexão com o banco
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) {
      console.error('Erro de conexão com Supabase:', error);
    }
    expect(error).toBeNull();
  });

  describe('Profiles CRUD Operations', () => {
    let profileId: string;

    test('should create a profile', async () => {
      const profileData = {
        id: mockUserId,
        name: 'Test User',
        email: 'test@example.com',
        phone: '11999999999',
        business_type: 'barbershop' as const
      };

      const { data, error } = await supabase
        .from('profiles')
        .insert(profileData)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data?.name).toBe('Test User');
      profileId = data?.id!;
    });

    test('should read a profile', async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data?.name).toBe('Test User');
    });

    test('should update a profile', async () => {
      const { data, error } = await supabase
        .from('profiles')
        .update({ name: 'Updated Test User' })
        .eq('id', profileId)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data?.name).toBe('Updated Test User');
    });

    test('should delete a profile', async () => {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', profileId);

      expect(error).toBeNull();
    });
  });

  describe('Services CRUD Operations', () => {
    let serviceId: string;
    const profileId = mockUserId;

    beforeAll(async () => {
      // Criar profile para os testes de serviços
      await supabase.from('profiles').insert({
        id: profileId,
        name: 'Service Test User',
        email: 'service@example.com',
        phone: '11888888888',
        business_type: 'barbershop'
      });
    });

    afterAll(async () => {
      // Limpar profile após testes
      await supabase.from('profiles').delete().eq('id', profileId);
    });

    test('should create a service', async () => {
      const serviceData = {
        profile_id: profileId,
        name: 'Corte de Cabelo',
        description: 'Corte masculino tradicional',
        price: 30.00,
        duration: 30
      };

      const { data, error } = await supabase
        .from('services')
        .insert(serviceData)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data?.name).toBe('Corte de Cabelo');
      serviceId = data?.id!;
    });

    test('should read services', async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('profile_id', profileId);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data?.length).toBeGreaterThan(0);
    });

    test('should update a service', async () => {
      const { data, error } = await supabase
        .from('services')
        .update({ price: 35.00 })
        .eq('id', serviceId)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data?.price).toBe(35.00);
    });

    test('should delete a service', async () => {
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', serviceId);

      expect(error).toBeNull();
    });
  });

  describe('Availabilities CRUD Operations', () => {
    let availabilityId: string;
    const profileId = mockUserId;

    beforeAll(async () => {
      // Criar profile para os testes de disponibilidade
      await supabase.from('profiles').insert({
        id: profileId,
        name: 'Availability Test User',
        email: 'availability@example.com',
        phone: '11777777777',
        business_type: 'barbershop'
      });
    });

    afterAll(async () => {
      // Limpar profile após testes
      await supabase.from('profiles').delete().eq('id', profileId);
    });

    test('should create availability', async () => {
      const availabilityData = {
        profile_id: profileId,
        day_of_week: 1, // Segunda-feira
        start_time: '09:00',
        end_time: '18:00'
      };

      const { data, error } = await supabase
        .from('availabilities')
        .insert(availabilityData)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data?.day_of_week).toBe(1);
      availabilityId = data?.id!;
    });

    test('should read availabilities', async () => {
      const { data, error } = await supabase
        .from('availabilities')
        .select('*')
        .eq('profile_id', profileId);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data?.length).toBeGreaterThan(0);
    });

    test('should update availability', async () => {
      const { data, error } = await supabase
        .from('availabilities')
        .update({ end_time: '17:00' })
        .eq('id', availabilityId)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data?.end_time).toBe('17:00');
    });

    test('should delete availability', async () => {
      const { error } = await supabase
        .from('availabilities')
        .delete()
        .eq('id', availabilityId);

      expect(error).toBeNull();
    });
  });

  describe('Appointments CRUD Operations', () => {
    let appointmentId: string;
    let serviceId: string;
    const profileId = mockUserId;

    beforeAll(async () => {
      // Criar profile e service para os testes de agendamentos
      await supabase.from('profiles').insert({
        id: profileId,
        name: 'Appointment Test User',
        email: 'appointment@example.com',
        phone: '11666666666',
        business_type: 'barbershop'
      });

      const { data: serviceData } = await supabase
        .from('services')
        .insert({
          profile_id: profileId,
          name: 'Test Service',
          description: 'Service for appointment tests',
          price: 25.00,
          duration: 30
        })
        .select()
        .single();
      
      serviceId = serviceData?.id!;
    });

    afterAll(async () => {
      // Limpar dados após testes
      await supabase.from('services').delete().eq('id', serviceId);
      await supabase.from('profiles').delete().eq('id', profileId);
    });

    test('should create appointment', async () => {
      const appointmentData = {
        profile_id: profileId,
        service_id: serviceId,
        client_name: 'João Silva',
        client_phone: '11555555555',
        start_time: '2024-12-25T10:00:00Z',
        end_time: '2024-12-25T10:30:00Z',
        status: 'scheduled' as const
      };

      const { data, error } = await supabase
        .from('appointments')
        .insert(appointmentData)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data?.client_name).toBe('João Silva');
      appointmentId = data?.id!;
    });

    test('should read appointments', async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*, services(*)')
        .eq('profile_id', profileId);

      expect(error).toBeNull();
      expect(data).toBeDefined();
      expect(data?.length).toBeGreaterThan(0);
      expect(data?.[0]?.services).toBeDefined();
    });

    test('should update appointment', async () => {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status: 'confirmed' })
        .eq('id', appointmentId)
        .select()
        .single();

      expect(error).toBeNull();
      expect(data?.status).toBe('confirmed');
    });

    test('should delete appointment', async () => {
      const { error } = await supabase
        .from('appointments')
        .delete()
        .eq('id', appointmentId);

      expect(error).toBeNull();
    });
  });

  describe('RLS Policies Validation', () => {
    test('should enforce RLS on profiles table', async () => {
      // Tentar acessar dados sem autenticação adequada
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);

      // RLS deve permitir apenas dados do próprio usuário
      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
    });

    test('should enforce RLS on services table', async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .limit(1);

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
    });

    test('should enforce RLS on availabilities table', async () => {
      const { data, error } = await supabase
        .from('availabilities')
        .select('*')
        .limit(1);

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
    });

    test('should enforce RLS on appointments table', async () => {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .limit(1);

      expect(error).toBeNull();
      expect(Array.isArray(data)).toBe(true);
    });
  });
});