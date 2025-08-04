
import { useState } from "react";
import { Film, Users, BarChart3, LogOut, Star, Tags } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCards from "@/components/admin/StatsCards";
import MovieUploadModal from "@/components/admin/MovieUploadModal";
import MoviesTab from "@/components/admin/MoviesTab";
import UsersTab from "@/components/admin/UsersTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import SettingsTab from "@/components/admin/SettingsTab";
import FeaturedMoviesTab from "@/components/admin/FeaturedMoviesTab";
import CategoryManagementTab from "@/components/admin/CategoryManagementTab";

const AdminPanel = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const { signOut, user } = useAuth();

  const stats = [
    { title: "Total Movies", value: "1,234", icon: Film, trend: "+12%" },
    { title: "Active Users", value: "45,678", icon: Users, trend: "+8%" },
    { title: "Downloads", value: "89,012", icon: BarChart3, trend: "+24%" },
    { title: "Revenue", value: "$23,456", icon: BarChart3, trend: "+15%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-luxury-border">
        <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user?.email}</p>
          </div>
          <Button variant="outline" onClick={signOut} className="flex items-center gap-2">
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </div>
      <AdminHeader onAddMovie={() => setShowUploadModal(true)} />
      
      <StatsCards stats={stats} />

      <section className="pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue="movies" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 bg-card border border-luxury-border">
              <TabsTrigger value="movies" className="text-xs md:text-sm">Movies</TabsTrigger>
              <TabsTrigger value="featured" className="text-xs md:text-sm flex items-center gap-1">
                <Star className="w-3 h-3" />
                Featured
              </TabsTrigger>
              <TabsTrigger value="categories" className="text-xs md:text-sm flex items-center gap-1">
                <Tags className="w-3 h-3" />
                Categories
              </TabsTrigger>
              <TabsTrigger value="users" className="text-xs md:text-sm">Users</TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs md:text-sm">Analytics</TabsTrigger>
              <TabsTrigger value="settings" className="text-xs md:text-sm">Settings</TabsTrigger>
            </TabsList>

            <MoviesTab onUploadMovie={() => setShowUploadModal(true)} />
            <FeaturedMoviesTab />
            <CategoryManagementTab />
            <UsersTab />
            <AnalyticsTab />
            <SettingsTab />
          </Tabs>
        </div>
      </section>

      <MovieUploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </div>
  );
};

export default AdminPanel;
