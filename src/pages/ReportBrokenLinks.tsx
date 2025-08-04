
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ReportBrokenLinks = () => {
  const [formData, setFormData] = useState({
    movieTitle: "",
    brokenLink: "",
    description: "",
    email: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Report submitted:", formData);
  };

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
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Report Broken Links</h1>
                <p className="text-muted-foreground">Help us maintain quality by reporting broken or dead download links</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Report Form */}
              <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                <div className="flex items-center gap-2 mb-6">
                  <AlertCircle className="w-5 h-5 text-accent" />
                  <h2 className="text-xl font-semibold text-foreground">Report an Issue</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Movie Title *
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter the movie title"
                      value={formData.movieTitle}
                      onChange={(e) => setFormData({...formData, movieTitle: e.target.value})}
                      className="bg-input border-luxury-border"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Broken Link URL
                    </label>
                    <Input
                      type="url"
                      placeholder="Paste the broken download link"
                      value={formData.brokenLink}
                      onChange={(e) => setFormData({...formData, brokenLink: e.target.value})}
                      className="bg-input border-luxury-border"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Issue Description *
                    </label>
                    <Textarea
                      placeholder="Describe the issue (e.g., link not working, wrong file, etc.)"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="bg-input border-luxury-border min-h-[100px]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Your Email (Optional)
                    </label>
                    <Input
                      type="email"
                      placeholder="Your email for updates"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-input border-luxury-border"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                    Submit Report
                  </Button>
                </form>
              </div>

              {/* Information */}
              <div className="space-y-6">
                <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Why Report?</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Help maintain quality downloads</li>
                    <li>• Improve user experience</li>
                    <li>• Keep our database updated</li>
                    <li>• Faster resolution of issues</li>
                  </ul>
                </div>

                <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Common Issues</h3>
                  <ul className="text-muted-foreground space-y-2">
                    <li>• Download link not working</li>
                    <li>• Slow download speeds</li>
                    <li>• Wrong movie/quality</li>
                    <li>• Corrupted files</li>
                    <li>• Missing subtitles</li>
                  </ul>
                </div>

                <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Response Time</h3>
                  <p className="text-muted-foreground">
                    We typically respond to reports within 24-48 hours. 
                    For urgent issues, please join our{" "}
                    <Link to="/join-group" className="text-accent hover:text-accent/80 underline">
                      Telegram group
                    </Link>{" "}
                    for faster support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportBrokenLinks;
