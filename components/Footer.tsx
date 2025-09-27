import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Zap, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="relative mt-12 md:mt-20 border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-sm opacity-75"></div>
                <div className="relative bg-gray-900 p-1.5 md:p-2 rounded-full border border-cyan-500/50">
                  <Zap className="w-5 md:w-6 h-5 md:h-6 text-cyan-400" />
                </div>
              </div>
              <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                QuizLab
              </span>
            </div>
            <p className="text-gray-400 mb-4 md:mb-6 max-w-md text-sm md:text-base mx-auto md:mx-0">
              Create epic head-to-head tournaments with images and videos.
              Experience the future of competitive entertainment.
            </p>

            {/* Social Links */}
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                <Github className="w-4 md:w-5 h-4 md:h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                <Twitter className="w-4 md:w-5 h-4 md:h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group">
                {/* <Discord className="w-4 md:w-5 h-4 md:h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" /> */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Platform</h3>
            <ul className="space-y-1 md:space-y-2">
              <li><Link href="/create" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm md:text-base">Create Tournament</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm md:text-base">Browse Tournaments</Link></li>
              <li><span className="text-gray-600 text-sm md:text-base">Trivia (Coming Soon)</span></li>
              <li><span className="text-gray-600 text-sm md:text-base">Tier Lists (Coming Soon)</span></li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-semibold mb-3 md:mb-4 text-sm md:text-base">Support</h3>
            <ul className="space-y-1 md:space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm md:text-base">Help Center</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm md:text-base">Community</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm md:text-base">Privacy Policy</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm md:text-base">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-xs md:text-sm">
            © 2024 QuizLab. All rights reserved.
          </p>
          <div className="flex items-center justify-center space-x-1 text-gray-400 text-xs md:text-sm mt-3 md:mt-0">
            <span>Made with</span>
            <Heart className="w-3 md:w-4 h-3 md:h-4 text-red-400" fill="currentColor" />
            <span>for tournament enthusiasts</span>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl"></div>
    </footer>
  )
}

export default Footer