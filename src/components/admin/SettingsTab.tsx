
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";

const SettingsTab = () => {
  return (
    <TabsContent value="settings" className="space-y-6">
      <Card className="border-luxury-border">
        <CardHeader>
          <CardTitle>Platform Settings</CardTitle>
          <CardDescription>Configure your cinema platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-foreground mb-2">General Settings</h3>
              <div className="space-y-2">
                <Input placeholder="Site Name" className="bg-card border-luxury-border" />
                <Input placeholder="Site Description" className="bg-card border-luxury-border" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Upload Settings</h3>
              <div className="space-y-2">
                <Input placeholder="Max File Size (MB)" className="bg-card border-luxury-border" />
                <Input placeholder="Allowed Formats" className="bg-card border-luxury-border" />
              </div>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );  
};

export default SettingsTab;
