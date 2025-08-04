
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

interface SEOPreviewProps {
  seoData: SEOData;
}

const SEOPreview = ({ seoData }: SEOPreviewProps) => {
  return (
    <Card className="border-luxury-border">
      <CardHeader>
        <CardTitle className="text-sm">SEO Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Search Result Preview</h4>
          <div className="p-3 bg-muted rounded-lg">
            <h3 className="text-blue-600 text-sm font-medium hover:underline cursor-pointer">
              {seoData.title}
            </h3>
            <p className="text-xs text-green-700 mt-1">example.com/movies/...</p>
            <p className="text-xs text-muted-foreground mt-1">{seoData.description}</p>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Social Media Preview</h4>
          <div className="border border-luxury-border rounded-lg overflow-hidden">
            {seoData.ogImage && (
              <div className="h-32 bg-muted">
                <img 
                  src={seoData.ogImage} 
                  alt="OG Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-3">
              <h3 className="font-medium text-sm text-foreground">{seoData.ogTitle}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {seoData.ogDescription}
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Keywords</h4>
          <div className="flex flex-wrap gap-1">
            {seoData.keywords.split(', ').slice(0, 8).map((keyword, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SEOPreview;
