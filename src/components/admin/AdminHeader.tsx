
import { Button } from "@/components/ui/button";
import { Plus, Settings } from "lucide-react";

interface AdminHeaderProps {
  onAddMovie: () => void;
}

const AdminHeader = ({ onAddMovie }: AdminHeaderProps) => {
  return (
    <header className="border-b border-luxury-border bg-card/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground text-sm md:text-base">Manage your cinema platform</p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="gap-2 justify-center">
              <Settings className="w-4 h-4" />
              Settings
            </Button>
            <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 justify-center" onClick={onAddMovie}>
              <Plus className="w-4 h-4" />
              Add Movie
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
