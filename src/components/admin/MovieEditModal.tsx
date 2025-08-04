
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Movie {
  id: string;
  title: string;
  status: string;
  rating: number;
  overview?: string;
  release_date?: string;
  category?: string;
}

interface MovieEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | null;
  onMovieUpdated: () => void;
}

const MovieEditModal = ({ isOpen, onClose, movie, onMovieUpdated }: MovieEditModalProps) => {
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    rating: 0,
    status: "draft",
    category: "hollywood",
    release_date: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title || "",
        overview: movie.overview || "",
        rating: movie.rating || 0,
        status: movie.status || "draft",
        category: movie.category || "hollywood",
        release_date: movie.release_date || ""
      });
    }
  }, [movie]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!movie) return;

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('movies')
        .update({
          title: formData.title,
          overview: formData.overview,
          rating: formData.rating,
          status: formData.status,
          category: formData.category,
          release_date: formData.release_date || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', movie.id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Movie updated successfully.",
      });

      onMovieUpdated();
      onClose();
    } catch (error) {
      console.error('Error updating movie:', error);
      toast({
        title: "Error",
        description: "Failed to update movie.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Movie</DialogTitle>
          <DialogDescription>
            Update movie information and settings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={formData.rating}
                onChange={(e) => handleInputChange('rating', parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="overview">Overview</Label>
            <Textarea
              id="overview"
              value={formData.overview}
              onChange={(e) => handleInputChange('overview', e.target.value)}
              placeholder="Movie description..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hollywood">Hollywood</SelectItem>
                  <SelectItem value="bollywood">Bollywood</SelectItem>
                  <SelectItem value="web-series">Web Series</SelectItem>
                  <SelectItem value="dual-audio">Dual Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="release_date">Release Date</Label>
              <Input
                id="release_date"
                type="date"
                value={formData.release_date}
                onChange={(e) => handleInputChange('release_date', e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Movie"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MovieEditModal;
