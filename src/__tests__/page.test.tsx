import { render, screen } from '@testing-library/react'
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
    
    const heading = screen.getByRole('heading', {
      name: /bem-vindo ao nosso projeto/i,
    })
    
    expect(heading).toBeInTheDocument()
  })

  it('renderiza a descrição do projeto', () => {
    render(<Home />)
    
    const description = screen.getByText(
      /uma landing page moderna construída com next\.js, supabase e shadcn\/ui/i
    )
    
    expect(description).toBeInTheDocument()
  })

  it('renderiza os botões de ação', () => {
    render(<Home />)
    
    const signUpButton = screen.getByRole('button', { name: /cadastre-se/i })
    const loginButton = screen.getByRole('button', { name: /fazer login/i })
    
    expect(signUpButton).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  it('renderiza os cards de funcionalidades', () => {
    render(<Home />)
    
    const feature1 = screen.getByText(/interface moderna/i)
    const feature2 = screen.getByText(/backend robusto/i)
    const feature3 = screen.getByText(/componentes reutilizáveis/i)
    
    expect(feature1).toBeInTheDocument()
    expect(feature2).toBeInTheDocument()
    expect(feature3).toBeInTheDocument()
  })

  it('renderiza as descrições das funcionalidades', () => {
    render(<Home />)
    
    const desc1 = screen.getByText(/design responsivo e acessível com shadcn\/ui/i)
    const desc2 = screen.getByText(/banco de dados e autenticação com supabase/i)
    const desc3 = screen.getByText(/biblioteca de componentes padronizada/i)
    
    expect(desc1).toBeInTheDocument()
    expect(desc2).toBeInTheDocument()
    expect(desc3).toBeInTheDocument()
  })
})