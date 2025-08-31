import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Users, 
  Smartphone, 
  BarChart3, 
  Shield, 
  Zap, 
  HeartHandshake 
} from "lucide-react";

const benefits = [
  {
    icon: Calendar,
    title: "Agendamento Inteligente",
    description: "Sistema automatizado que evita conflitos e otimiza sua agenda em tempo real.",
    badge: "Popular",
    color: "text-blue-600"
  },
  {
    icon: Clock,
    title: "Economia de Tempo",
    description: "Reduza em até 80% o tempo gasto com gestão de agendamentos manuais.",
    badge: "Eficiência",
    color: "text-green-600"
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description: "Mantenha histórico completo, preferências e dados de contato organizados.",
    badge: "Essencial",
    color: "text-purple-600"
  },
  {
    icon: Smartphone,
    title: "Acesso Mobile",
    description: "Gerencie sua agenda de qualquer lugar com nosso app responsivo.",
    badge: "Mobilidade",
    color: "text-indigo-600"
  },
  {
    icon: BarChart3,
    title: "Relatórios Detalhados",
    description: "Analise performance, receita e tendências com dashboards intuitivos.",
    badge: "Analytics",
    color: "text-orange-600"
  },
  {
    icon: Shield,
    title: "Segurança Total",
    description: "Seus dados protegidos com criptografia de nível bancário e backup automático.",
    badge: "Seguro",
    color: "text-red-600"
  },
  {
    icon: Zap,
    title: "Automação Completa",
    description: "Lembretes automáticos, confirmações e follow-ups sem intervenção manual.",
    badge: "Automação",
    color: "text-yellow-600"
  },
  {
    icon: HeartHandshake,
    title: "Suporte 24/7",
    description: "Equipe especializada disponível sempre que você precisar de ajuda.",
    badge: "Suporte",
    color: "text-pink-600"
  }
];

export function Benefits() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Benefícios
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Por que escolher nossa
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> plataforma?</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Descubra como nossa solução pode transformar a gestão do seu negócio 
            e proporcionar uma experiência excepcional para seus clientes.
          </p>
        </div>
        
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 relative">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-${benefit.color.split('-')[1]}-100 to-${benefit.color.split('-')[1]}-200 dark:from-${benefit.color.split('-')[1]}-900 dark:to-${benefit.color.split('-')[1]}-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="absolute -top-2 -right-2 text-xs px-2 py-1"
                    >
                      {benefit.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {benefit.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Pronto para experimentar todos esses benefícios?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Badge variant="outline" className="px-4 py-2">
              ✅ Teste grátis por 14 dias
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              ✅ Sem compromisso
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              ✅ Suporte incluído
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}