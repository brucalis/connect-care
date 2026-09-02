import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';

// Mock data for demonstration purposes
// In a real application, this would come from an API or global state
const mockDeadlines = [
  { id: 't1', type: 'task', title: 'Revisar copy da campanha de email', dueDate: '2024-07-10', status: 'pending', campaignName: 'Lançamento de Produto X' },
  { id: 'c1', type: 'campaign', title: 'Campanha de Verão', dueDate: '2024-07-15', status: 'active' },
  { id: 't2', type: 'task', title: 'Criar artes para social media', dueDate: '2024-07-12', status: 'in_progress', campaignName: 'Campanha de Verão' },
  { id: 't3', type: 'task', title: 'Agendar posts no Instagram', dueDate: '2024-07-05', status: 'blocked', campaignName: 'Campanha de Verão' }, // Atrasado
  { id: 'c2', type: 'campaign', title: 'Campanha de Inverno', dueDate: '2024-07-20', status: 'paused' },
  { id: 't4', type: 'task', title: 'Análise de resultados do Q2', dueDate: '2024-07-13', status: 'completed', campaignName: 'Relatório Trimestral' }, // Hoje
  { id: 't5', type: 'task', title: 'Planejar próxima newsletter', dueDate: '2024-07-16', status: 'pending', campaignName: 'Comunicação Semanal' }, // Próximos 3 dias
  { id: 'c3', type: 'campaign', title: 'Campanha de Outono', dueDate: '2024-07-25', status: 'active' }, // Próximos 7 dias
  { id: 't6', type: 'task', title: 'Pesquisa de mercado para novo produto', dueDate: '2024-08-01', status: 'pending', campaignName: 'Desenvolvimento de Produto' }, // Depois de 7 dias
];

interface DeadlineItem {
  id: string;
  type: 'task' | 'campaign';
  title: string;
  dueDate: string;
  status: string;
  campaignName?: string;
}

const getCategory = (dueDate: string): string => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const date = new Date(dueDate);
  date.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'Atrasados';
  if (diffDays === 0) return 'Hoje';
  if (diffDays <= 3) return 'Próximos 3 dias';
  if (diffDays <= 7) return 'Próximos 7 dias';
  return 'Depois de 7 dias';
};

const formatDueDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export function DeadlineList() {
  const categorizedDeadlines: Record<string, DeadlineItem[]> = {
    'Atrasados': [],
    'Hoje': [],
    'Próximos 3 dias': [],
    'Próximos 7 dias': [],
    'Depois de 7 dias': [],
  };

  // Sort by date first, then categorize
  const sortedDeadlines = [...mockDeadlines].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());

  sortedDeadlines.forEach(item => {
    const category = getCategory(item.dueDate);
    if (categorizedDeadlines[category]) {
      categorizedDeadlines[category].push(item);
    }
  });

  const hasDeadlines = sortedDeadlines.length > 0;

  return (
    <div className="space-y-6">
      {!hasDeadlines && (
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Nenhum prazo próximo!</AlertTitle>
          <AlertDescription>
            Parece que não há tarefas ou campanhas com prazos definidos para os próximos dias.
          </AlertDescription>
        </Alert>
      )}

      {Object.entries(categorizedDeadlines).map(([category, items]) => {
        if (items.length === 0) return null;
        return (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-3">{category}</h3>
            <div className="space-y-3">
              {items.map(item => (
                <Card key={item.id} className="shadow-sm">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.type === 'task' && item.campaignName && (
                          <span className="mr-1">Campanha: {item.campaignName} -</span>
                        )}
                        Prazo: {formatDueDate(item.dueDate)}
                      </p>
                    </div>
                    <Badge variant={item.type === 'task' && getCategory(item.dueDate) === 'Atrasados' ? 'destructive' : 'secondary'}>
                      {item.type === 'task' ? 'Tarefa' : 'Campanha'}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Separator className="my-6" />
          </div>
        );
      })}
    </div>
  );
}
