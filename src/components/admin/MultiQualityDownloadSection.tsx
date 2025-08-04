
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Download, ChevronDown, ExternalLink } from "lucide-react";

interface DownloadLink {
  id: string;
  title: string;
  url: string;
  language?: string;
}

interface QualityOption {
  quality: string;
  size: string;
  price: string;
  downloadLinks: DownloadLink[];
}

interface MultiQualityDownloadSectionProps {
  availableQualities: QualityOption[];
  selectedQuality: string;
  onQualitySelect: (quality: string) => void;
}

const MultiQualityDownloadSection = ({ 
  availableQualities, 
  selectedQuality, 
  onQualitySelect 
}: MultiQualityDownloadSectionProps) => {
  const selectedQualityData = availableQualities.find(q => q.quality === selectedQuality) || availableQualities[0];

  if (!availableQualities.length) {
    return (
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Download Options</h2>
        <div className="bg-card border border-luxury-border rounded-xl p-4 md:p-6 text-center">
          <p className="text-muted-foreground">
            Download links are not available for this movie yet. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Download Options</h2>
      <div className="bg-card border border-luxury-border rounded-xl p-4 md:p-6">
        <div className="space-y-4">
          {availableQualities.map((option) => (
            <div 
              key={option.quality}
              className={`p-3 md:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedQuality === option.quality 
                  ? 'border-primary bg-primary/10' 
                  : 'border-luxury-border hover:border-luxury-border/60'
              }`}
              onClick={() => onQualitySelect(option.quality)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{option.quality}</h3>
                  <p className="text-xs md:text-sm text-muted-foreground">{option.size}</p>
                  {option.downloadLinks.length > 0 && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {option.downloadLinks.length} download option{option.downloadLinks.length > 1 ? 's' : ''} available
                    </p>
                  )}
                </div>
                <Badge variant="secondary">
                  {option.price}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {selectedQualityData && selectedQualityData.downloadLinks.length > 0 && (
          <div className="mt-6 space-y-3">
            {selectedQualityData.downloadLinks.length === 1 ? (
              // Single download link - show as regular button
              <Button 
                className="w-full bg-primary hover:bg-primary/90 gap-2" 
                size="lg"
                asChild
              >
                <a href={selectedQualityData.downloadLinks[0].url} target="_blank" rel="noopener noreferrer">
                  <Download className="w-4 h-4 md:w-5 md:h-5" />
                  {selectedQualityData.downloadLinks[0].title || `Download ${selectedQuality}`}
                  {selectedQualityData.downloadLinks[0].language && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedQualityData.downloadLinks[0].language}
                    </Badge>
                  )}
                </a>
              </Button>
            ) : (
              // Multiple download links - show as dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 gap-2" 
                    size="lg"
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                    Download {selectedQuality}
                    <ChevronDown className="w-4 h-4 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full min-w-[300px] bg-popover border border-luxury-border">
                  {selectedQualityData.downloadLinks.map((link, index) => (
                    <div key={link.id}>
                      <DropdownMenuItem asChild>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between w-full p-3 hover:bg-accent cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            <span className="font-medium">
                              {link.title || `Download Option ${index + 1}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            {link.language && (
                              <Badge variant="secondary" className="text-xs">
                                {link.language}
                              </Badge>
                            )}
                            <ExternalLink className="w-3 h-3" />
                          </div>
                        </a>
                      </DropdownMenuItem>
                      {index < selectedQualityData.downloadLinks.length - 1 && (
                        <DropdownMenuSeparator />
                      )}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            <p className="text-xs text-muted-foreground text-center mt-4">
              By downloading, you agree to our Terms of Service
            </p>
          </div>
        )}
        
        {selectedQualityData && selectedQualityData.downloadLinks.length === 0 && (
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              No download links available for {selectedQuality} quality yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiQualityDownloadSection;
