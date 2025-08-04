import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Copy } from "lucide-react";
import ImageUploadSection from "./ImageUploadSection";

const qualityOptions = [
  { value: "4k", label: "4K Ultra HD", size: "12-15 GB" },
  { value: "1080p", label: "1080p Full HD", size: "4-6 GB" },
  { value: "720p", label: "720p HD", size: "2-3 GB" },
  { value: "480p", label: "480p SD", size: "800MB-1GB" },
  { value: "360p", label: "360p Mobile", size: "300-500MB" }
];

const languageOptions = [
  "English", "Hindi", "Tamil", "Telugu", "Malayalam", 
  "Kannada", "Bengali", "Gujarati", "Punjabi", "Marathi",
  "Spanish", "French", "German", "Italian", "Japanese",
  "Korean", "Chinese", "Arabic", "Russian", "Portuguese"
];

const buttonTitleSuggestions = [
  "Download Now", "Free Download", "HD Download", "Fast Download",
  "डाउनलोड करें", "Download Karo", "मुफ्त डाउनलोड", "تحميل مجاني",
  "Descargar Gratis", "Télécharger", "Baixar Grátis", "ダウンロード",
  "다운로드", "下载", "Скачать", "Scarica", "Direct Link", "Mirror Link"
];

interface DownloadLink {
  id: string;
  title: string;
  url: string;
  language?: string;
}

interface QualityUploadSectionProps {
  onDataChange?: (data: { 
    downloadLinks: Record<string, DownloadLink[]>, 
    uploadedImages: any[] 
  }) => void;
}

const QualityUploadSection = ({ onDataChange }: QualityUploadSectionProps = {}) => {
  const [downloadLinks, setDownloadLinks] = useState<Record<string, DownloadLink[]>>({});
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);

  const addDownloadLink = (quality: string) => {
    const newLink: DownloadLink = {
      id: Math.random().toString(36).substr(2, 9),
      title: "",
      url: "",
      language: ""
    };
    
    const newDownloadLinks = {
      ...downloadLinks,
      [quality]: [...(downloadLinks[quality] || []), newLink]
    };
    
    setDownloadLinks(newDownloadLinks);
    onDataChange?.({ downloadLinks: newDownloadLinks, uploadedImages });
  };

  const removeDownloadLink = (quality: string, linkId: string) => {
    const newDownloadLinks = {
      ...downloadLinks,
      [quality]: downloadLinks[quality]?.filter(link => link.id !== linkId) || []
    };
    
    setDownloadLinks(newDownloadLinks);
    onDataChange?.({ downloadLinks: newDownloadLinks, uploadedImages });
  };

  const updateDownloadLink = (quality: string, linkId: string, field: keyof DownloadLink, value: string) => {
    const newDownloadLinks = {
      ...downloadLinks,
      [quality]: downloadLinks[quality]?.map(link => 
        link.id === linkId ? { ...link, [field]: value } : link
      ) || []
    };
    
    setDownloadLinks(newDownloadLinks);
    onDataChange?.({ downloadLinks: newDownloadLinks, uploadedImages });
  };

  const handleImageDataChange = (images: any[]) => {
    setUploadedImages(images);
    onDataChange?.({ downloadLinks, uploadedImages: images });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Movie Files by Quality</Label>
        {qualityOptions.map((quality) => (
          <div key={quality.value} className="p-4 border border-luxury-border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">{quality.label}</h4>
              <span className="text-sm text-muted-foreground">~{quality.size}</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <Label htmlFor={`file-${quality.value}`}>Movie File</Label>
                <Input id={`file-${quality.value}`} type="file" accept="video/*" className="bg-input border-luxury-border" />
              </div>
              <div>
                <Label htmlFor={`size-${quality.value}`}>File Size</Label>
                <Input id={`size-${quality.value}`} placeholder={quality.size} className="bg-input border-luxury-border" />
              </div>
              <div className="flex items-end">
                <Button 
                  type="button"
                  variant="outline" 
                  size="sm"
                  onClick={() => addDownloadLink(quality.value)}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Download Link
                </Button>
              </div>
            </div>

            {/* Download Links for this quality */}
            {downloadLinks[quality.value]?.map((link, index) => (
              <div key={link.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-muted/30 rounded-lg">
                <div>
                  <Label htmlFor={`title-${quality.value}-${link.id}`}>Button Title</Label>
                  <Input 
                    id={`title-${quality.value}-${link.id}`}
                    placeholder="Download Now, डाउनलोड करें, etc."
                    value={link.title}
                    onChange={(e) => updateDownloadLink(quality.value, link.id, 'title', e.target.value)}
                    className="bg-input border-luxury-border" 
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {buttonTitleSuggestions.slice(0, 4).map((suggestion) => (
                      <Badge 
                        key={suggestion}
                        variant="outline" 
                        className="text-xs cursor-pointer hover:bg-accent"
                        onClick={() => updateDownloadLink(quality.value, link.id, 'title', suggestion)}
                      >
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor={`language-${quality.value}-${link.id}`}>Language/Type</Label>
                  <Select 
                    value={link.language} 
                    onValueChange={(value) => updateDownloadLink(quality.value, link.id, 'language', value)}
                  >
                    <SelectTrigger className="bg-input border-luxury-border">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`url-${quality.value}-${link.id}`}>Download URL</Label>
                  <div className="flex gap-1">
                    <Input 
                      id={`url-${quality.value}-${link.id}`}
                      placeholder="https://..."
                      value={link.url}
                      onChange={(e) => updateDownloadLink(quality.value, link.id, 'url', e.target.value)}
                      className="bg-input border-luxury-border flex-1" 
                    />
                    {link.url && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(link.url)}
                        className="px-2"
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
                <div className="flex items-end">
                  <Button 
                    type="button"
                    variant="outline" 
                    size="sm"
                    onClick={() => removeDownloadLink(quality.value, link.id)}
                    className="w-full text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {/* Summary for this quality */}
            {downloadLinks[quality.value]?.length > 0 && (
              <div className="p-2 bg-accent/20 rounded text-sm text-muted-foreground">
                <strong>{downloadLinks[quality.value].length}</strong> download link{downloadLinks[quality.value].length > 1 ? 's' : ''} added for {quality.label}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Image Upload Section */}
      <ImageUploadSection onDataChange={handleImageDataChange} />
    </div>
  );
};

export default QualityUploadSection;
