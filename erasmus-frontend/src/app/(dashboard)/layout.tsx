import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { EuStarsBackground } from '@/components/eu-stars';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-sm px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1" />
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden sm:inline">🇪🇺</span>
            <span className="font-medium">Erasmus+ Youth Exchange</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <EuStarsBackground />
          <div className="p-6">
            {children}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

