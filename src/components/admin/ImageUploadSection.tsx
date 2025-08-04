
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload, Link2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ImageItem {
  id: string;
  title: string;
  url: string;
  type: 'url' | 'file';
  file?: File;
  preview?: string;
}

interface ImageUploadSectionProps {
  onDataChange?: (images: ImageItem[]) => void;
}

const ImageUploadSection = ({ onDataChange }: ImageUploadSectionProps = {}) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [bulkUrls, setBulkUrls] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const addImageFromUrl = () => {
    if (imageUrl.trim() && imageTitle.trim()) {
      const newImage: ImageItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: imageTitle.trim(),
        url: imageUrl.trim(),
        type: 'url'
      };
      
      const newImages = [...images, newImage];
      setImages(newImages);
      setImageTitle("");
      setImageUrl("");
      onDataChange?.(newImages);
    }
  };

  const addBulkUrls = () => {
    if (bulkUrls.trim()) {
      const urls = bulkUrls.split('\n').filter(url => url.trim());
      const newImages = urls.map((url, index) => ({
        id: Math.random().toString(36).substr(2, 9),
        title: `Screenshot ${images.length + index + 1}`,
        url: url.trim(),
        type: 'url' as const
      }));
      
      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      setBulkUrls("");
      onDataChange?.(updatedImages);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && imageTitle.trim()) {
      const newImage: ImageItem = {
        id: Math.random().toString(36).substr(2, 9),
        title: imageTitle.trim(),
        url: URL.createObjectURL(file),
        type: 'file',
        file,
        preview: URL.createObjectURL(file)
      };
      
      const newImages = [...images, newImage];
      setImages(newImages);
      setImageTitle("");
      event.target.value = "";
      onDataChange?.(newImages);
    }
  };

  const removeImage = (imageId: string) => {
    const imageToRemove = images.find(img => img.id === imageId);
    if (imageToRemove && imageToRemove.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }
    const newImages = images.filter(img => img.id !== imageId);
    setImages(newImages);
    onDataChange?.(newImages);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label className="text-lg font-semibold">Movie Images & Screenshots</Label>
        
        {/* Single Image Upload */}
        <div className="p-4 border border-luxury-border rounded-lg space-y-4">
          <h4 className="font-medium">Add Single Image</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="image-title">Image Title</Label>
              <Input 
                id="image-title"
                placeholder="Screenshot 1, Poster, etc."
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="bg-input border-luxury-border" 
              />
            </div>
            <div>
              <Label htmlFor="image-url">Image URL</Label>
              <Input 
                id="image-url"
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-input border-luxury-border" 
              />
            </div>
            <div className="flex items-end gap-2">
              <Button 
                type="button"
                variant="outline" 
                onClick={addImageFromUrl}
                disabled={!imageTitle.trim() || !imageUrl.trim()}
                className="flex-1"
              >
                <Link2 className="w-4 h-4 mr-2" />
                Add URL
              </Button>
              <Button 
                type="button"
                variant="outline"
                onClick={() => document.getElementById('file-upload')?.click()}
                disabled={!imageTitle.trim()}
              >
                <Upload className="w-4 h-4" />
              </Button>
              <input 
                id="file-upload"
                type="file" 
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        {/* Bulk URL Upload */}
        <div className="p-4 border border-luxury-border rounded-lg space-y-4">
          <h4 className="font-medium">Add Multiple Images (Bulk URLs)</h4>
          <div className="space-y-4">
            <div>
              <Label htmlFor="bulk-urls">Image URLs (one per line)</Label>
              <Textarea 
                id="bulk-urls"
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg&#10;https://example.com/image3.jpg"
                value={bulkUrls}
                onChange={(e) => setBulkUrls(e.target.value)}
                className="bg-input border-luxury-border min-h-[100px]"
              />
            </div>
            <Button 
              type="button"
              variant="outline" 
              onClick={addBulkUrls}
              disabled={!bulkUrls.trim()}
              className="w-full"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add All URLs
            </Button>
          </div>
        </div>
      </div>

      {/* Display Added Images */}
      {images.length > 0 && (
        <div className="space-y-4">
          <Label className="text-base font-medium">Added Images ({images.length})</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="p-4 border border-luxury-border rounded-lg space-y-3">
                <div className="aspect-video relative overflow-hidden rounded-lg bg-muted">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1489599134017-7aa99e9a3b8c?w=400&h=300&fit=crop';
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground truncate flex-1" title={image.title}>
                      {image.title}
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {image.type === 'url' ? 'URL' : 'File'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground truncate" title={image.url}>
                    {image.url}
                  </p>
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => removeImage(image.id)}
                    className="w-full text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadSection;
