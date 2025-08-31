import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Quote, 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign,
  CheckCircle
} from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Maria Silva",
    role: "Esteticista",
    company: "Clínica Bella Vita",
    content: "Desde que comecei a usar a plataforma, meus agendamentos aumentaram 300%. A automação me deu tempo para focar no que realmente importa: meus clientes.",
    rating: 5,
    avatar: "/api/placeholder/64/64",
    results: "300% mais agendamentos"
  },
  {
    name: "João Santos",
    role: "Barbeiro",
    company: "Barbearia Moderna",
    content: "Incrível como algo tão simples pode transformar um negócio. Não perco mais clientes por telefone ocupado e minha agenda está sempre organizada.",
    rating: 5,
    avatar: "/api/placeholder/64/64",
    results: "Zero ligações perdidas"
  },
  {
    name: "Ana Costa",
    role: "Fisioterapeuta",
    company: "Clínica Movimento",
    content: "O sistema de lembretes automáticos reduziu drasticamente as faltas. Meus pacientes adoram a praticidade de agendar pelo celular.",
    rating: 5,
    avatar: "/api/placeholder/64/64",
    results: "90% menos faltas"
  },
  {
    name: "Carlos Oliveira",
    role: "Personal Trainer",
    company: "Fit Training",
    content: "Consegui organizar melhor meus horários e aumentar minha receita em 40%. O relatório mensal me ajuda a tomar decisões estratégicas.",
    rating: 5,
    avatar: "/api/placeholder/64/64",
    results: "40% mais receita"
  },
  {
    name: "Lucia Ferreira",
    role: "Dentista",
    company: "Odonto Smile",
    content: "Meus pacientes elogiam constantemente a facilidade para agendar. A plataforma profissionalizou completamente meu atendimento.",
    rating: 5,
    avatar: "/api/placeholder/64/64",
    results: "100% satisfação"
  },
  {
    name: "Roberto Lima",
    role: "Consultor",
    company: "Lima Consultoria",
    content: "Como consultor, preciso de flexibilidade. Esta plataforma me permite gerenciar múltiplos tipos de reunião de forma eficiente.",
    rating: 5,
    avatar: "/api/placeholder/64/64",
    results: "5x mais produtivo"
  }
];

const stats = [
  {
    icon: Users,
    value: "50.000+",
    label: "Profissionais ativos",
    color: "blue"
  },
  {
    icon: Calendar,
    value: "2M+",
    label: "Agendamentos realizados",
    color: "green"
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Taxa de satisfação",
    color: "purple"
  },
  {
    icon: DollarSign,
    value: "R$ 50M+",
    label: "Em receita gerada",
    color: "orange"
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-2">
            Depoimentos
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Histórias de
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> sucesso reais</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Veja como profissionais como você transformaram seus negócios 
            e alcançaram resultados extraordinários.
          </p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="text-center border-0 shadow-lg bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
                <CardContent className="pt-6">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-${stat.color}-100 to-${stat.color}-200 dark:from-${stat.color}-900 dark:to-${stat.color}-800 flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                  <div className={`text-2xl md:text-3xl font-bold text-${stat.color}-600 dark:text-${stat.color}-400 mb-2`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-gray-400" />
              </div>
              
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 flex items-center justify-center text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {testimonial.company}
                    </p>
                    <div className="mt-2">
                      <StarRating rating={testimonial.rating} />
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{testimonial.content}"
                </CardDescription>
                
                <Badge 
                  variant="secondary" 
                  className="bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900 dark:to-blue-900 text-green-700 dark:text-green-300 border-0"
                >
                  📈 {testimonial.results}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Seja o próximo caso de sucesso!
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Junte-se a milhares de profissionais que já transformaram seus resultados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Badge variant="outline" className="px-4 py-2">
                ⭐ 4.9/5 estrelas
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                🏆 Líder de mercado
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                🔒 100% seguro
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}