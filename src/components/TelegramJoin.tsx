
import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TelegramJoinProps {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
}

const TelegramJoin = ({ variant = "default", size = "default", className = "" }: TelegramJoinProps) => {
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinTelegram = () => {
    setIsJoining(true);
    setTimeout(() => {
      window.open("https://t.me/+Sycy-qm2bjAwZDBl", "_blank");
      setIsJoining(false);
    }, 1000);
  };

  return (
    <Button
      onClick={handleJoinTelegram}
      disabled={isJoining}
      variant={variant}
      size={size}
      className={`${className} transition-all duration-300 hover:scale-105 text-sm md:text-base px-4 py-2 h-auto min-h-[2.5rem] whitespace-normal text-center leading-tight max-w-full overflow-hidden`}
    >
      <MessageSquare className="w-4 h-4 mr-2 flex-shrink-0 min-w-[1rem]" />
      <span className="break-words text-left flex-1">
        {isJoining ? "Joining..." : "For domains and update join our telegram"}
      </span>
    </Button>
  );
};

export default TelegramJoin;
