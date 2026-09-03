import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/activities")({
  component: ActivitiesPage,
});

function ActivitiesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Central de Atividades</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Aqui você poderá gerenciar todas as suas atividades.
      </p>
    </div>
  );
}
