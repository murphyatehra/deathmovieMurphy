
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieImage {
  id: string;
  title: string;
  url: string;
  type: 'poster' | 'backdrop' | 'uploaded';
}

interface MovieImageGalleryProps {
  images: MovieImage[];
  title: string;
}

const MovieImageGallery = ({ images, title }: MovieImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const visibleImages = images.slice(currentIndex, currentIndex + 6);
  if (visibleImages.length < 6 && images.length > 6) {
    visibleImages.push(...images.slice(0, 6 - visibleImages.length));
  }

  return (
    <div className="space-y-6 bg-background">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-foreground">{title} Gallery</h3>
        {images.length > 6 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={prevImage}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextImage}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {visibleImages.map((image, index) => (
          <div key={`${image.id}-${index}`} className="group cursor-pointer">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted/20">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1489599134017-7aa99e9a3b8c?w=400&h=300&fit=crop';
                }}
              />
            </div>
            <div className="mt-3 text-center space-y-1">
              <h4 className="text-sm font-medium text-foreground truncate" title={image.title}>
                {image.title}
              </h4>
              <p className="text-xs text-muted-foreground capitalize">
                {image.type === 'uploaded' ? 'Screenshot' : image.type}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {images.length > 6 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Showing {Math.min(6, images.length)} of {images.length} images
          </p>
        </div>
      )}
    </div>
  );
};

export default MovieImageGallery;
