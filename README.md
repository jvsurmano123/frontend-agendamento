# Projeto Landing Page - Next.js + Supabase

Este é um projeto [Next.js](https://nextjs.org) com integração ao [Supabase](https://supabase.com) e [shadcn/ui](https://ui.shadcn.com), criado para demonstrar uma landing page moderna e responsiva.

## 🚀 Stack de Tecnologia

- **Frontend Framework:** Next.js 14+ com App Router
- **UI Library:** React 18+
- **Componentes UI:** shadcn/ui com Radix UI
- **Estilização:** Tailwind CSS
- **Backend/DB:** Supabase
- **Linguagem:** TypeScript 5+
- **Hospedagem:** Vercel

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm, yarn, pnpm ou bun
- Conta no Supabase (para configuração do banco de dados)

## 🛠️ Configuração do Ambiente

### 1. Instalação das Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### 2. Configuração das Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto e configure as seguintes variáveis:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_projeto_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_supabase
```

**Como obter as credenciais do Supabase:**

📖 **Guia Detalhado:** Consulte o arquivo `SUPABASE_SETUP.md` para instruções completas.

**Resumo rápido:**
1. Acesse [supabase.com](https://supabase.com) e faça login
2. Crie um novo projeto ou acesse um existente
3. Vá em Settings > API
4. Copie a URL do projeto e a chave anônima (anon key)

### 3. Executar o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📁 Estrutura do Projeto

```
/
├── src/
│   ├── app/                    # App Router do Next.js 14+
│   │   ├── globals.css         # Estilos globais
│   │   ├── layout.tsx          # Layout raiz
│   │   └── page.tsx            # Landing page principal
│   ├── components/             # Componentes React reutilizáveis
│   │   └── ui/                 # Componentes shadcn/ui
│   ├── lib/                    # Utilitários e configurações
│   │   ├── supabase/           # Cliente e configurações do Supabase
│   │   └── utils.ts            # Funções utilitárias
│   └── types/                  # Definições de tipos TypeScript
├── public/                     # Assets estáticos
├── .env.local                  # Variáveis de ambiente (não commitado)
├── components.json             # Configuração do shadcn/ui
├── next.config.ts              # Configuração do Next.js
├── tailwind.config.ts          # Configuração do Tailwind
└── package.json
```

## 🎨 Componentes UI

Este projeto utiliza [shadcn/ui](https://ui.shadcn.com) para componentes de interface. Para adicionar novos componentes:

```bash
npx shadcn@latest add [nome-do-componente]
```

Exemplo:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add form
```

## 🧪 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa o linter ESLint
- `npm run test` - Executa os testes (quando configurados)

## 🔧 Configurações Importantes

### Next.js Config
O arquivo `next.config.ts` está configurado para:
- Usar App Router (padrão no Next.js 14+)
- Integração otimizada com Supabase
- Preparação para deploy na Vercel

### Tailwind CSS
Configuração personalizada para trabalhar com shadcn/ui, incluindo:
- Variáveis CSS customizadas
- Tema dark/light mode
- Animações e transições

### TypeScript
Configuração rigorosa para máxima type safety:
- Strict mode habilitado
- Path mapping configurado (`@/*` aponta para `src/*`)
- Tipos do Next.js e React incluídos

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente no dashboard da Vercel
3. O deploy será automático a cada push na branch principal

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Node.js:
- Netlify
- Railway
- Render
- AWS Amplify

## 📚 Recursos Úteis

- [Documentação do Next.js](https://nextjs.org/docs)
- [Documentação do Supabase](https://supabase.com/docs)
- [Documentação do shadcn/ui](https://ui.shadcn.com)
- [Documentação do Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique se todas as dependências estão instaladas
2. Confirme se as variáveis de ambiente estão configuradas corretamente
3. Consulte a documentação das tecnologias utilizadas
4. Abra uma issue no repositório do projeto
