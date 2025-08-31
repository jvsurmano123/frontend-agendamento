import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          <Card className="w-full max-w-2xl mx-auto shadow-xl">
            <CardHeader className="space-y-6">
              <CardTitle className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Bem-vindo ao Nosso Serviço
              </CardTitle>
              <CardDescription className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Descubra uma nova forma de gerenciar suas tarefas e projetos. 
                Nossa plataforma oferece ferramentas poderosas e intuitivas 
                para aumentar sua produtividade.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <h3 className="font-semibold">Rápido</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Interface otimizada para máxima eficiência</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <h3 className="font-semibold">Seguro</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Seus dados protegidos com criptografia avançada</p>
                </div>
                <div className="space-y-2">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="font-semibold">Intuitivo</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Design pensado para facilitar seu trabalho</p>
                </div>
              </div>
              
              <div className="pt-4">
                <Link href="/signup">
                  <Button size="lg" className="w-full md:w-auto px-8 py-3 text-lg font-semibold">
                    Cadastre-se Agora
                  </Button>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium">
                    Faça login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
