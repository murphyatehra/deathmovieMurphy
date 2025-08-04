
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const HowToDownload = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      <div className="relative z-10 px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-card/80 border border-luxury-border rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">How to Download</h1>
                <p className="text-muted-foreground">Step-by-step guide to download movies from Death Movie</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Step 1: Find Your Movie</h2>
                <p className="text-muted-foreground">
                  Browse through our collection or use the search feature to find the movie you want to download. 
                  We have categories for Hollywood, Bollywood, Web Series, and more.
                </p>
              </div>

              <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Step 2: Select Quality</h2>
                <p className="text-muted-foreground">
                  Click on the movie to view details. Choose from available quality options like 480p, 720p, 1080p, or 4K 
                  based on your preference and internet speed.
                </p>
              </div>

              <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Step 3: Click Download Link</h2>
                <p className="text-muted-foreground">
                  Click on the download button for your preferred quality. You'll be redirected to the download page 
                  where the file will start downloading automatically.
                </p>
              </div>

              <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Tips for Better Downloads</h2>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Use a stable internet connection for uninterrupted downloads</li>
                  <li>• Consider using a download manager for large files</li>
                  <li>• Check file size before downloading to ensure you have enough storage</li>
                  <li>• Join our Telegram group for instant notifications about new releases</li>
                </ul>
              </div>

              <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Need Help?</h2>
                <p className="text-muted-foreground">
                  If you encounter any issues while downloading, please{" "}
                  <Link to="/report-broken-links" className="text-accent hover:text-accent/80 underline">
                    report broken links
                  </Link>{" "}
                  or{" "}
                  <Link to="/contact" className="text-accent hover:text-accent/80 underline">
                    contact us
                  </Link>{" "}
                  for assistance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToDownload;
