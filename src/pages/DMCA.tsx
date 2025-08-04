
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, FileText, Shield, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const DMCA = () => {
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
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">DMCA Policy</h1>
                <p className="text-muted-foreground">Digital Millennium Copyright Act Compliance</p>
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
                    <FileText className="w-6 h-6 text-primary" />
                    Copyright Infringement Notice
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Death Movie respects the intellectual property rights of others and expects our users to do the same. 
                    We will respond to notices of alleged copyright infringement that comply with the Digital Millennium Copyright Act ("DMCA").
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Filing a DMCA Notice</h3>
                  <p className="text-muted-foreground mb-4">
                    If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, 
                    please provide our Designated Copyright Agent with the following information:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                    <li>A physical or electronic signature of the copyright owner or authorized representative</li>
                    <li>Identification of the copyrighted work claimed to have been infringed</li>
                    <li>Identification of the material that is claimed to be infringing and information reasonably sufficient to permit us to locate the material</li>
                    <li>Your contact information, including address, telephone number, and email address</li>
                    <li>A statement that you have a good faith belief that use of the material is not authorized</li>
                    <li>A statement that the information in the notification is accurate and that you are authorized to act on behalf of the copyright owner</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Contact Information</h3>
                  <div className="bg-card/40 border border-luxury-border rounded-xl p-6">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Mail className="w-5 h-5 text-primary" />
                      Designated Copyright Agent
                    </h4>
                    <div className="text-muted-foreground space-y-2">
                      <p><strong>Email:</strong> dmca@deathmovie.fun</p>
                      <p><strong>Subject Line:</strong> DMCA Takedown Request</p>
                      <p><strong>Response Time:</strong> 24-48 hours</p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Counter-Notification</h3>
                  <p className="text-muted-foreground mb-4">
                    If you believe that material you posted was removed or disabled by mistake or misidentification, 
                    you may file a counter-notification with our Designated Copyright Agent.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold text-foreground mb-3">Repeat Infringers</h3>
                  <p className="text-muted-foreground">
                    Death Movie will terminate the accounts of users who are determined to be repeat infringers in appropriate circumstances.
                  </p>
                </section>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 mt-8">
                  <p className="text-sm text-muted-foreground">
                    <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This DMCA policy is effective immediately and applies to all users of Death Movie.
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

export default DMCA;
