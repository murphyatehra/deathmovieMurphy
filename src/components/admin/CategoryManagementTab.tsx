
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import { Film, Search, Filter, Plus, Edit, Trash2 } from "lucide-react";
import { useMovies } from "@/hooks/useMovies";
import MovieCard from "@/components/MovieCard";

const categories = [
  { value: "hollywood", label: "Hollywood", color: "bg-blue-500" },
  { value: "bollywood", label: "Bollywood", color: "bg-orange-500" },
  { value: "south_movies", label: "South Movies", color: "bg-green-500" },
  { value: "dual_audio", label: "Dual Audio", color: "bg-purple-500" },
  { value: "kdrama", label: "K-Drama", color: "bg-pink-500" },
  { value: "horror", label: "Horror", color: "bg-red-500" },
  { value: "4k", label: "4K Movies", color: "bg-yellow-500" },
  { value: "web_series", label: "Web Series", color: "bg-teal-500" },
];

const CategoryManagementTab = () => {
  const [selectedCategory, setSelectedCategory] = useState("hollywood");
  const [searchQuery, setSearchQuery] = useState("");
  const { movies, loading, error } = useMovies(selectedCategory);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryStats = (categoryValue: string) => {
    // This would normally come from an API call
    return Math.floor(Math.random() * 100) + 10; // Mock data
  };

  return (
    <TabsContent value="categories" className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Category Management</h2>
          <p className="text-muted-foreground">Manage movies across different categories</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Category
        </Button>
      </div>

      {/* Category Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category.value} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <CardTitle className="text-lg">{category.label}</CardTitle>
                </div>
                <Badge variant="secondary">
                  {getCategoryStats(category.value)} movies
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Last updated: 2 hours ago
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Content Management */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Category Content</CardTitle>
          <CardDescription>
            Select a category to view and manage its movies
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Selection and Search */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="category-select">Select Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${category.color}`} />
                        {category.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="search">Search Movies</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Movies Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                {categories.find(c => c.value === selectedCategory)?.label} Movies 
                ({filteredMovies.length})
              </h3>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Movie
                </Button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading movies...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-destructive">Error loading movies: {error}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredMovies.map((movie) => (
                  <div key={movie.id} className="relative group">
                    <MovieCard movie={movie} />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1">
                        <Button size="sm" variant="secondary" className="h-6 w-6 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="destructive" className="h-6 w-6 p-0">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && filteredMovies.length === 0 && (
              <div className="text-center py-8">
                <Film className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  {searchQuery ? `No movies found for "${searchQuery}"` : "No movies in this category"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CategoryManagementTab;
