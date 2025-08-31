import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Heart,
  Shield,
  Clock,
  Users
} from "lucide-react";
import Link from "next/link";

const footerLinks = {
  product: [
    { name: "Funcionalidades", href: "#features" },
    { name: "Preços", href: "#pricing" },
    { name: "Integrações", href: "#integrations" },
    { name: "API", href: "#api" },
    { name: "Atualizações", href: "#updates" }
  ],
  company: [
    { name: "Sobre nós", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Carreiras", href: "/careers" },
    { name: "Imprensa", href: "/press" },
    { name: "Parceiros", href: "/partners" }
  ],
  support: [
    { name: "Central de Ajuda", href: "/help" },
    { name: "Documentação", href: "/docs" },
    { name: "Status", href: "/status" },
    { name: "Contato", href: "/contact" },
    { name: "Comunidade", href: "/community" }
  ],
  legal: [
    { name: "Privacidade", href: "/privacy" },
    { name: "Termos", href: "/terms" },
    { name: "Cookies", href: "/cookies" },
    { name: "LGPD", href: "/lgpd" },
    { name: "Segurança", href: "/security" }
  ]
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "blue" },
  { name: "Twitter", icon: Twitter, href: "#", color: "sky" },
  { name: "Instagram", icon: Instagram, href: "#", color: "pink" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "blue" },
  { name: "YouTube", icon: Youtube, href: "#", color: "red" }
];

const trustBadges = [
  {
    icon: Shield,
    text: "SSL Seguro",
    description: "Certificado de segurança"
  },
  {
    icon: Clock,
    text: "99.9% Uptime",
    description: "Disponibilidade garantida"
  },
  {
    icon: Users,
    text: "50k+ Usuários",
    description: "Confiança comprovada"
  }
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                AgendaPro
              </h3>
              <p className="text-gray-300 mt-2 leading-relaxed">
                A plataforma completa para gestão de agendamentos que transforma 
                a forma como você gerencia seu negócio.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>contato@agendapro.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>São Paulo, SP - Brasil</span>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <Link
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-lg bg-gray-800 hover:bg-${social.color}-600 flex items-center justify-center transition-all duration-300 hover:scale-110`}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Produto</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Suporte</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-semibold text-white mb-2">
              Fique por dentro das novidades
            </h4>
            <p className="text-gray-300 mb-6">
              Receba dicas, atualizações e conteúdo exclusivo sobre gestão de negócios
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 px-6 py-3">
                Inscrever-se
              </Button>
            </div>
          </div>
        </div>
        
        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {trustBadges.map((badge, index) => {
              const IconComponent = badge.icon;
              return (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-sm">
                      {badge.text}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {badge.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <span>© 2024 AgendaPro. Todos os direitos reservados.</span>
            </div>
            
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-gray-700 text-gray-300">
                🇧🇷 Feito no Brasil
              </Badge>
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <span>Feito com</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>para empreendedores</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}