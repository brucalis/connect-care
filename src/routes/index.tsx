import { createFileRoute, Link } from "@tanstack/react-router";


import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  CheckCircle,
  Target,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marketing Charts | Gerenciador de Campanhas de Marketing" },
      {
        name: "description",
        content:
          "Organize campanhas, tarefas e resultados de marketing em um só lugar com o Marketing Charts.",
      },
      {
        property: "og:title",
        content: "Marketing Charts | Gerenciador de Campanhas de Marketing",
      },
      {
        property: "og:description",
        content:
          "Organize campanhas, tarefas e resultados de marketing em um só lugar com o Marketing Charts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

const benefits = [
  {
    icon: Target,
    title: "Campanhas organizadas",
    description:
      "Planeje, acompanhe e finalize campanhas por canal, orçamento e período em uma visão única.",
  },
  {
    icon: CheckCircle,
    title: "Tarefas sob controle",
    description:
      "Priorize entregas, defina prazos e acompanhe o andamento do time sem planilhas paralelas.",
  },
  {
    icon: BarChart3,
    title: "Resultados visíveis",
    description:
      "Veja indicadores de campanhas ativas e tarefas concluídas direto no painel principal.",
  },
];


function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 md:px-6 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
              Marketing organizado do plano à entrega
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              O Marketing Charts reúne campanhas, tarefas e indicadores em uma
              plataforma simples, rápida e feita para times enxutos.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button size="lg" asChild>
                <Link to="/auth/register">
                  Começar gratuitamente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Demonstração visual do painel */}
          <div className="mx-auto mt-16 max-w-4xl rounded-2xl border bg-card p-6 shadow-lg">
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: "Campanhas ativas", value: "8" },
                { label: "Tarefas pendentes", value: "14" },
                { label: "Tarefas concluídas", value: "62" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl border bg-background p-4">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="mt-1 text-3xl font-bold text-primary">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm font-semibold">Campanhas recentes</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Lançamento Primavera — Instagram</li>
                  <li>Reengajamento — E-mail</li>
                  <li>Promoção Relâmpago — WhatsApp</li>
                </ul>
              </div>
              <div className="rounded-xl border bg-background p-4">
                <p className="text-sm font-semibold">Próximas tarefas</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Aprovar criativos — hoje</li>
                  <li>Revisar orçamento de mídia — amanhã</li>
                  <li>Publicar newsletter — sexta</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefícios */}
        <section className="border-t bg-muted/30 py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-center text-3xl font-bold tracking-tight">
              Tudo o que seu time de marketing precisa
            </h2>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border bg-card p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{benefit.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* CTA final */}
        <section className="border-t bg-gradient-to-r from-primary/10 to-pink-500/10 py-20">
          <div className="container mx-auto px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold tracking-tight">
              Pronto para florescer seus resultados?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Crie sua conta e organize sua primeira campanha ainda hoje.
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link to="/auth/register">
                Começar gratuitamente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2026 Marketing Charts. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <Link to="/auth/login" className="text-sm text-muted-foreground hover:text-primary">
                Entrar
              </Link>
              <Link to="/auth/register" className="text-sm text-muted-foreground hover:text-primary">
                Criar conta
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
