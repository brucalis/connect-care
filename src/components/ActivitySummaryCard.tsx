import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivitySummaryCardProps {
  title: string;
  value: number;
  icon: React.ElementType;
  colorClass?: string;
}

export function ActivitySummaryCard({ title, value, icon: Icon, colorClass }: ActivitySummaryCardProps) {
  return (
    <Card className="flex-1 min-w-[180px]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-4 w-4 text-muted-foreground", colorClass)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
