
import { TMDBCastMember, getImageUrl } from "@/services/tmdbService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CastDisplayProps {
  cast: TMDBCastMember[];
}

const CastDisplay = ({ cast }: CastDisplayProps) => {
  if (!cast || cast.length === 0) return null;

  return (
    <Card className="border-luxury-border">
      <CardHeader>
        <CardTitle className="text-sm">Cast Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cast.slice(0, 10).map((member) => (
            <div key={member.id} className="text-center space-y-2">
              <Avatar className="w-16 h-16 mx-auto">
                <AvatarImage 
                  src={getImageUrl(member.profile_path)} 
                  alt={member.name}
                />
                <AvatarFallback className="text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-xs text-foreground">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.character}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CastDisplay;
