
import { useState, useEffect } from "react";
import { Search, Plus, Star, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useFeaturedMovies } from "@/hooks/useFeaturedMovies";
import { useMovies } from "@/hooks/useMovies";
import { addMovieToFeatured, removeMovieFromFeatured } from "@/services/databaseService";

const FeaturedMoviesTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSection, setSelectedSection] = useState("popular");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const { featuredMovies, loading: featuredLoading, error: featuredError, refetch } = useFeaturedMovies(selectedSection);
  const { movies: allMovies, loading: moviesLoading } = useMovies();

  const handleAddToFeatured = async (movieId: string) => {
    try {
      await addMovieToFeatured(movieId, selectedSection, featuredMovies.length);
      toast({
        title: "Success",
        description: `Movie added to ${selectedSection} section successfully`,
      });
      refetch();
      setIsAddDialogOpen(false);
      setSearchQuery(""); // Clear search after adding
    } catch (error) {
      console.error('Error adding movie to featured:', error);
      toast({
        title: "Error",
        description: `Failed to add movie to ${selectedSection} section`,
        variant: "destructive",
      });
    }
  };

  const handleRemoveFromFeatured = async (featuredMovieId: string) => {
    try {
      await removeMovieFromFeatured(featuredMovieId);
      toast({
        title: "Success",
        description: `Movie removed from ${selectedSection} section successfully`,
      });
      refetch();
    } catch (error) {
      console.error('Error removing movie from featured:', error);
      toast({
        title: "Error",
        description: `Failed to remove movie from ${selectedSection} section`,
        variant: "destructive",
      });
    }
  };

  // Filter movies that are not already featured in the current section and match search query
  const availableMovies = allMovies.filter(movie => 
    !featuredMovies.some(fm => fm.movies.id === movie.id) &&
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
    movie.status === 'published' // Only show published movies
  );

  return (
    <TabsContent value="featured" className="space-y-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-foreground">Featured Movies Management</h2>
          <p className="text-sm text-muted-foreground">Manage movies displayed in the popular section</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
          <Select value={selectedSection} onValueChange={setSelectedSection}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
              <SelectItem value="new">New Releases</SelectItem>
            </SelectContent>
          </Select>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-primary hover:bg-primary/90 justify-center">
                <Plus className="w-4 h-4" />
                Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Movie to {selectedSection} Section</DialogTitle>
                <DialogDescription>
                  Select a published movie to add to the featured section
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search published movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                  {moviesLoading ? (
                    <p className="text-muted-foreground col-span-full text-center py-8">Loading movies...</p>
                  ) : availableMovies.length === 0 ? (
                    <p className="text-muted-foreground col-span-full text-center py-8">
                      {searchQuery ? `No published movies found for "${searchQuery}"` : "No available published movies"}
                    </p>
                  ) : (
                    availableMovies.map((movie) => (
                      <div key={movie.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                        <img 
                          src={movie.poster} 
                          alt={movie.title}
                          className="w-16 h-24 object-cover rounded flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
                          <p className="text-xs text-muted-foreground">{movie.year}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-xs">{movie.rating}</span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {movie.genre.slice(0, 2).map((genre) => (
                              <Badge key={genre} variant="outline" className="text-xs">
                                {genre}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => handleAddToFeatured(movie.id)}
                          className="flex-shrink-0"
                        >
                          Add
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="border-luxury-border">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Featured Movies - {selectedSection}
            <Badge variant="secondary">{featuredMovies.length} movies</Badge>
          </CardTitle>
          <CardDescription>
            Movies currently displayed in the {selectedSection} section of the homepage
          </CardDescription>
        </CardHeader>
        <CardContent>
          {featuredLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading featured movies...</p>
            </div>
          ) : featuredError ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Error loading featured movies</p>
            </div>
          ) : featuredMovies.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No featured movies in this section</p>
              <p className="text-sm text-muted-foreground/60 mt-2">Add some movies to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {featuredMovies.map((featured, index) => (
                <div key={featured.id} className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 border border-luxury-border rounded-lg gap-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-1">
                    <div className="relative">
                      <img 
                        src={featured.movies.poster_path 
                          ? `https://image.tmdb.org/t/p/w200${featured.movies.poster_path}`
                          : 'https://images.unsplash.com/photo-1489599134017-7aa99e9a3b8c?w=200&h=300&fit=crop'
                        } 
                        alt={featured.movies.title}
                        className="w-16 h-24 object-cover rounded flex-shrink-0"
                      />
                      <Badge className="absolute -top-2 -left-2 bg-primary text-primary-foreground text-xs">
                        #{index + 1}
                      </Badge>
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="font-semibold text-foreground">{featured.movies.title}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs md:text-sm text-muted-foreground">
                          {featured.movies.release_date ? new Date(featured.movies.release_date).getFullYear() : 'N/A'}
                        </span>
                        {featured.movies.rating && (
                          <>
                            <span className="text-muted-foreground">•</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs md:text-sm text-muted-foreground">{featured.movies.rating}</span>
                            </div>
                          </>
                        )}
                      </div>
                      {featured.movies.overview && (
                        <p className="text-sm text-muted-foreground line-clamp-2 max-w-lg">
                          {featured.movies.overview}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-row lg:flex-col xl:flex-row items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemoveFromFeatured(featured.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default FeaturedMoviesTab;
