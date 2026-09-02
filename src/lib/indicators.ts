import { Campaign, CampaignAttentionLevel, CampaignHealth, Task } from "@/integrations/supabase/types";

/**
 * Calcula o nível de atenção de uma campanha com base em suas tarefas.
 * @param campaign A campanha a ser avaliada.
 * @param tasks As tarefas associadas à campanha.
 * @returns O nível de atenção da campanha.
 */
export function calculateCampaignAttentionLevel(campaign: Campaign, tasks: Task[]): CampaignAttentionLevel {
  const overdueTasks = tasks.filter(task => task.campaign_id === campaign.id && task.status !== 'completed' && new Date(task.due_date) < new Date());
  const highPriorityPendingTasks = tasks.filter(task => task.campaign_id === campaign.id && task.status === 'pending' && task.priority === 'high');
  const urgentPendingTasks = tasks.filter(task => task.campaign_id === campaign.id && task.status === 'pending' && task.priority === 'urgent');

  if (overdueTasks.length > 5 || urgentPendingTasks.length > 0) {
    return 'critical';
  } else if (overdueTasks.length > 2 || highPriorityPendingTasks.length > 3) {
    return 'high';
  } else if (overdueTasks.length > 0 || highPriorityPendingTasks.length > 0) {
    return 'medium';
  } else {
    return 'low';
  }
}

/**
 * Calcula a saúde geral de uma campanha.
 * @param campaign A campanha a ser avaliada.
 * @param tasks As tarefas associadas à campanha.
 * @returns A saúde da campanha.
 */
export function calculateCampaignHealth(campaign: Campaign, tasks: Task[]): CampaignHealth {
  const totalTasks = tasks.filter(task => task.campaign_id === campaign.id).length;
  const completedTasks = tasks.filter(task => task.campaign_id === campaign.id && task.status === 'completed').length;

  if (totalTasks === 0) {
    return 'good'; // Sem tarefas, sem problemas aparentes
  }

  const completionRate = completedTasks / totalTasks;

  if (completionRate >= 0.9) {
    return 'excellent';
  } else if (completionRate >= 0.7) {
    return 'good';
  } else if (completionRate >= 0.4) {
    return 'fair';
  } else {
    return 'poor';
  }
}

// Exemplo de função para calcular o progresso de uma campanha
export function calculateCampaignProgress(campaign: Campaign, tasks: Task[]): number {
  const campaignTasks = tasks.filter(task => task.campaign_id === campaign.id);
  if (campaignTasks.length === 0) return 0;

  const completedTasks = campaignTasks.filter(task => task.status === 'completed').length;
  return (completedTasks / campaignTasks.length) * 100;
}
