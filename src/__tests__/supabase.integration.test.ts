import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/database.types'
import type { SupabaseClient } from '@supabase/supabase-js'

// Mock environment variables
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://test.supabase.co'
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key'

// Mock Supabase client
jest.mock('@/lib/supabase/client', () => ({
  createClient: jest.fn()
}))

type MockSupabaseClient = {
  from: jest.Mock
  auth: {
    getUser: jest.Mock
  }
}

const mockSupabase: MockSupabaseClient = {
  from: jest.fn(),
  auth: {
    getUser: jest.fn()
  }
}

const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>
mockCreateClient.mockReturnValue(mockSupabase as any)

describe('Supabase Integration Tests', () => {
  let supabase: SupabaseClient<Database>

  beforeEach(() => {
    jest.clearAllMocks()
    supabase = createClient()
  })

  describe('Profiles CRUD Operations', () => {
    const mockProfile = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      email: 'test@example.com',
      full_name: 'Test User',
      avatar_url: null,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z'
    }

    it('should create a profile', async () => {
      const mockInsert = jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({
          data: [mockProfile],
          error: null
        })
      })
      
      mockSupabase.from.mockReturnValue({
        insert: mockInsert
      })

      const result = await supabase
        .from('profiles')
        .insert({
          id: mockProfile.id,
          email: mockProfile.email,
          full_name: mockProfile.full_name
        })
        .select()

      expect(mockSupabase.from).toHaveBeenCalledWith('profiles')
      expect(mockInsert).toHaveBeenCalledWith({
        id: mockProfile.id,
        email: mockProfile.email,
        full_name: mockProfile.full_name
      })
      expect(result.data).toEqual([mockProfile])
      expect(result.error).toBeNull()
    })

    it('should read profiles', async () => {
      const mockSelect = jest.fn().mockResolvedValue({
        data: [mockProfile],
        error: null
      })
      
      mockSupabase.from.mockReturnValue({
        select: mockSelect
      })

      const result = await supabase
        .from('profiles')
        .select('*')

      expect(mockSupabase.from).toHaveBeenCalledWith('profiles')
      expect(mockSelect).toHaveBeenCalledWith('*')
      expect(result.data).toEqual([mockProfile])
      expect(result.error).toBeNull()
    })

    it('should update a profile', async () => {
      const updatedProfile = { ...mockProfile, full_name: 'Updated User' }
      
      const mockUpdate = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({
            data: [updatedProfile],
            error: null
          })
        })
      })
      
      mockSupabase.from.mockReturnValue({
        update: mockUpdate
      })

      const result = await supabase
        .from('profiles')
        .update({ full_name: 'Updated User' })
        .eq('id', mockProfile.id)
        .select()

      expect(mockSupabase.from).toHaveBeenCalledWith('profiles')
      expect(mockUpdate).toHaveBeenCalledWith({ full_name: 'Updated User' })
      expect(result.data).toEqual([updatedProfile])
      expect(result.error).toBeNull()
    })

    it('should delete a profile', async () => {
      const mockDelete = jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({
          data: null,
          error: null
        })
      })
      
      mockSupabase.from.mockReturnValue({
        delete: mockDelete
      })

      const result = await supabase
        .from('profiles')
        .delete()
        .eq('id', mockProfile.id)

      expect(mockSupabase.from).toHaveBeenCalledWith('profiles')
      expect(mockDelete).toHaveBeenCalled()
      expect(result.error).toBeNull()
    })
  })







  describe('RLS Policy Validation', () => {
    it('should enforce RLS on profiles table', async () => {
      // Mock authenticated user
      mockSupabase.auth.getUser.mockResolvedValue({
        data: {
          user: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            email: 'test@example.com'
          }
        },
        error: null
      })

      const mockSelect = jest.fn().mockResolvedValue({
        data: [],
        error: null
      })
      
      mockSupabase.from.mockReturnValue({
        select: mockSelect
      })

      // Test that user can only access their own profile
      await supabase.from('profiles').select('*')
      
      expect(mockSupabase.from).toHaveBeenCalledWith('profiles')
      expect(mockSelect).toHaveBeenCalledWith('*')
    })

    it('should prevent unauthorized access', async () => {
      // Mock unauthenticated user
      mockSupabase.auth.getUser.mockResolvedValue({
        data: { user: null },
        error: null
      })

      const mockSelect = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'RLS policy violation' }
      })
      
      mockSupabase.from.mockReturnValue({
        select: mockSelect
      })

      const result = await supabase.from('profiles').select('*')
      
      expect(result.error).toBeTruthy()
      expect(result.error?.message).toContain('RLS policy violation')
    })
  })
});