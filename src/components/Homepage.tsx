
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '@/hooks/useMovies';
import { useFeaturedMovies } from '@/hooks/useFeaturedMovies';
import { ThemeToggle } from '@/components/ThemeToggle';

const Homepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: '', genre: '', duration: '', rating: '' });
  const { movies, loading } = useMovies();
  const { featuredMovies } = useFeaturedMovies('popular', 8);

  const heroMovies = [
    {
      title: "Now Streaming: Avengers: Endgame",
      description: "The epic conclusion to the Infinity Saga with Earth's mightiest heroes.",
      bg: "https://image.tmdb.org/t/p/original/or06FN3Dka5tukK1e9sl16pB3iy.jpg"
    },
    {
      title: "Now Streaming: Interstellar", 
      description: "A journey beyond the stars in search of a new home for humanity.",
      bg: "https://image.tmdb.org/t/p/original/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"
    },
    {
      title: "Now Streaming: Demon Slayer: Mugen Train",
      description: "Tanjiro faces the demon on a train filled with death and darkness.", 
      bg: "https://image.tmdb.org/t/p/original/h8Rb9gBr48ODIwYUttZNYeMWeUU.jpg"
    }
  ];

  // Auto-scroll hero section
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroMovies.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroMovies.length]);

  // GSAP animations
  useEffect(() => {
    // Check if GSAP is available
    if (typeof window !== 'undefined' && (window as any).gsap) {
      const gsap = (window as any).gsap;
      
      // Animate sections on load
      gsap.from('section', {
        opacity: 0, 
        y: 50, 
        duration: 1, 
        stagger: 0.2
      });

      // Movie slider animation
      const wrapper = document.getElementById('sliderWrapper');
      const slides = document.querySelectorAll('.movie-slide');
      
      if (wrapper && slides.length > 0) {
        const totalWidth = Array.from(slides).reduce((sum, slide) => sum + (slide as HTMLElement).offsetWidth + 16, 0);
        gsap.set(wrapper, { x: 0 });
        
        const scrollAnim = gsap.to(wrapper, {
          x: `-=${totalWidth}`,
          duration: 40,
          ease: "linear",
          repeat: -1,
          modifiers: {
            x: gsap.utils.unitize((x: string) => parseFloat(x) % totalWidth)
          }
        });

        wrapper.addEventListener("mouseenter", () => scrollAnim.pause());
        wrapper.addEventListener("mouseleave", () => scrollAnim.play());

        slides.forEach(slide => {
          slide.addEventListener("mouseenter", () => {
            gsap.to(slide, { scale: 1.1, duration: 0.3, ease: "power2.out" });
          });
          slide.addEventListener("mouseleave", () => {
            gsap.to(slide, { scale: 1, duration: 0.3, ease: "power2.inOut" });
          });
        });
      }
    }
  }, [featuredMovies]);

  const showDetails = (title: string, genre: string, duration: string, rating: string) => {
    setModalData({ title, genre, duration, rating });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('no-scroll', !isMenuOpen);
    
    if (typeof window !== 'undefined' && (window as any).gsap) {
      const gsap = (window as any).gsap;
      if (!isMenuOpen) {
        gsap.fromTo("#mobileMenu nav a", 
          { opacity: 0, y: 30 }, 
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }
        );
      }
    }
  };

  const closeMenu = () => {
    if (typeof window !== 'undefined' && (window as any).gsap) {
      const gsap = (window as any).gsap;
      gsap.to("#mobileMenu nav a", {
        opacity: 0, y: -20, duration: 0.3, stagger: 0.05, ease: "power2.in", 
        onComplete: () => {
          setIsMenuOpen(false);
          document.body.classList.remove('no-scroll');
        }
      });
    } else {
      setIsMenuOpen(false);
      document.body.classList.remove('no-scroll');
    }
  };

  return (
    <div className="bg-black text-white dark:bg-white dark:text-black min-h-screen">
      {/* GSAP Script */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
      
      {/* Header */}
      <header className="w-full bg-black dark:bg-white border-b border-gray-700 dark:border-gray-300 p-4 relative z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div 
              onClick={toggleMenu}
              className="flex flex-col justify-center items-start space-y-1 cursor-pointer md:hidden focus:outline-none focus:ring-0"
            >
              <div className="w-5 h-0.5 bg-white dark:bg-black"></div>
              <div className="w-5 h-0.5 bg-white dark:bg-black"></div>
              <div className="w-5 h-0.5 bg-white dark:bg-black"></div>
            </div>
            
            <Link to="/">
              <img 
                src="/lovable-uploads/9f0d1872-a63d-4adb-826d-8bd223f61f7a.png" 
                alt="Death Movie Logo" 
                className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain" 
              />
            </Link>
            
            <nav className="hidden md:flex gap-6 text-white dark:text-black text-sm font-semibold ml-6">
              <Link to="/hollywood" className="hover:text-red-500 transition">Hollywood</Link>
              <Link to="/bollywood" className="hover:text-red-500 transition">Bollywood</Link>
              <Link to="/web-series" className="hover:text-red-500 transition">Web Series</Link>
              <Link to="/dual-audio" className="hover:text-red-500 transition">Dual Audio</Link>
              <Link to="/kdrama-series" className="hover:text-red-500 transition">K-Drama</Link>
              <Link to="/horror" className="hover:text-red-500 transition">Horror</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href="https://t.me/deathchatting_world" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-telegram text-xl"></i>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div id="mobileMenu" className="fixed top-0 left-0 w-full h-full bg-black dark:bg-white flex flex-col items-start justify-start z-40 px-6 pt-24">
          <div 
            className="absolute top-6 left-6 text-white dark:text-black text-3xl cursor-pointer" 
            onClick={closeMenu}
          >
            &times;
          </div>

          <nav className="flex flex-col space-y-6 text-2xl font-extrabold text-white dark:text-black text-left pl-4">
            <Link to="/" className="hover:text-red-500 transition" onClick={closeMenu}>Home</Link>
            <Link to="/hollywood" className="hover:text-red-500 transition" onClick={closeMenu}>Hollywood</Link>
            <Link to="/bollywood" className="hover:text-red-500 transition" onClick={closeMenu}>Bollywood</Link>
            <Link to="/web-series" className="hover:text-red-500 transition" onClick={closeMenu}>Web Series</Link>
            <Link to="/dual-audio" className="hover:text-red-500 transition" onClick={closeMenu}>Dual Audio</Link>
            <Link to="/kdrama-series" className="hover:text-red-500 transition" onClick={closeMenu}>K-Drama</Link>
            <Link to="/horror" className="hover:text-red-500 transition" onClick={closeMenu}>Horror</Link>
          </nav>
        </div>
      )}

      {/* Search Section */}
      <section id="premiumTagline" className="w-full bg-dark dark:bg-white flex flex-col items-center justify-center py-10 px-4 space-y-6 transition duration-300">
        <div className="relative w-full max-w-xl mx-auto shadow-lg">
          <svg 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            placeholder="Search high-quality movies..."
            className="w-full pl-12 pr-4 py-3 rounded-full 
                     bg-white text-black 
                     dark:bg-zinc-800 dark:text-white 
                     placeholder-gray-500 dark:placeholder-gray-400 
                     border border-gray-300 dark:border-zinc-700 
                     focus:outline-none focus:ring-2 focus:ring-red-600 
                     transition duration-300"
          />
        </div>
        <p className="text-red-500 text-sm sm:text-base md:text-lg font-semibold tracking-wide text-center whitespace-nowrap">
          Your premium destination for high quality Movies
        </p>
      </section>

      {/* Movie Slider */}
      <section id="movieSlider" className="w-full overflow-hidden py-10">
        <h2 className="text-xl md:text-2xl font-bold text-left mb-6 px-6">Movies</h2>
        <div id="sliderWrapper" className="flex gap-4 px-6 w-max">
          {featuredMovies.map((movie, index) => (
            <img 
              key={movie.id}
              src={movie.movies.poster_path ? `https://image.tmdb.org/t/p/w300${movie.movies.poster_path}` : 'https://images.unsplash.com/photo-1489599134017-7aa99e9a3b8c?w=300&h=450&fit=crop'}
              alt={movie.movies.title}
              className="movie-slide h-40 rounded-lg shadow-lg transition-transform hover:scale-105 cursor-pointer"
              onClick={() => showDetails(movie.movies.title, 'Action', '2h', '8.5')}
            />
          ))}
        </div>
      </section>

      {/* Telegram Join */}
      <div className="flex justify-center px-4 pb-6">
        <a 
          href="https://t.me/deathkingworld" 
          target="_blank" 
          rel="noopener noreferrer"
          className="whitespace-nowrap inline-flex items-center px-4 py-2 md:px-6 md:py-3 rounded-full text-white bg-gradient-to-r from-purple-600 to-pink-500 shadow-md hover:opacity-90 transition text-sm md:text-base"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4 8-9 8-1.5 0-2.9-.3-4.1-.9L3 21l1.4-3.9C3.5 15.8 3 13.9 3 12c0-4.418 4-8 9-8s9 3.6 9 8z" />
          </svg>
          <span className="font-medium">Domains & updates: Telegram channel's</span>
        </a>
      </div>

      {/* Latest Releases */}
      <section className="px-4 py-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">Latest Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {movies.slice(0, 8).map((movie) => (
            <div 
              key={movie.id}
              className="cursor-pointer group relative movie-poster" 
              onClick={() => showDetails(movie.title, movie.genre.join(', '), movie.duration, movie.rating.toString())}
            >
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="rounded-lg w-full h-auto transition-transform hover:scale-105"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 rounded text-sm">
                {movie.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Movie Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-black text-black dark:text-white p-6 rounded-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-2">{modalData.title}</h3>
            <p><strong>Genre:</strong> {modalData.genre}</p>
            <p><strong>Duration:</strong> {modalData.duration}</p>
            <p><strong>IMDb:</strong> {modalData.rating}</p>
            <button 
              onClick={closeModal} 
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black dark:bg-white text-white dark:text-black mt-10 border-t border-gray-700 dark:border-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-10 text-center space-y-3 text-sm font-medium">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/how-to-download" className="hover:text-red-500 transition">How to Download</Link>
            <Link to="/report-broken-links" className="hover:text-red-500 transition">Report Broken Links</Link>
            <Link to="/about-us" className="hover:text-red-500 transition">About Us</Link>
            <Link to="/contact" className="hover:text-red-500 transition">Contact</Link>
            <Link to="/request-movie" className="hover:text-red-500 transition">Request Movie</Link>
            <Link to="/privacy-policy" className="hover:text-red-500 transition">Privacy Policy</Link>
            <Link to="/dmca" className="hover:text-red-500 transition">DMCA</Link>
          </div>
          <div className="text-gray-400 text-xs mt-4">
            © 2025 Death Movies. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
