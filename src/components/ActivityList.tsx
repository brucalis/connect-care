import React from "react";
import { Activity, ActivityStatus } from "@/types/activities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket, Info, TriangleAlert, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface ActivityListProps {
  activities: Activity[];
  loading: boolean;
  error: string | null;
}

interface ActivityDetailProps {
  activity: Activity;
}

const getStatusVariant = (status: ActivityStatus) => {
  switch (status) {
    case ActivityStatus.PENDING:
      return "secondary";
    case ActivityStatus.IN_PROGRESS:
      return "default";
    case ActivityStatus.COMPLETED:
      return "success";
    case ActivityStatus.OVERDUE:
      return "destructive";
    default:
      return "outline";
  }
};

const getStatusText = (status: ActivityStatus) => {
  switch (status) {
    case ActivityStatus.PENDING:
      return "Pendente";
    case ActivityStatus.IN_PROGRESS:
      return "Em Andamento";
    case ActivityStatus.COMPLETED:
      return "Concluída";
    case ActivityStatus.OVERDUE:
      return "Atrasada";
    default:
      return "Desconhecido";
  }
};

function ActivityDetail({ activity }: ActivityDetailProps) {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-2xl font-bold">{activity.title}</h3>
      <p className="text-muted-foreground">{activity.description}</p>
      <Separator />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Responsável</p>
          <p className="text-base">{activity.assignedTo}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Prazo</p>
          <p className="text-base">{format(parseISO(activity.dueDate), "dd/MM/yyyy HH:mm", { locale: ptBR })}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Status</p>
          <Badge variant={getStatusVariant(activity.status)}>{getStatusText(activity.status)}</Badge>
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="text-lg font-semibold mb-2">Histórico</h4>
        {activity.history && activity.history.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {activity.history.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Nenhum histórico disponível.</p>
        )}
      </div>
    </div>
  );
}

export function ActivityList({ activities, loading, error }: ActivityListProps) {
  const [selectedActivity, setSelectedActivity] = React.useState<Activity | null>(null);

  const sortedActivities = [...activities].sort((a, b) => {
    const dateA = parseISO(a.dueDate);
    const dateB = parseISO(b.dueDate);
    return dateB.getTime() - dateA.getTime(); // Mais recentes primeiro
  });

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Lista de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
            <div className="flex items-center justify-center p-4 text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Carregando atividades...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (sortedActivities.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Nenhuma atividade encontrada</AlertTitle>
        <AlertDescription>
          Não há atividades para exibir com os filtros atuais. Tente ajustar sua busca.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedActivities.map((activity) => (
                <TableRow key={activity.id} onClick={() => setSelectedActivity(activity)} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {activity.title}
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{activity.description}</p>
                  </TableCell>
                  <TableCell>{activity.category}</TableCell>
                  <TableCell>{activity.assignedTo}</TableCell>
                  <TableCell>{format(parseISO(activity.dueDate), "dd/MM/yyyy HH:mm", { locale: ptBR })}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={getStatusVariant(activity.status)}>{getStatusText(activity.status)}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Detalhes da Atividade</SheetTitle>
            <SheetDescription>
              Visualize as informações completas e o histórico desta atividade.
            </SheetDescription>
          </SheetHeader>
          {selectedActivity && <ActivityDetail activity={selectedActivity} />}
        </SheetContent>
      </Sheet>
    </>
  );
}
