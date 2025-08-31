import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from '@/app/page'

// Mock do Next.js Link
jest.mock('next/link', () => {
  return function MockedLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('Landing Page', () => {
  it('renderiza o título principal', () => {
    render(<Home />)
    
    const heading = screen.getByText(/bem-vindo ao nosso serviço/i)
    
    expect(heading).toBeInTheDocument()
  })

  it('renderiza a descrição do projeto', () => {
    render(<Home />)
    
    const description = screen.getByText(
      /descubra uma nova forma de gerenciar suas tarefas e projetos/i
    )
    
    expect(description).toBeInTheDocument()
  })

  it('renderiza os botões de ação', () => {
    render(<Home />)
    
    const signUpButton = screen.getByRole('button', { name: /cadastre-se agora/i })
    const loginLink = screen.getByRole('link', { name: /faça login/i })
    
    expect(signUpButton).toBeInTheDocument()
    expect(loginLink).toBeInTheDocument()
  })

  it('renderiza os cards de funcionalidades', () => {
    render(<Home />)
    
    const feature1 = screen.getByText(/rápido/i)
    const feature2 = screen.getByText(/seguro/i)
    const feature3 = screen.getByText(/intuitivo/i)
    
    expect(feature1).toBeInTheDocument()
    expect(feature2).toBeInTheDocument()
    expect(feature3).toBeInTheDocument()
  })

  it('renderiza as descrições das funcionalidades', () => {
    render(<Home />)
    
    const desc1 = screen.getByText(/interface otimizada para máxima eficiência/i)
    const desc2 = screen.getByText(/seus dados protegidos com criptografia avançada/i)
    const desc3 = screen.getByText(/design pensado para facilitar seu trabalho/i)
    
    expect(desc1).toBeInTheDocument()
    expect(desc2).toBeInTheDocument()
    expect(desc3).toBeInTheDocument()
  })
})