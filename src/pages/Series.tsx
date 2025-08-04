
import { useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MovieCard from "@/components/MovieCard";
import { useMovies } from "@/hooks/useMovies";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const Series = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { movies: seriesData, loading, error } = useMovies("series");
  const { isVisible } = useScrollDirection();

  const filteredSeries = seriesData.filter(series =>
    series.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    series.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Header */}
      <header className={`relative z-10 px-4 md:px-6 py-8 md:py-12 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-card/80 border border-luxury-border rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">TV Series</h1>
                <p className="text-muted-foreground">Binge-watch the best TV series and shows</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 md:w-5 md:h-5 z-10" />
                <Input
                  type="text"
                  placeholder="Search TV series..."
                  className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 bg-input border-luxury-border text-foreground placeholder-muted-foreground rounded-xl backdrop-blur-sm focus:border-primary transition-all text-sm md:text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-2 md:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base">
                Search
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Series Grid */}
      <section className="relative z-10 px-4 md:px-6 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="backdrop-blur-xl bg-card/60 border border-luxury-border rounded-2xl p-4 md:p-8 shadow-2xl">
            {loading ? (
              <div className="text-center py-8 md:py-12">
                <p className="text-muted-foreground text-base md:text-lg">Loading series...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 md:py-12">
                <p className="text-muted-foreground text-base md:text-lg">Error loading series: {error}</p>
                <p className="text-muted-foreground/60 mt-2 text-sm md:text-base">Please try again later</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-6">
                {filteredSeries.map((series) => (
                  <MovieCard key={series.id} movie={series} />
                ))}
              </div>
            )}
            
            {!loading && !error && filteredSeries.length === 0 && searchQuery && (
              <div className="text-center py-8 md:py-12">
                <p className="text-muted-foreground text-base md:text-lg">No series found for "{searchQuery}"</p>
                <p className="text-muted-foreground/60 mt-2 text-sm md:text-base">Try searching for something else</p>
              </div>
            )}
            
            {!loading && !error && seriesData.length === 0 && !searchQuery && (
              <div className="text-center py-8 md:py-12">
                <p className="text-muted-foreground text-base md:text-lg">No series available</p>
                <p className="text-muted-foreground/60 mt-2 text-sm md:text-base">Please check back later</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Series;
