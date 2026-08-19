import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, CheckCircle, Target, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-pink-500">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">Future Bloom</span>
          </div>
          <nav className="hidden
/* ... trecho reduzido automaticamente ... */
sName="text-sm text-muted-foreground">© 2026 Future Bloom. Todos os direitos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacidade</a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary">Termos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
