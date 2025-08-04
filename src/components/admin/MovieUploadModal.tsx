
import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import TMDBSearch from "@/components/TMDBSearch";
import CastDisplay from "@/components/CastDisplay";
import SEOPreview from "@/components/SEOPreview";
import MovieDetailsCard from "./MovieDetailsCard";
import QualityUploadSection from "./QualityUploadSection";
import { TMDBMovie, TMDBCastMember } from "@/services/tmdbService";
import { saveMovieToDatabase } from "@/services/databaseService";
import { supabase } from "@/integrations/supabase/client";

interface MovieUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryOptions = [
  { value: "hollywood", label: "Hollywood" },
  { value: "bollywood", label: "Bollywood" },
  { value: "south-movies", label: "South Movies" },
  { value: "series", label: "TV Series" }
];

const MovieUploadModal = ({ isOpen, onClose }: MovieUploadModalProps) => {
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);
  const [selectedCast, setSelectedCast] = useState<TMDBCastMember[]>([]);
  const [seoData, setSeoData] = useState<any>(null);
  const [useManualEntry, setUseManualEntry] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    year: '',
    duration: '',
    director: '',
    rating: '',
    description: '',
    genre: '',
    cast: '',
    trailer: '',
    size: ''
  });
  const [qualityData, setQualityData] = useState<{ 
    downloadLinks: Record<string, any[]>, 
    uploadedImages: any[] 
  }>({ downloadLinks: {}, uploadedImages: [] });
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleTMDBMovieSelect = (movie: TMDBMovie, cast: TMDBCastMember[], seo: any) => {
    setSelectedMovie(movie);
    setSelectedCast(cast);
    setSeoData(seo);
    console.log('Selected movie:', movie);
    console.log('Cast:', cast);
    console.log('SEO data:', seo);
  };

  const clearTMDBData = () => {
    setSelectedMovie(null);
    setSelectedCast([]);
    setSeoData(null);
    setUseManualEntry(true);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleQualityDataChange = (data: { downloadLinks: Record<string, any[]>, uploadedImages: any[] }) => {
    setQualityData(data);
  };

  const handleUpload = async () => {
    // Validate minimum required data
    const movieTitle = formData.title || selectedMovie?.title;
    if (!movieTitle || !formData.category) {
      toast({
        title: "Missing Required Data",
        description: "Please provide at least a movie title and category.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      // Prepare movie data with TMDB fallbacks
      const movieData = {
        title: movieTitle,
        overview: formData.description || selectedMovie?.overview || '',
        release_date: formData.year ? `${formData.year}-01-01` : selectedMovie?.release_date || new Date().toISOString().split('T')[0],
        rating: formData.rating ? parseFloat(formData.rating) : selectedMovie?.vote_average || 0,
        category: formData.category || 'hollywood',
        tmdb_id: selectedMovie?.id,
        status: 'published',
        language: 'en',
        // Use TMDB images as fallbacks for missing poster/backdrop
        poster_path: selectedMovie?.poster_path || null,
        backdrop_path: selectedMovie?.backdrop_path || null,
        genre_ids: selectedMovie?.genre_ids || []
      };

      console.log('Uploading movie with data:', movieData);

      // Save movie to database
      const savedMovie = await saveMovieToDatabase(movieData);
      console.log('Movie saved successfully:', savedMovie);
      
      // Save quality data and images
      let qualitiesSaved = 0;
      
      // Save each quality that has download links
      for (const [quality, links] of Object.entries(qualityData.downloadLinks)) {
        if (links && links.length > 0) {
          try {
            // Create the movie_quality record
            const { data: qualityRecord, error: qualityError } = await supabase
              .from('movie_qualities')
              .insert({
                movie_id: savedMovie.id,
                quality: quality,
                download_link: links[0]?.url || '',
                file_size: formData.size || 'Unknown'
              })
              .select()
              .single();

            if (qualityError) throw qualityError;

            // Save download links
            const downloadLinkInserts = links
              .filter(link => link.url && link.url.trim() && !link.url.includes('.jpg') && !link.url.includes('.png') && !link.url.includes('.jpeg') && !link.url.includes('.webp'))
              .map(link => ({
                movie_quality_id: qualityRecord.id,
                title: link.title || 'Download',
                url: link.url,
                language: link.language || 'en'
              }));

            if (downloadLinkInserts.length > 0) {
              const { error: linksError } = await supabase
                .from('movie_quality_links')
                .insert(downloadLinkInserts);

              if (linksError) throw linksError;
            }

            qualitiesSaved++;
          } catch (error) {
            console.error(`Error saving quality ${quality}:`, error);
          }
        }
      }

      // Save image URLs as quality links (for display in gallery)
      if (qualityData.uploadedImages && qualityData.uploadedImages.length > 0) {
        try {
          // Create a special quality record for images
          const { data: imageQualityRecord, error: imageQualityError } = await supabase
            .from('movie_qualities')
            .insert({
              movie_id: savedMovie.id,
              quality: 'images',
              download_link: 'gallery',
              file_size: 'N/A'
            })
            .select()
            .single();

          if (imageQualityError) throw imageQualityError;

          // Save image URLs as quality links
          const imageInserts = qualityData.uploadedImages.map(image => ({
            movie_quality_id: imageQualityRecord.id,
            title: image.title || 'Movie Image',
            url: image.url,
            language: 'en'
          }));

          const { error: imageLinksError } = await supabase
            .from('movie_quality_links')
            .insert(imageInserts);

          if (imageLinksError) throw imageLinksError;
        } catch (error) {
          console.error('Error saving images:', error);
        }
      }

      toast({
        title: "Upload Successful!",
        description: `Movie "${movieTitle}" uploaded successfully with ${qualitiesSaved} download quality options and ${qualityData.uploadedImages?.length || 0} images.`,
      });

      // Reset form and close modal
      setFormData({
        title: '', category: '', year: '', duration: '', director: '',
        rating: '', description: '', genre: '', cast: '', trailer: '', size: ''
      });
      setQualityData({ downloadLinks: {}, uploadedImages: [] });
      setSelectedMovie(null);
      setSelectedCast([]);
      setSeoData(null);
      setUseManualEntry(false);
      onClose();

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload Failed",
        description: error instanceof Error ? error.message : "There was an error uploading the movie. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-luxury-border rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Upload New Movie</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        
        <div className="space-y-6">
          {!selectedMovie && !useManualEntry && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Search TMDb Database</h3>
                <Button variant="outline" size="sm" onClick={() => setUseManualEntry(true)}>
                  Manual Entry
                </Button>
              </div>
              <TMDBSearch onMovieSelect={handleTMDBMovieSelect} />
            </div>
          )}

          {selectedMovie && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">Movie Details from TMDb</h3>
                <Button variant="outline" size="sm" onClick={clearTMDBData}>
                  Clear & Manual Entry
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MovieDetailsCard movie={selectedMovie} />
                {seoData && <SEOPreview seoData={seoData} />}
              </div>

              {selectedCast.length > 0 && <CastDisplay cast={selectedCast} />}
            </div>
          )}

          {(useManualEntry || selectedMovie) && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Movie Title *</Label>
                  <Input 
                    id="title" 
                    placeholder="Enter movie title" 
                    className="bg-input border-luxury-border"
                    value={formData.title || selectedMovie?.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                    <SelectTrigger className="bg-input border-luxury-border">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="year">Release Year</Label>
                  <Input 
                    id="year" 
                    type="number" 
                    placeholder="2024" 
                    className="bg-input border-luxury-border"
                    value={formData.year || (selectedMovie ? new Date(selectedMovie.release_date).getFullYear().toString() : '')}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    placeholder="120" 
                    className="bg-input border-luxury-border"
                    value={formData.duration || selectedMovie?.runtime?.toString() || ''}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="size">Movie Size</Label>
                  <Input 
                    id="size" 
                    placeholder="2.5 GB" 
                    className="bg-input border-luxury-border"
                    value={formData.size}
                    onChange={(e) => handleInputChange('size', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="director">Director</Label>
                  <Input 
                    id="director" 
                    placeholder="Director name" 
                    className="bg-input border-luxury-border"
                    value={formData.director}
                    onChange={(e) => handleInputChange('director', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="rating">IMDB Rating</Label>
                  <Input 
                    id="rating" 
                    type="number" 
                    step="0.1" 
                    max="10" 
                    placeholder="8.5" 
                    className="bg-input border-luxury-border"
                    value={formData.rating || selectedMovie?.vote_average?.toString() || ''}
                    onChange={(e) => handleInputChange('rating', e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Movie description..." 
                  className="bg-input border-luxury-border min-h-[100px]"
                  value={formData.description || selectedMovie?.overview || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="genre">Genre</Label>
                  <Input 
                    id="genre" 
                    placeholder="Action, Sci-Fi, Drama" 
                    className="bg-input border-luxury-border"
                    value={formData.genre || selectedMovie?.genres?.map(g => g.name).join(', ') || ''}
                    onChange={(e) => handleInputChange('genre', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cast">Cast</Label>
                  <Input 
                    id="cast" 
                    placeholder="Actor 1, Actor 2, Actor 3" 
                    className="bg-input border-luxury-border"
                    value={formData.cast || selectedCast.map(c => c.name).join(', ') || ''}
                    onChange={(e) => handleInputChange('cast', e.target.value)}
                  />
                </div>
              </div>
              
              <QualityUploadSection onDataChange={handleQualityDataChange} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="poster">Poster Image</Label>
                  <Input id="poster" type="file" accept="image/*" className="bg-input border-luxury-border" />
                </div>
                <div>
                  <Label htmlFor="backdrop">Backdrop Image</Label>
                  <Input id="backdrop" type="file" accept="image/*" className="bg-input border-luxury-border" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="trailer">Trailer URL</Label>
                <Input 
                  id="trailer" 
                  placeholder="YouTube or direct video URL" 
                  className="bg-input border-luxury-border"
                  value={formData.trailer}
                  onChange={(e) => handleInputChange('trailer', e.target.value)}
                />
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90" 
                  onClick={handleUpload}
                  disabled={isUploading || (!formData.title && !selectedMovie?.title) || !formData.category}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Movie'}
                </Button>
                <Button variant="outline" className="flex-1" onClick={onClose} disabled={isUploading}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieUploadModal;
