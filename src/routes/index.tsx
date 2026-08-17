import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, CheckCircle, Target, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Future Bloom</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#benefits" className="text-sm font-medium hover:text-primary">Benefícios</a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary">Como Funciona</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/register">Começar gratuitamente</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_45%_at_50%_50%,oklch(0.45_0.25_285/0.1)_0%,transparent_100%)]" />
          <div className="container px-4 md:px-6 text-center">
            <div className="mx-auto max-w-3xl space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Gerencie seu marketing com <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">clareza e precisão</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                O Future Bloom é a plataforma completa para planejar, executar e acompanhar suas campanhas de marketing em um só lugar.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button size="lg" className="h-12 px-8 text-base" asChild>
                  <Link to="/auth/register">
                    Começar gratuitamente <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                  Ver demonstração
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="benefits" className="py-24 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Foco no Resultado</h3>
                <p className="text-muted-foreground">Planeje suas campanhas com objetivos claros e acompanhe o progresso em tempo real.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Análise Detalhada</h3>
                <p className="text-muted-foreground">Visualize o desempenho de cada canal e otimize seu orçamento de forma inteligente.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">Gestão Eficiente</h3>
                <p className="text-muted-foreground">Organize tarefas, defina prioridades e garanta que nada seja esquecido no seu funil.</p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works Section */}
        <section id="how-it-works" className="py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Como funciona o Future Bloom</h2>
              <p className="mt-4 text-lg text-muted-foreground">Quatro passos simples para transformar seu marketing digital.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { step: "01", title: "Crie sua conta", desc: "Cadastre-se em segundos e comece a organizar seus projetos." },
                { step: "02", title: "Defina campanhas", desc: "Escolha os canais, orçamentos e períodos de cada ação." },
                { step: "03", title: "Organize tarefas", desc: "Delegue ou crie check-lists para garantir a execução perfeita." },
                { step: "04", title: "Analise e cresça", desc: "Acompanhe o status e evolua suas estratégias baseada em dados." }
              ].map((item, i) => (
                <div key={i} className="relative p-6 rounded-2xl border bg-card shadow-sm">
                  <div className="text-4xl font-black text-primary/10 absolute top-4 right-6">{item.step}</div>
                  <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">Pronto para florescer seu negócio?</h2>
            <p className="mx-auto max-w-[600px] text-primary-foreground/80 text-lg mb-10">
              Junte-se a centenas de profissionais de marketing que já otimizaram seus processos com o Future Bloom.
            </p>
            <Button size="lg" variant="secondary" className="h-12 px-10 text-base" asChild>
              <Link to="/auth/register">Começar agora - É Grátis</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold tracking-tight">Future Bloom</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2026 Future Bloom. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacidade</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
