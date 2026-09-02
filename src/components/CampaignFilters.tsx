import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export function CampaignFilters() {
  const [name, setName] = useState('');
  const [channel, setChannel] = useState('');
  const [status, setStatus] = useState('');
  const [attentionLevel, setAttentionLevel] = useState('');
  const [overdueTasks, setOverdueTasks] = useState(false);
  const [dueIn7Days, setDueIn7Days] = useState(false);

  const handleClearFilters = () => {
    setName('');
    setChannel('');
    setStatus('');
    setAttentionLevel('');
    setOverdueTasks(false);
    setDueIn7Days(false);
    // In a real application, you would also trigger a data refetch here
  };

  const handleApplyFilters = () => {
    // In a real application, you would collect these filter states
    // and pass them to a data fetching mechanism (e.g., a hook or context)
    console.log({
      name, channel, status, attentionLevel, overdueTasks, dueIn7Days,
    });
    // Example: trigger a data refetch or update a global state
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="space-y-2">
        <Label htmlFor="campaign-name">Nome da Campanha</Label>
        <Input
          id="campaign-name"
          placeholder="Buscar por nome..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="campaign-channel">Canal</Label>
        <Select value={channel} onValueChange={setChannel}>
          <SelectTrigger id="campaign-channel">
            <SelectValue placeholder="Selecione o canal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="social_media">Mídias Sociais</SelectItem>
            <SelectItem value="paid_ads">Anúncios Pagos</SelectItem>
            <SelectItem value="seo">SEO</SelectItem>
            <SelectItem value="content">Conteúdo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="campaign-status">Status</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger id="campaign-status">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="active">Ativa</SelectItem>
            <SelectItem value="paused">Pausada</SelectItem>
            <SelectItem value="completed">Concluída</SelectItem>
            <SelectItem value="archived">Arquivada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="attention-level">Nível de Atenção</Label>
        <Select value={attentionLevel} onValueChange={setAttentionLevel}>
          <SelectTrigger id="attention-level">
            <SelectValue placeholder="Selecione o nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Todos</SelectItem>
            <SelectItem value="low">Baixo</SelectItem>
            <SelectItem value="medium">Médio</SelectItem>
            <SelectItem value="high">Alto</SelectItem>
            <SelectItem value="critical">Crítico</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 mt-6">
        <Checkbox
          id="overdue-tasks"
          checked={overdueTasks}
          onCheckedChange={(checked) => setOverdueTasks(!!checked)}
        />
        <Label htmlFor="overdue-tasks">Com tarefas atrasadas</Label>
      </div>

      <div className="flex items-center space-x-2 mt-6">
        <Checkbox
          id="due-in-7-days"
          checked={dueIn7Days}
          onCheckedChange={(checked) => setDueIn7Days(!!checked)}
        />
        <Label htmlFor="due-in-7-days">Prazo nos próximos 7 dias</Label>
      </div>

      <div className="col-span-full flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={handleClearFilters}>Limpar filtros</Button>
        <Button onClick={handleApplyFilters}>Aplicar filtros</Button>
      </div>
    </div>
  );
}
