import { Hero } from "@/components/landing/hero";
import { Benefits } from "@/components/landing/benefits";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { Footer } from "@/components/landing/footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AgendaPro - Gestão de Agendamentos Profissional',
  description: 'Plataforma completa para profissionais que querem organizar sua agenda, aumentar produtividade e oferecer melhor experiência aos clientes.',
  keywords: 'agendamento, gestão, profissionais, agenda, produtividade, clientes',
  openGraph: {
    title: 'AgendaPro - Gestão de Agendamentos Profissional',
    description: 'Transforme a gestão do seu negócio com nossa plataforma de agendamentos.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </main>
  );
}
