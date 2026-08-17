import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, CheckSquare, Clock, TrendingUp } from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    pendingTasks: 0,
    completedTasks: 0,
  });

  const chartData = [
    { name: "Pendentes", value: stats.pendingTasks, color: "oklch(0.5 0.05 285)" },
    { name: "Em Andamento", value: 2, color: "oklch(0.6 0.2 285)" }, // Mock for visual
    { name: "Concluídas", value: stats.completedTasks, color: "oklch(0.7 0.15 180)" },
  ];

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Mock stats for demo
    setStats({
      totalCampaigns: 12,
      activeCampaigns: 5,
      pendingTasks: 8,
      completedTasks: 15,
    });
  }, []);

  const statCards = [
    { label: "Total de Campanhas", value: stats.totalCampaigns, icon: Target, color: "text-blue-500" },
    { label: "Campanhas Ativas", value: stats.activeCampaigns, icon: TrendingUp, color: "text-green-500" },
    { label: "Tarefas Pendentes", value: stats.pendingTasks, icon: Clock, color: "text-amber-500" },
    { label: "Tarefas Concluídas", value: stats.completedTasks, icon: CheckSquare, color: "text-primary" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Olá, {user?.user_metadata?.full_name?.split(" ")[0] || "Usuário"} 👋
        </h1>
        <p className="text-muted-foreground mt-1">Aqui está o que está acontecendo com suas campanhas hoje.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.label}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Status das Tarefas</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="oklch(0.9 0.02 285)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Campanhas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Lançamento Verão", channel: "Instagram", status: "Ativa" },
                { name: "Black Friday 2026", channel: "E-mail", status: "Planejamento" },
                { name: "Promoção Dia das Mães", channel: "Facebook", status: "Concluída" }
              ].map((campaign, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium text-sm">{campaign.name}</p>
                    <p className="text-xs text-muted-foreground">{campaign.channel}</p>
                  </div>
                  <div className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${
                    campaign.status === "Ativa" ? "bg-green-100 text-green-700" :
                    campaign.status === "Planejamento" ? "bg-blue-100 text-blue-700" :
                    "bg-gray-100 text-gray-700"
                  }`}>
                    {campaign.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
