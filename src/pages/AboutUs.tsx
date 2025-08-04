
import { ArrowLeft, Heart, Users, Download, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
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
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-xl bg-card/80 border border-luxury-border rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">About Death Movie</h1>
                <p className="text-muted-foreground">Your premium destination for high-quality entertainment</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Mission */}
              <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-6 h-6 text-accent" />
                  <h2 className="text-2xl font-semibold text-foreground">Our Mission</h2>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  At Death Movie, we're passionate about bringing you the latest and greatest in entertainment. 
                  Our mission is to provide easy access to high-quality movies, web series, and shows from around 
                  the world, ensuring you never miss out on the content you love.
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Download className="w-6 h-6 text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">Fast Downloads</h3>
                  </div>
                  <p className="text-muted-foreground">
                    High-speed download links with multiple quality options to suit your needs and internet speed.
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">Safe & Secure</h3>
                  </div>
                  <p className="text-muted-foreground">
                    All our links are verified and safe. We prioritize user security and provide malware-free downloads.
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Users className="w-6 h-6 text-accent" />
                    <h3 className="text-lg font-semibold text-foreground">Community Driven</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Join our active Telegram community for instant updates, requests, and support from fellow movie enthusiasts.
                  </p>
                </div>
              </div>

              {/* What We Offer */}
              <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">What We Offer</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Content Categories</h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Hollywood Movies (Latest & Classic)</li>
                      <li>• Bollywood Films</li>
                      <li>• Web Series from Netflix, Amazon Prime, etc.</li>
                      <li>• K-Drama Series</li>
                      <li>• Anime Series & Movies</li>
                      <li>• Horror Collection</li>
                      <li>• 4K Ultra HD Movies</li>
                      <li>• Dual Audio Options</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Quality Options</h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• 480p (Mobile Friendly)</li>
                      <li>• 720p HD</li>
                      <li>• 1080p Full HD</li>
                      <li>• 4K Ultra HD</li>
                      <li>• Multiple Audio Tracks</li>
                      <li>• Subtitle Support</li>
                      <li>• Various File Formats</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-6">Get in Touch</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-muted-foreground mb-4">
                      We're always here to help! Whether you have questions, suggestions, or need technical support, 
                      don't hesitate to reach out.
                    </p>
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        <Link to="/contact" className="text-accent hover:text-accent/80 underline">
                          Contact Form
                        </Link> - For general inquiries
                      </p>
                      <p className="text-muted-foreground">
                        <Link to="/request-movie" className="text-accent hover:text-accent/80 underline">
                          Movie Requests
                        </Link> - Request your favorite movies
                      </p>
                      <p className="text-muted-foreground">
                        <Link to="/join-group" className="text-accent hover:text-accent/80 underline">
                          Telegram Group
                        </Link> - Join our community
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">Why Choose Us?</h3>
                    <ul className="text-muted-foreground space-y-2">
                      <li>• Regular content updates</li>
                      <li>• Multiple download servers</li>
                      <li>• 24/7 community support</li>
                      <li>• No registration required</li>
                      <li>• Mobile-friendly interface</li>
                      <li>• Fast loading times</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="backdrop-blur-xl bg-card/40 rounded-xl p-6 text-center">
                <p className="text-muted-foreground text-sm">
                  Death Movie is committed to providing quality entertainment while respecting copyright laws. 
                  We encourage users to support official releases and creators whenever possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
