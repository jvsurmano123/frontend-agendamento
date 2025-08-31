import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  UserPlus, 
  Calendar, 
  Bell, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  Smartphone
} from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Cadastro Rápido",
    description: "Crie sua conta em menos de 2 minutos. Apenas informações básicas são necessárias para começar.",
    details: ["Email e senha", "Dados do negócio", "Configuração inicial"],
    color: "blue",
    time: "2 min"
  },
  {
    step: "02",
    icon: Calendar,
    title: "Configure sua Agenda",
    description: "Defina seus horários de atendimento, tipos de serviço e duração de cada agendamento.",
    details: ["Horários disponíveis", "Tipos de serviço", "Preços e duração"],
    color: "green",
    time: "5 min"
  },
  {
    step: "03",
    icon: Smartphone,
    title: "Compartilhe o Link",
    description: "Envie seu link personalizado para clientes agendarem diretamente, sem intermediários.",
    details: ["Link personalizado", "QR Code", "Integração redes sociais"],
    color: "purple",
    time: "1 min"
  },
  {
    step: "04",
    icon: Bell,
    title: "Receba Notificações",
    description: "Seja notificado automaticamente sobre novos agendamentos, cancelamentos e lembretes.",
    details: ["Push notifications", "Email automático", "SMS (opcional)"],
    color: "orange",
    time: "Automático"
  },
  {
    step: "05",
    icon: BarChart3,
    title: "Acompanhe Resultados",
    description: "Visualize relatórios detalhados sobre sua performance, receita e crescimento do negócio.",
    details: ["Dashboard completo", "Relatórios mensais", "Métricas de crescimento"],
    color: "indigo",
    time: "Sempre disponível"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Como Funciona
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Comece em
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> 5 passos simples</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Nossa plataforma foi projetada para ser intuitiva e fácil de usar. 
            Veja como você pode estar operando em poucos minutos.
          </p>
        </div>
        
        {/* Steps */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 dark:from-blue-800 dark:via-green-800 dark:to-purple-800 transform -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isEven = index % 2 === 1;
              
              return (
                <div key={index} className={`flex flex-col ${isEven && 'lg:mt-16'}`}>
                  <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border-0 shadow-lg bg-white dark:bg-gray-800 relative overflow-hidden">
                    {/* Step Number Badge */}
                    <div className={`absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {step.step}
                    </div>
                    
                    <CardHeader className="text-center pb-4 pt-8">
                      <div className="mx-auto mb-4">
                        <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br from-${step.color}-100 to-${step.color}-200 dark:from-${step.color}-900 dark:to-${step.color}-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className={`w-10 h-10 text-${step.color}-600 dark:text-${step.color}-400`} />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <Badge variant="outline" className="text-xs">
                          {step.time}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                        {step.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="text-center space-y-4">
                      <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {step.description}
                      </CardDescription>
                      
                      {/* Details List */}
                      <div className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    
                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2 z-20">
                        <div className={`w-6 h-6 bg-${step.color}-500 rounded-full flex items-center justify-center shadow-lg`}>
                          <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Pronto para começar?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Junte-se a milhares de profissionais que já transformaram seus negócios
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3">
                Começar Agora - Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Sem cartão de crédito</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}