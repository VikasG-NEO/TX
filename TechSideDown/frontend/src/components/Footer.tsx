import { motion } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Youtube, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-20 px-4 border-t border-primary/20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[100px] rounded-full" />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-3xl font-stranger tracking-wider text-primary neon-text-subtle mb-4">
              TECHXPRESSION
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Enter the portal to the ultimate tech experience.
              Where innovation meets the upside down.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Youtube].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <Icon className="w-5 h-5 text-muted-foreground hover:text-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About', 'Events', 'Schedule', 'Gallery', 'Sponsors', 'Register'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Mail className="w-4 h-4 text-primary" />
                bkbirlatechxpression@gmail.com
              </li>
              <li className="flex items-center gap-2 text-muted-foreground text-sm">
                <Phone className="w-4 h-4 text-primary" />
                +91 9029384041
              </li>
              <li className="flex items-start gap-2 text-muted-foreground text-sm">
                <MapPin className="w-4 h-4 text-primary mt-0.5" />
                <span>Bk Birla College Kalyan<br />Kalyan(w)-421304,maharashtra</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 TechXpression. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground font-stranger tracking-wider">
            The <span className="upside-down text-primary">portal</span> is open
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;