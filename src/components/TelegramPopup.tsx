
import { useState, useEffect } from "react";
import { MessageSquare, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const TelegramPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup today
    const lastShown = localStorage.getItem("telegram-popup-shown");
    const today = new Date().toDateString();
    
    if (lastShown !== today) {
      // Show popup after 30 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleJoinTelegram = () => {
    setIsJoining(true);
    setTimeout(() => {
      window.open("https://t.me/+Sycy-qm2bjAwZDBl", "_blank");
      handleClose();
    }, 1000);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Mark as shown for today
    localStorage.setItem("telegram-popup-shown", new Date().toDateString());
  };

  const handleLater = () => {
    setIsVisible(false);
    // Show again after 1 hour
    const oneHourFromNow = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    localStorage.setItem("telegram-popup-next", oneHourFromNow);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-luxury-border shadow-2xl animate-scale-in">
        <CardHeader className="relative text-center pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute top-2 right-2 w-8 h-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
          
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          
          <h3 className="text-xl font-bold">Join Our Telegram Group!</h3>
          <p className="text-muted-foreground text-sm">
            Get instant notifications for new movie releases and exclusive content
          </p>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-center gap-2 mb-6 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>50,000+ members already joined</span>
          </div>
          
          <div className="space-y-3">
            <Button
              onClick={handleJoinTelegram}
              disabled={isJoining}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {isJoining ? "Joining..." : "Join Telegram Group"}
            </Button>
            
            <Button
              onClick={handleLater}
              variant="outline"
              className="w-full"
            >
              Maybe Later
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center mt-4">
            We respect your privacy. You can leave anytime.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TelegramPopup;
