
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Film, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { saveMovieRequest } from "@/services/databaseService";

const RequestMovie = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    requesterName: "",
    email: "",
    movieTitle: "",
    releaseYear: "",
    genre: "",
    language: "",
    quality: "",
    additionalInfo: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await saveMovieRequest({
        requester_name: formData.requesterName,
        email: formData.email,
        movie_title: formData.movieTitle,
        release_year: formData.releaseYear,
        genre: formData.genre,
        language: formData.language,
        quality: formData.quality,
        additional_info: formData.additionalInfo
      });

      toast({
        title: "Request Submitted!",
        description: "Your movie request has been submitted successfully. We'll review it and get back to you soon.",
      });

      // Reset form
      setFormData({
        requesterName: "",
        email: "",
        movieTitle: "",
        releaseYear: "",
        genre: "",
        language: "",
        quality: "",
        additionalInfo: ""
      });
    } catch (error) {
      console.error("Error submitting movie request:", error);
      toast({
        title: "Error",
        description: "Failed to submit your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Header */}
      <header className="relative z-10 px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-card/80 border border-luxury-border rounded-2xl p-6 md:p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Request a Movie</h1>
                <p className="text-muted-foreground">Can't find what you're looking for? Let us know!</p>
              </div>
            </div>

            {/* Telegram Join Button */}
            <div className="mb-6">
              <Button 
                onClick={handleTelegramJoin}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <MessageSquare className="w-5 h-5" />
                Join Our Telegram Community
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Request Form */}
      <section className="relative z-10 px-4 md:px-6 pb-12 md:pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-luxury-border backdrop-blur-xl bg-card/60 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="w-5 h-5" />
                Movie Request Form
              </CardTitle>
              <CardDescription>
                Fill out the form below and we'll do our best to add your requested movie to our collection.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="requesterName" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      id="requesterName"
                      name="requesterName"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.requesterName}
                      onChange={handleInputChange}
                      className="bg-input border-luxury-border"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-input border-luxury-border"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="movieTitle" className="block text-sm font-medium text-foreground mb-2">
                      Movie Title *
                    </label>
                    <Input
                      id="movieTitle"
                      name="movieTitle"
                      type="text"
                      placeholder="Enter movie title"
                      value={formData.movieTitle}
                      onChange={handleInputChange}
                      className="bg-input border-luxury-border"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="releaseYear" className="block text-sm font-medium text-foreground mb-2">
                      Release Year
                    </label>
                    <Input
                      id="releaseYear"
                      name="releaseYear"
                      type="text"
                      placeholder="e.g., 2023"
                      value={formData.releaseYear}
                      onChange={handleInputChange}
                      className="bg-input border-luxury-border"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Genre
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("genre", value)}>
                      <SelectTrigger className="bg-input border-luxury-border">
                        <SelectValue placeholder="Select genre" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="action">Action</SelectItem>
                        <SelectItem value="comedy">Comedy</SelectItem>
                        <SelectItem value="drama">Drama</SelectItem>
                        <SelectItem value="horror">Horror</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                        <SelectItem value="thriller">Thriller</SelectItem>
                        <SelectItem value="sci-fi">Sci-Fi</SelectItem>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="documentary">Documentary</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Language
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("language", value)}>
                      <SelectTrigger className="bg-input border-luxury-border">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="tamil">Tamil</SelectItem>
                        <SelectItem value="telugu">Telugu</SelectItem>
                        <SelectItem value="malayalam">Malayalam</SelectItem>
                        <SelectItem value="kannada">Kannada</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Preferred Quality
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("quality", value)}>
                      <SelectTrigger className="bg-input border-luxury-border">
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4k">4K UHD</SelectItem>
                        <SelectItem value="1080p">1080p HD</SelectItem>
                        <SelectItem value="720p">720p HD</SelectItem>
                        <SelectItem value="480p">480p</SelectItem>
                        <SelectItem value="any">Any Quality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <label htmlFor="additionalInfo" className="block text-sm font-medium text-foreground mb-2">
                    Additional Information
                  </label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    placeholder="Any additional details about the movie request..."
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="bg-input border-luxury-border min-h-[100px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 gap-2"
                  disabled={isSubmitting}
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default RequestMovie;
