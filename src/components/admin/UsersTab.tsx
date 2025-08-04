
import { Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

interface User {
  id: number;
  name: string;
  email: string;
  plan: string;
  joined: string;
}

const UsersTab = () => {
  const recentUsers: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com", plan: "Premium", joined: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", plan: "Free", joined: "2024-01-14" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", plan: "Premium", joined: "2024-01-13" }
  ];

  return (
    <TabsContent value="users" className="space-y-6">
      <Card className="border-luxury-border">
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage registered users and their subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-luxury-border rounded-lg gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-muted rounded-full flex-shrink-0"></div>
                  <div>
                    <h3 className="font-semibold text-foreground">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <Badge 
                    variant={user.plan === "Premium" ? "default" : "secondary"}
                    className={user.plan === "Premium" ? "bg-accent text-accent-foreground" : ""}
                  >
                    {user.plan}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{user.joined}</span>
                  <Button variant="ghost" size="sm">
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default UsersTab;
