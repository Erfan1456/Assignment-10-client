import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-8">
      <div className="max-w-7xl mx-auto px-4 py-10 md:flex md:justify-between md:items-start space-y-6 md:space-y-0">
        {/* Logo & Description */}
        <div className="md:w-1/3">
          <div className="flex items-center gap-2 mb-3">
            <img
              src="/assets/logo.webp"
              alt="logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold text-primary">GrowTogether</h1>
          </div>
          <p className="text-base-content/70">
            A community for gardening enthusiasts to share tips, find local
            gardeners, and grow together. 🌱
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3 flex flex-col md:flex-row md:justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="font-semibold text-primary mb-2">Links</h2>
            <ul className="space-y-1">
              <li>
                <a className="hover:text-secondary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a className="hover:text-secondary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="hover:text-secondary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-primary mb-2">Follow Us</h2>
            <div className="flex space-x-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-secondary transition-colors"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-base-300 mt-6 py-4 text-center text-base-content/70 text-sm">
        © {new Date().getFullYear()} GrowTogether. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
