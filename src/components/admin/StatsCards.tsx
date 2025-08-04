
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCard {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

interface StatsCardsProps {
  stats: StatCard[];
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-luxury-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-3 w-3 md:h-4 md:w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-lg md:text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-accent font-medium">
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCards;
