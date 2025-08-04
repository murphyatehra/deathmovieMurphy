
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, MessageSquare, Eye, Database, Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrivacyPolicy = () => {
  const handleTelegramJoin = () => {
    window.open("https://t.me/deathmovie", "_blank");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="relative z-10 px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="backdrop-blur-xl bg-card/80 border border-luxury-border rounded-2xl p-6 md:p-8 shadow-2xl mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Privacy Policy</h1>
                <p className="text-muted-foreground">How we protect and handle your data</p>
              </div>
            </div>

            {/* Telegram Join Button */}
            <div className="mt-6">
              <Button 
                onClick={handleTelegramJoin}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Join Our Telegram Community
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="backdrop-blur-xl bg-card/60 border border-luxury-border rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="prose prose-invert max-w-none">
              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                    <Eye className="w-6 h-6 text-primary" />
                    Information We Collect
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We collect information you provide directly to us, such as when you create an account, 
                    request movies, or contact us for support.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>Account information (email, username)</li>
                    <li>Movie requests and preferences</li>
                    <li>Support communications</li>
                    <li>Usage analytics and website interactions</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                    <Database className="w-6 h-6 text-primary" />
                    How We Use Your Information
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We use the information we collect to provide, maintain, and improve our services:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>To provide and deliver the services you request</li>
                    <li>To process movie requests and recommendations</li>
                    <li>To send you technical notices and support messages</li>
                    <li>To improve our website and user experience</li>
                    <li>To comply with legal obligations</li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
                    <Cookie className="w-6 h-6 text-primary" />
                    Cookies and Tracking
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    We use cookies and similar tracking technologies to track activity on our service and store certain information.
                  </p>
                  <div className="bg-card/40 border border-luxury-border rounded-xl p-6">
                    <h4 className="font-semibold text-foreground mb-3">Types of Cookies We Use:</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                      <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                      <li><strong>Analytics Cookies:</strong> Help us understand how you use our website</li>
                      <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Data Security</h3>
                  <p className="text-muted-foreground mb-4">
                    We implement appropriate security measures to protect your personal information against unauthorized access, 
                    alteration, disclosure, or destruction.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Third-Party Services</h3>
                  <p className="text-muted-foreground mb-4">
                    Our service may contain links to third-party websites or services. We are not responsible for 
                    the privacy practices of these third parties.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Your Rights</h3>
                  <p className="text-muted-foreground mb-4">
                    You have the right to access, update, or delete your personal information. 
                    Contact us at privacy@deathmovie.fun for any privacy-related requests.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Contact Us</h3>
                  <p className="text-muted-foreground">
                    If you have any questions about this Privacy Policy, please contact us at privacy@deathmovie.fun
                  </p>
                </section>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-8">
                  <p className="text-sm text-muted-foreground">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This Privacy Policy is effective immediately and applies to all users of Death Movie.
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

export default PrivacyPolicy;
