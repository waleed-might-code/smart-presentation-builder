
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ComingSoonDialog from "@/components/ComingSoonDialog";

const Footer = () => {
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState("Coming Soon");

  const handleComingSoon = (title: string, e: React.MouseEvent) => {
    e.preventDefault();
    setComingSoonTitle(title);
    setComingSoonOpen(true);
  };

  return (
    <footer className="bg-white border-t border-border py-12 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Slide<span className="text-primary font-light">AI</span>
            </h3>
            <p className="text-muted-foreground text-sm">
              Create stunning presentations with the power of AI. Turn your ideas into professional decks in seconds.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoon("Features Coming Soon", e)}
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoon("Templates Coming Soon", e)}
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  Templates
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoon("Pricing Coming Soon", e)}
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoon("About Coming Soon", e)}
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoon("Blog Coming Soon", e)}
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoon("Contact Coming Soon", e)}
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoon("Privacy Policy Coming Soon", e)}
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  onClick={(e) => handleComingSoon("Terms of Service Coming Soon", e)}
                  className="text-muted-foreground text-sm hover:text-foreground transition-colors"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} SlideAI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="#" 
              onClick={(e) => handleComingSoon("Social Media Coming Soon", e)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a 
              href="#" 
              onClick={(e) => handleComingSoon("Social Media Coming Soon", e)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a 
              href="#" 
              onClick={(e) => handleComingSoon("Social Media Coming Soon", e)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
      
      <ComingSoonDialog 
        open={comingSoonOpen} 
        setOpen={setComingSoonOpen}
        title={comingSoonTitle}
      />
    </footer>
  );
};

export default Footer;
