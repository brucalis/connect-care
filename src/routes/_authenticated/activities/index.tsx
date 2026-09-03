import { createFileRoute } from "@tanstack/react-router";
import { ActivityList } from "@/components/ActivityList";
import { ActivityFilters, ActivityFilterState } from "@/components/ActivityFilters";
import { ActivitySummaryCard } from "@/components/ActivitySummaryCard";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Activity, ActivityStatus } from "@/types/activities";
import { List, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/activities/")({
  component: ActivitiesPage,
});

const mockActivities: Activity[] = [
  {
    id: "1",
    title: "Revisar campanha de email de boas-vindas",
    description: "Verificar copy, links e segmentação para novos usuários.",
    category: "Email Marketing",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    status: ActivityStatus.PENDING,
    assignedTo: "Ana Silva",
  },
  {
    id: "2",
    title: "Criar posts para Instagram - Lançamento de Produto",
    description: "Desenvolver 3 posts (carrossel, vídeo, imagem) para o lançamento do produto X.",
    category: "Redes Sociais",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString(),
    status: ActivityStatus.OVERDUE,
    assignedTo: "Bruno Costa",
  },
  {
    id: "3",
    title: "Analisar performance da campanha de Google Ads",
    description: "Gerar relatório de CTR, CPC e conversões da última semana.",
    category: "Mídia Paga",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    status: ActivityStatus.IN_PROGRESS,
    assignedTo: "Carlos Mendes",
  },
  {
    id: "4",
    title: "Atualizar blog post sobre SEO para iniciantes",
    description: "Revisar informações, adicionar novas dicas e otimizar para palavras-chave atuais.",
    category: "Conteúdo",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString(),
    status: ActivityStatus.PENDING,
    assignedTo: "Ana Silva",
  },
  {
    id: "5",
    title: "Reunião de planejamento de conteúdo para Q3",
    description: "Definir temas, formatos e calendário editorial para o próximo trimestre.",
    category: "Planejamento",
    dueDate: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString(),
    status: ActivityStatus.COMPLETED,
    assignedTo: "Equipe Marketing",
  },
  {
    id: "6",
    title: "Configurar automação de email para abandono de carrinho",
    description: "Integrar com e-commerce e criar sequência de 3 emails.",
    category: "Email Marketing",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString(),
    status: ActivityStatus.PENDING,
    assignedTo: "Bruno Costa",
  },
  {
    id: "7",
    title: "Criar criativos para campanha de remarketing no Facebook",
    description: "Desenvolver 4 variações de imagem e texto para diferentes públicos.",
    category: "Mídia Paga",
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    status: ActivityStatus.IN_PROGRESS,
    assignedTo: "Carlos Mendes",
  },
];

function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilterChange = (filters: ActivityFilterState) => {
    let filtered = [...mockActivities];

    if (filters.searchText.trim()) {
      const search = filters.searchText.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(search) ||
          (a.description && a.description.toLowerCase().includes(search))
      );
    }

    if (filters.category) {
      filtered = filtered.filter((a) =>
        a.category.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    if (filters.status) {
      filtered = filtered.filter((a) => a.status === filters.status);
    }

    if (filters.dateRange?.from || filters.dateRange?.to) {
      filtered = filtered.filter((a) => {
        const due = new Date(a.dueDate).getTime();
        const from = filters.dateRange?.from ? new Date(filters.dateRange.from).setHours(0, 0, 0, 0) : null;
        const to = filters.dateRange?.to ? new Date(filters.dateRange.to).setHours(23, 59, 59, 999) : null;
        if (from && due < from) return false;
        if (to && due > to) return false;
        return true;
      });
    }

    setActivities(filtered);
  };

  const handleClearFilters = () => {
    setActivities(mockActivities);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Central de Atividades</h1>
        <p className="text-muted-foreground mt-1">Gerencie e acompanhe todas as tarefas da sua equipe.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ActivitySummaryCard title="Total" value={activities.length} icon={List} colorClass="text-blue-500" />
        <ActivitySummaryCard title="Pendentes" value={activities.filter(a => a.status === ActivityStatus.PENDING).length} icon={Clock} colorClass="text-amber-500" />
        <ActivitySummaryCard title="Em Andamento" value={activities.filter(a => a.status === ActivityStatus.IN_PROGRESS).length} icon={CheckCircle2} colorClass="text-primary" />
        <ActivitySummaryCard title="Atrasadas" value={activities.filter(a => a.status === ActivityStatus.OVERDUE).length} icon={AlertTriangle} colorClass="text-destructive" />
      </div>

      <Separator />

      <ActivityFilters onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />

      <Separator />

      <ActivityList
        activities={activities}
        loading={loading}
        error={error}
      />
    </div>
  );
}
