export const ActivityStatus = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  OVERDUE: 'overdue',
} as const;
export type ActivityStatus = typeof ActivityStatus[keyof typeof ActivityStatus];

export const ActivityPriority = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const;
export type ActivityPriority = typeof ActivityPriority[keyof typeof ActivityPriority];

export const ActivityType = {
  EMAIL: 'email',
  SOCIAL_MEDIA: 'social_media',
  BLOG_POST: 'blog_post',
  AD_CAMPAIGN: 'ad_campaign',
  EVENT: 'event',
  OTHER: 'other',
} as const;
export type ActivityType = typeof ActivityType[keyof typeof ActivityType];

export interface Activity {
  id: string;
  name: string;
  description?: string;
  status: ActivityStatus;
  priority: ActivityPriority;
  type: ActivityType;
  dueDate: string; // ISO date string
  campaignId?: string; // Optional, if activity belongs to a campaign
  assignedTo?: string; // User ID or name
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ActivityFilter {
  status?: ActivityStatus[];
  priority?: ActivityPriority[];
  type?: ActivityType[];
  dueDateRange?: { start?: string; end?: string }; // ISO date strings
  campaignId?: string;
  assignedTo?: string;
  search?: string; // Full-text search
}

export interface ActivityIndicator {
  totalActivities: number;
  pendingActivities: number;
  completedActivities: number;
  overdueActivities: number;
  inProgressActivities: number;
  activitiesDueSoon: number; // e.g., next 7 days
}

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: 'act-001',
    name: 'Criar rascunho de email para lançamento de produto',
    description: 'Escrever o conteúdo do email de anúncio do novo produto X para a base de clientes.',
    status: 'in_progress',
    priority: 'high',
    type: 'email',
    dueDate: '2024-07-20',
    campaignId: 'camp-001',
    assignedTo: 'user-001',
    createdAt: '2024-07-01T10:00:00Z',
    updatedAt: '2024-07-15T14:30:00Z'
  },
  {
    id: 'act-002',
    name: 'Agendar posts para redes sociais da semana',
    description: 'Preparar e agendar posts para Instagram, Facebook e LinkedIn sobre o novo blog post.',
    status: 'pending',
    priority: 'medium',
    type: 'social_media',
    dueDate: '2024-07-18',
    campaignId: 'camp-002',
    assignedTo: 'user-002',
    createdAt: '2024-07-05T11:00:00Z',
    updatedAt: '2024-07-05T11:00:00Z'
  },
  {
    id: 'act-003',
    name: 'Revisar artigo do blog sobre SEO para e-commerce',
    description: 'Fazer a revisão final do artigo antes da publicação, verificando gramática e otimização SEO.',
    status: 'completed',
    priority: 'high',
    type: 'blog_post',
    dueDate: '2024-07-10',
    campaignId: 'camp-003',
    assignedTo: 'user-001',
    createdAt: '2024-07-03T09:00:00Z',
    updatedAt: '2024-07-10T16:00:00Z'
  },
  {
    id: 'act-004',
    name: 'Analisar desempenho da campanha de Google Ads',
    description: 'Verificar métricas de CPC, CTR e conversão da campanha de Google Ads do mês passado.',
    status: 'overdue',
    priority: 'high',
    type: 'ad_campaign',
    dueDate: '2024-07-01',
    campaignId: 'camp-004',
    assignedTo: 'user-003',
    createdAt: '2024-06-25T14:00:00Z',
    updatedAt: '2024-07-05T10:00:00Z'
  },
  {
    id: 'act-005',
    name: 'Planejar webinar sobre marketing de conteúdo',
    description: 'Definir tópicos, palestrantes e plataforma para o próximo webinar.',
    status: 'pending',
    priority: 'medium',
    type: 'event',
    dueDate: '2024-08-01',
    campaignId: 'camp-005',
    assignedTo: 'user-002',
    createdAt: '2024-07-12T13:00:00Z',
    updatedAt: '2024-07-12T13:00:00Z'
  },
  {
    id: 'act-006',
    name: 'Atualizar landing page de produto X',
    description: 'Adicionar novas seções e depoimentos à landing page do produto X.',
    status: 'in_progress',
    priority: 'medium',
    type: 'other',
    dueDate: '2024-07-25',
    campaignId: 'camp-001',
    assignedTo: 'user-001',
    createdAt: '2024-07-10T10:00:00Z',
    updatedAt: '2024-07-16T09:00:00Z'
  }
];
