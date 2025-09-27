'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { Zap, User, Trophy, Brain, List, FileText, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="relative py-4 md:py-6 backdrop-blur-lg border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent"></div>

        <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between relative z-10">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gray-900 p-1.5 md:p-2 rounded-full border border-cyan-500/50">
                <Zap className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
              </div>
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              QuizLab
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            <Link href="/">
              <button className="btn btn-secondary flex items-center space-x-2">
                <Trophy className="w-4 h-4" />
                <span>Browse Tournaments</span>
              </button>
            </Link>

            <Link href="/create">
              <button className="btn btn-primary flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Create Tournament</span>
              </button>
            </Link>

            {/* Coming Soon Items */}
            <div className="relative group">
              <button
                className="btn btn-secondary opacity-50 cursor-not-allowed flex items-center space-x-2"
                disabled
              >
                <Brain className="w-4 h-4" />
                <span>Trivia</span>
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Coming Soon
              </div>
            </div>

            <div className="relative group">
              <button
                className="btn btn-secondary opacity-50 cursor-not-allowed flex items-center space-x-2"
                disabled
              >
                <List className="w-4 h-4" />
                <span>Tier Lists</span>
              </button>
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Coming Soon
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden btn btn-secondary p-2"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute top-0 left-1/4 w-16 md:w-32 h-16 md:h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-0 right-1/4 w-12 md:w-24 h-12 md:h-24 bg-purple-500/10 rounded-full blur-2xl animate-float"></div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden glass-card mx-4 my-2 overflow-hidden"
          >
            <nav className="p-4 space-y-2">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full btn btn-secondary flex items-center justify-start space-x-3">
                  <Trophy className="w-4 h-4" />
                  <span>Browse Tournaments</span>
                </button>
              </Link>

              <Link href="/create" onClick={() => setMobileMenuOpen(false)}>
                <button className="w-full btn btn-primary flex items-center justify-start space-x-3">
                  <Zap className="w-4 h-4" />
                  <span>Create Tournament</span>
                </button>
              </Link>

              <div className="border-t border-white/10 my-3"></div>

              {/* Coming Soon Section */}
              <div className="text-xs text-gray-400 px-3 py-1 font-medium">Coming Soon</div>

              <button
                className="w-full btn btn-secondary opacity-50 cursor-not-allowed flex items-center justify-start space-x-3"
                disabled
              >
                <Brain className="w-4 h-4" />
                <span>Trivia Quizzes</span>
              </button>

              <button
                className="w-full btn btn-secondary opacity-50 cursor-not-allowed flex items-center justify-start space-x-3"
                disabled
              >
                <List className="w-4 h-4" />
                <span>Tier Lists</span>
              </button>

              <button
                className="w-full btn btn-secondary opacity-50 cursor-not-allowed flex items-center justify-start space-x-3"
                disabled
              >
                <User className="w-4 h-4" />
                <span>User Profiles</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header