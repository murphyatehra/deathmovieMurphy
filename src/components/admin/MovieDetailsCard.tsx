
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TMDBMovie } from "@/services/tmdbService";

interface MovieDetailsCardProps {
  movie: TMDBMovie;
}

const MovieDetailsCard = ({ movie }: MovieDetailsCardProps) => {
  return (
    <Card className="border-luxury-border">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="w-24 h-36 bg-muted rounded-lg flex-shrink-0 overflow-hidden">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">{movie.title}</h4>
            <p className="text-sm text-muted-foreground">
              {new Date(movie.release_date).getFullYear()} • {movie.runtime ? `${movie.runtime} min` : 'Runtime N/A'}
            </p>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {movie.genres?.map((genre) => (
                <Badge key={genre.id} variant="outline" className="text-xs">
                  {genre.name}
                </Badge>
              )) || <span className="text-xs text-muted-foreground">No genres available</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MovieDetailsCard;
