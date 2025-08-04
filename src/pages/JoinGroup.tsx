import { useState } from "react";
import { MessageSquare, Users, Download, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const JoinGroup = () => {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinTelegram = () => {
    setIsJoining(true);
    setTimeout(() => {
      window.open("https://t.me/your_telegram_channel", "_blank");
      setIsJoining(false);
    }, 1000);
  };

  const benefits = [
    {
      icon: Download,
      title: "Latest Movie Updates",
      description: "Get notified instantly when new movies are uploaded"
    },
    {
      icon: Star,
      title: "Exclusive Content",
      description: "Access to premium quality movies and early releases"
    },
    {
      icon: Users,
      title: "Active Community",
      description: "Join thousands of movie enthusiasts and discuss latest films"
    },
    {
      icon: MessageSquare,
      title: "Direct Support",
      description: "Get help and request movies directly from our team"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-[95vw]">
        <div className="backdrop-blur-xl bg-card/20 border border-luxury-border/30 rounded-full px-6 py-3 shadow-2xl">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/c14b1b4e-2086-40af-a760-16e0addd675a.png" 
                alt="Death Logo" 
                className="w-8 h-8 object-contain"
              />
            </Link>
            <div className="flex items-center space-x-1">
              <Link to="/hollywood" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-card/30 rounded-full transition-all">
                Hollywood
              </Link>
              <Link to="/bollywood" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-card/30 rounded-full transition-all">
                Bollywood
              </Link>
              <Link to="/series" className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-card/30 rounded-full transition-all">
                Series
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-8">
            <MessageSquare className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
            Join Our Community
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with thousands of movie lovers, get instant updates on new releases, 
            and never miss your favorite films again.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <Badge variant="secondary" className="px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              50k+ Members
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Download className="w-4 h-4 mr-2" />
              1000+ Movies
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              HD Quality
            </Badge>
          </div>

          <Button 
            onClick={handleJoinTelegram}
            disabled={isJoining}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-12 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            {isJoining ? (
              "Redirecting..."
            ) : (
              <>
                <MessageSquare className="w-6 h-6 mr-2" />
                Join Telegram Group
                <ArrowRight className="w-6 h-6 ml-2" />
              </>
            )}
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Our Community?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-card/60 border-luxury-border backdrop-blur-sm hover:bg-card/80 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg mb-4 mx-auto">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border-blue-500/20">
            <CardContent className="p-12 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-muted-foreground mb-8">
                Join our Telegram group now and become part of the ultimate movie community.
              </p>
              <Button 
                onClick={handleJoinTelegram}
                disabled={isJoining}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl"
              >
                {isJoining ? "Redirecting..." : "Join Now"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default JoinGroup;