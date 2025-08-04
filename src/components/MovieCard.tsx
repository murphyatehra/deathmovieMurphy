
import { Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface Movie {
  id: string | number;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  duration: string;
  poster: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group cursor-pointer">
      <div className="relative overflow-hidden rounded-xl bg-card border border-luxury-border hover:border-luxury-border/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 h-full flex flex-col">
        <div className="aspect-[2/3] relative overflow-hidden flex-shrink-0">
          <img 
            src={movie.poster} 
            alt={movie.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating Badge */}
          <div className="absolute top-2 right-2">
            <Badge className="bg-background/80 backdrop-blur-sm text-foreground border-luxury-border text-xs">
              <Star className="w-3 h-3 fill-accent text-accent mr-1" />
              {movie.rating}
            </Badge>
          </div>
          
          {/* Genre Badges */}
          <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[calc(100%-3rem)]">
            {movie.genre.slice(0, 2).map((g) => (
              <Badge key={g} variant="secondary" className="bg-card/80 backdrop-blur-sm border-luxury-border text-xs">
                {g}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="p-3 md:p-4 flex-grow flex flex-col justify-between">
          <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground mt-auto">
            <span>{movie.year}</span>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{movie.duration}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
