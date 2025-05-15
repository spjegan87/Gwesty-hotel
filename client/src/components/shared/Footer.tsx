import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-primary font-bold text-2xl">G</span>
              <span className="text-white font-bold text-2xl">westy</span>
            </Link>
            <p className="text-gray-400 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a nisl vel nunc posuere rhoncus. Suspendisse facilisis turpis lacus, eget dictum neque molestie iaculis.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-neutral-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition duration-200"
                aria-label="Download on App Store"
              >
                <i className="fab fa-apple"></i>
              </a>
              <a
                href="#"
                className="bg-neutral-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary transition duration-200"
                aria-label="Download on Google Play"
              >
                <i className="fab fa-android"></i>
              </a>
            </div>
            <p className="text-gray-400 mt-4">Download Our APP</p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">USEFUL LINKS</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />Home
                </Link>
              </li>
              <li>
                <Link href="/hotels" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />Hotels
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />Pages
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />Extra
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/my-bookings" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />My Accounts
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />Wishlist
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />Review
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition duration-200 flex items-center">
                  <ChevronRight className="h-3 w-3 mr-2" />Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">SOCIAL LINKS</h4>
            <div className="flex space-x-3 mb-4">
              <a
                href="#"
                className="bg-neutral-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-600 transition duration-200"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                className="bg-neutral-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-400 transition duration-200"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className="bg-neutral-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-pink-600 transition duration-200"
                aria-label="Pinterest"
              >
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a
                href="#"
                className="bg-neutral-700 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gradient-to-r from-purple-500 to-pink-500 transition duration-200"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>Copyright © 2024 Gwesty, All Right Reserved</p>
        </div>
      </div>
      
      {/* Chat Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button className="w-14 h-14 rounded-full" aria-label="Chat Support">
          <i className="fas fa-comments text-xl"></i>
        </Button>
      </div>
    </footer>
  );
}
