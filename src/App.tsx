
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import MoviePreview from "./pages/MoviePreview";
import AdminPanel from "./pages/AdminPanel";
import DMCA from "./pages/DMCA";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import RequestMovie from "./pages/RequestMovie";
import Hollywood from "./pages/Hollywood";
import Bollywood from "./pages/Bollywood";
import SouthMovies from "./pages/SouthMovies";
import Series from "./pages/Series";
import WebSeries from "./pages/WebSeries";
import Contact from "./pages/Contact";
import JoinGroup from "./pages/JoinGroup";
import HowToDownload from "./pages/HowToDownload";
import ReportBrokenLinks from "./pages/ReportBrokenLinks";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import DualAudio from "./pages/DualAudio";
import KDrama from "./pages/KDrama";
import FourKMovies from "./pages/FourKMovies";
import Horror from "./pages/Horror";

const queryClient = new QueryClient();

console.log('App component loaded');

const App = () => {
  console.log('App component rendering');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/movie/:id" element={<MoviePreview />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requireAdmin={true}>
                      <AdminPanel />
                    </ProtectedRoute>
                  } 
                />
                <Route path="/hollywood" element={<Hollywood />} />
                <Route path="/bollywood" element={<Bollywood />} />
                <Route path="/south-movies" element={<SouthMovies />} />
                <Route path="/series" element={<Series />} />
                <Route path="/web-series" element={<WebSeries />} />
                <Route path="/dual-audio" element={<DualAudio />} />
                <Route path="/kdrama-series" element={<KDrama />} />
                <Route path="/horror" element={<Horror />} />
                <Route path="/4k-movies" element={<FourKMovies />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/join-group" element={<JoinGroup />} />
                <Route path="/how-to-download" element={<HowToDownload />} />
                <Route path="/report-broken-links" element={<ReportBrokenLinks />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/dmca" element={<DMCA />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/request-movie" element={<RequestMovie />} />
                <Route path="/murphy" element={<AdminPanel />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
