
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const handleJoinTelegram = () => {
    window.open("https://t.me/+Sycy-qm2bjAwZDBl", "_blank");
  };

  return (
    <section className="relative min-h-[80vh] bg-black flex items-center justify-center overflow-hidden">
      {/* Background pattern/texture */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto w-full">
        {/* Death Logo */}
        <div className="mb-6 md:mb-8">
          <img 
            src="/lovable-uploads/9f0d1872-a63d-4adb-826d-8bd223f61f7a.png" 
            alt="Death Logo" 
            className="w-60 sm:w-72 md:w-80 h-auto mx-auto object-contain mb-4 md:mb-6"
          />
        </div>
        
        {/* Tagline */}
        <p className="text-gray-300 text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed px-2">
          Your premium destination for high-quality movie downloads
        </p>
        
        {/* Join Telegram Button */}
        <div className="px-2">
          <Button 
            onClick={handleJoinTelegram}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 w-full sm:w-auto overflow-hidden"
          >
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 md:mr-3 flex-shrink-0 min-w-[1rem]" />
            <span className="text-center leading-tight break-words">
              Domains & updates: Telegram channel's
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
