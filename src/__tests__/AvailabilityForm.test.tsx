import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { AvailabilityForm } from '@/components/forms/AvailabilityForm'

// Mock do Supabase
jest.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({
        data: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
          },
        },
      }),
    },
  }),
}))

// Mock do Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// Mock do fetch
global.fetch = jest.fn()

describe('AvailabilityForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ availabilities: [] }),
    })
  })

  it('renderiza o formulário corretamente', async () => {
    render(<AvailabilityForm />)

    expect(screen.getByText('Configuração de Disponibilidade')).toBeInTheDocument()
    expect(screen.getByText('Configure seus horários de trabalho por dia da semana')).toBeInTheDocument()
    expect(screen.getByText('Adicionar Horário')).toBeInTheDocument()
    expect(screen.getByText('Salvar Disponibilidade')).toBeInTheDocument()
  })

  it('mostra mensagem quando não há horários configurados', async () => {
    render(<AvailabilityForm />)

    await waitFor(() => {
      expect(screen.getByText('Nenhum horário configurado. Clique em "Adicionar Horário" para começar.')).toBeInTheDocument()
    })
  })

  it('adiciona um novo horário quando clica em "Adicionar Horário"', async () => {
    const user = userEvent.setup()
    render(<AvailabilityForm />)

    const addButton = screen.getByText('Adicionar Horário')
    await user.click(addButton)

    await waitFor(() => {
      expect(screen.getByDisplayValue('Segunda-feira')).toBeInTheDocument()
      expect(screen.getByDisplayValue('09:00')).toBeInTheDocument()
      expect(screen.getByDisplayValue('18:00')).toBeInTheDocument()
    })
  })

  it('remove um horário quando clica em "Remover"', async () => {
    const user = userEvent.setup()
    render(<AvailabilityForm />)

    // Adiciona um horário
    const addButton = screen.getByText('Adicionar Horário')
    await user.click(addButton)

    await waitFor(() => {
      expect(screen.getByDisplayValue('Segunda-feira')).toBeInTheDocument()
    })

    // Remove o horário
    const removeButton = screen.getByText('Remover')
    await user.click(removeButton)

    await waitFor(() => {
      expect(screen.queryByDisplayValue('Segunda-feira')).not.toBeInTheDocument()
      expect(screen.getByText('Nenhum horário configurado. Clique em "Adicionar Horário" para começar.')).toBeInTheDocument()
    })
  })

  it('carrega disponibilidades existentes na inicialização', async () => {
    const mockAvailabilities = [
      {
        day_of_week: 1,
        start_time: '10:00',
        end_time: '16:00',
      },
    ]

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ availabilities: mockAvailabilities }),
    })

    render(<AvailabilityForm />)

    await waitFor(() => {
      expect(screen.getByDisplayValue('Segunda-feira')).toBeInTheDocument()
      expect(screen.getByDisplayValue('10:00')).toBeInTheDocument()
      expect(screen.getByDisplayValue('16:00')).toBeInTheDocument()
    })
  })

  it('submete o formulário com sucesso', async () => {
    const user = userEvent.setup()
    const mockOnSuccess = jest.fn()

    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ availabilities: [] }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })

    render(<AvailabilityForm onSuccess={mockOnSuccess} />)

    // Adiciona um horário
    const addButton = screen.getByText('Adicionar Horário')
    await user.click(addButton)

    // Submete o formulário
    const submitButton = screen.getByText('Salvar Disponibilidade')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Disponibilidade salva com sucesso!')).toBeInTheDocument()
    })

    expect(mockOnSuccess).toHaveBeenCalled()
  })

  it('mostra erro quando a submissão falha', async () => {
    const user = userEvent.setup()

    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ availabilities: [] }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: 'Erro no servidor' }),
      })

    render(<AvailabilityForm />)

    // Adiciona um horário
    const addButton = screen.getByText('Adicionar Horário')
    await user.click(addButton)

    // Submete o formulário
    const submitButton = screen.getByText('Salvar Disponibilidade')
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText('Erro no servidor')).toBeInTheDocument()
    })
  })

  it('desabilita botões durante o carregamento', async () => {
    const user = userEvent.setup()

    // Mock para simular resposta lenta
    ;(global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ availabilities: [] }),
      })
      .mockImplementationOnce(() => new Promise(resolve => setTimeout(resolve, 1000)))

    render(<AvailabilityForm />)

    // Adiciona um horário
    const addButton = screen.getByText('Adicionar Horário')
    await user.click(addButton)

    // Submete o formulário
    const submitButton = screen.getByText('Salvar Disponibilidade')
    await user.click(submitButton)

    // Verifica se os botões estão desabilitados
    expect(screen.getByText('Salvando...')).toBeInTheDocument()
    expect(screen.getByText('Adicionar Horário')).toBeDisabled()
    expect(screen.getByText('Remover')).toBeDisabled()
  })

  it('permite múltiplos horários para diferentes dias', async () => {
    const user = userEvent.setup()
    render(<AvailabilityForm />)

    // Adiciona primeiro horário
    const addButton = screen.getByText('Adicionar Horário')
    await user.click(addButton)

    // Adiciona segundo horário
    await user.click(addButton)

    await waitFor(() => {
      const removeButtons = screen.getAllByText('Remover')
      expect(removeButtons).toHaveLength(2)
    })
  })
})