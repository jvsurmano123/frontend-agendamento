import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Users, Zap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
            <Zap className="w-4 h-4 mr-2" />
            Novo: Agendamento Inteligente
          </Badge>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Simplifique
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">
              seus agendamentos
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            A plataforma completa para gerenciar agendamentos, clientes e serviços. 
            Automatize sua agenda e foque no que realmente importa: seus clientes.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 py-8">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">10.000+</span>
              <span>usuários ativos</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <span className="font-semibold">1M+</span>
              <span>agendamentos</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Zap className="w-5 h-5 text-purple-600" />
              <span className="font-semibold">99.9%</span>
              <span>uptime</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold group">
                Comece Gratuitamente
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#como-funciona">
              <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg font-semibold">
                Ver Como Funciona
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <p className="text-sm text-gray-500 dark:text-gray-400 pt-8">
            Teste grátis por 14 dias • Sem cartão de crédito • Cancele quando quiser
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}