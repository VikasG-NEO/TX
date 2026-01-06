import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Sponsors', href: '#sponsors' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname !== '/') {
      // If we are not on the home page, redirect to home with the hash
      navigate('/');
      // Add a small timeout to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = href;
        }
      }, 100);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-primary/20'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between relative">
          {/* Logo - Left */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }} className="flex items-center gap-2">
            <span className="text-2xl font-stranger tracking-wider text-primary neon-text-subtle">
              TX
            </span>
            <span className="hidden sm:block text-sm font-stranger tracking-[0.2em] text-foreground/70">
              TECHXPRESSION
            </span>
          </a>

          {/* Desktop Navigation - Absolute Centered */}
          <div className="hidden md:flex items-center gap-12 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-base font-stranger tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full" />
              </button>
            ))}
            {!localStorage.getItem('token') ? (
              <a href="/login" className="text-base font-stranger tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors">
                Login
              </a>
            ) : (
              <a href="/dashboard" className="text-base font-stranger tracking-[0.15em] text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </a>
            )}
          </div>

          {/* Mobile Menu Button - Right */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-16 z-30 bg-background/95 backdrop-blur-lg border-b border-primary/20 md:hidden"
          >
            <div className="p-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="text-lg font-stranger tracking-wider text-foreground hover:text-primary transition-colors text-left py-2"
                >
                  {item.label}
                </button>
              ))}
              {!localStorage.getItem('token') ? (
                <a href="/login" className="text-lg font-stranger tracking-wider text-foreground hover:text-primary transition-colors text-left py-2">
                  Login
                </a>
              ) : (
                <a href="/dashboard" className="text-lg font-stranger tracking-wider text-foreground hover:text-primary transition-colors text-left py-2">
                  Dashboard
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
