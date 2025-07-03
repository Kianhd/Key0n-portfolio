'use client';

import { useState } from 'react';
import Navigation from '../components/Navigation';
import BeatCard from '../components/BeatCard';
import ContactModal from '../components/ContactModal';
import { motion, AnimatePresence } from 'motion/react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Beat {
  id: string;
  title: string;
  price: number;
  bpm: number;
  genre: string;
  tags: string[];
  audioFile: string;
  coverImage?: string;
  paymentLink: string;
}

export default function BeatsPage() {
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [selectedBeat, setSelectedBeat] = useState<Beat | null>(null);
  
  useScrollAnimation();

  const beats: Beat[] = [
    // Hip-Hop
    {
      id: 'hh001',
      title: 'Dark Streets',
      price: 49,
      bpm: 140,
      genre: 'Hip-Hop',
      tags: ['Dark', 'Trap', 'Heavy'],
      audioFile: '/beats/dark-streets.mp3',
      paymentLink: 'https://beatstars.com/beat/dark-streets'
    },
    {
      id: 'hh002',
      title: 'Golden Hour',
      price: 59,
      bpm: 85,
      genre: 'Hip-Hop',
      tags: ['Smooth', 'Jazz', 'Chill'],
      audioFile: '/beats/golden-hour.mp3',
      paymentLink: 'https://beatstars.com/beat/golden-hour'
    },
    {
      id: 'hh003',
      title: 'City Vibes',
      price: 45,
      bpm: 128,
      genre: 'Hip-Hop',
      tags: ['Urban', 'Boom Bap', 'Classic'],
      audioFile: '/beats/city-vibes.mp3',
      paymentLink: 'https://beatstars.com/beat/city-vibes'
    },
    // Pop
    {
      id: 'pop001',
      title: 'Summer Dreams',
      price: 65,
      bpm: 120,
      genre: 'Pop',
      tags: ['Upbeat', 'Radio Ready', 'Happy'],
      audioFile: '/beats/summer-dreams.mp3',
      paymentLink: 'https://beatstars.com/beat/summer-dreams'
    },
    {
      id: 'pop002',
      title: 'Midnight Call',
      price: 55,
      bpm: 95,
      genre: 'Pop',
      tags: ['Emotional', 'Ballad', 'Piano'],
      audioFile: '/beats/midnight-call.mp3',
      paymentLink: 'https://beatstars.com/beat/midnight-call'
    },
    {
      id: 'pop003',
      title: 'Electric Pulse',
      price: 60,
      bpm: 132,
      genre: 'Pop',
      tags: ['Electronic', 'Dance', 'Synth'],
      audioFile: '/beats/electric-pulse.mp3',
      paymentLink: 'https://beatstars.com/beat/electric-pulse'
    },
    // EDM
    {
      id: 'edm001',
      title: 'Neon Lights',
      price: 75,
      bpm: 128,
      genre: 'EDM',
      tags: ['Progressive', 'Club', 'Festival'],
      audioFile: '/beats/neon-lights.mp3',
      paymentLink: 'https://beatstars.com/beat/neon-lights'
    },
    {
      id: 'edm002',
      title: 'Bass Drop',
      price: 70,
      bpm: 150,
      genre: 'EDM',
      tags: ['Dubstep', 'Heavy', 'Drop'],
      audioFile: '/beats/bass-drop.mp3',
      paymentLink: 'https://beatstars.com/beat/bass-drop'
    },
    // Commercial
    {
      id: 'com001',
      title: 'Corporate Rise',
      price: 85,
      bpm: 110,
      genre: 'Commercial',
      tags: ['Motivational', 'Corporate', 'Inspiring'],
      audioFile: '/beats/corporate-rise.mp3',
      paymentLink: 'https://beatstars.com/beat/corporate-rise'
    },
    {
      id: 'com002',
      title: 'Tech Future',
      price: 80,
      bpm: 125,
      genre: 'Commercial',
      tags: ['Technology', 'Modern', 'Minimal'],
      audioFile: '/beats/tech-future.mp3',
      paymentLink: 'https://beatstars.com/beat/tech-future'
    }
  ];

  const genres = ['all', 'Hip-Hop', 'Pop', 'EDM', 'Commercial'];
  
  const filteredBeats = selectedGenre === 'all' 
    ? beats 
    : beats.filter(beat => beat.genre === selectedGenre);

  const handleCustomize = (beat: Beat) => {
    setSelectedBeat(beat);
    setContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 gradient-fade-bottom">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10 py-20">
          <h1 className="text-hero font-bold mb-8 animate-fade-in-up">
            PREMIUM
            <br />
            <span className="relative inline-block" style={{ color: '#FFC60B', fontFamily: 'Subway Berlin OT, sans-serif', fontWeight: '400' }}>
              BEATS
              <div className="absolute inset-0 animate-pulse" style={{ animationDuration: '3s' }}>
                <span className="absolute inset-0 text-[#FFC60B]" style={{ fontFamily: 'Subway Berlin OT, sans-serif', fontWeight: '400' }}>BEATS</span>
                <span className="absolute inset-0 text-[#FFC60B] blur-[2px] opacity-90" style={{ fontFamily: 'Subway Berlin OT, sans-serif', fontWeight: '400' }}>BEATS</span>
                <span className="absolute inset-0 text-[#FFC60B] blur-[4px] opacity-60" style={{ fontFamily: 'Subway Berlin OT, sans-serif', fontWeight: '400' }}>BEATS</span>
              </div>
            </span>
            <br />
            COLLECTION
          </h1>
          <p className="text-body text-muted mb-12 max-w-3xl mx-auto uppercase">
            Premium beats crafted by KEY0N and his team. Ready for licensing or custom production.
          </p>
        </div>
      </section>

      {/* Genre Filter */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-title font-bold mb-8 uppercase scroll-fade-in">
              Browse By Genre
            </h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {genres.map((genre) => (
                <div key={genre} className="relative group">
                  <motion.button
                    onClick={() => setSelectedGenre(genre)}
                    className={`px-8 py-3 text-small uppercase font-semibold transition-all duration-300 border-2 border-zinc-800 rounded-sm relative z-10 ${
                      selectedGenre === genre
                        ? 'bg-foreground text-background'
                        : 'text-foreground hover:bg-foreground hover:text-background'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {genre === 'all' ? 'All Genres' : genre}
                  </motion.button>
                  <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 border-2 border-foreground rounded-sm" />
                    <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-sm" />
                    <div className="absolute inset-0 border-2 border-foreground rounded-sm blur-md opacity-50" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Beats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredBeats.map((beat) => (
                <motion.div
                  key={beat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <BeatCard
                    beat={beat}
                    onCustomize={() => handleCustomize(beat)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Custom Beats CTA Section */}
      <section className="py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-transparent to-card/20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-title font-bold mb-6 uppercase">
              Custom
              <br />
              <span 
                className="text-[#FFC60B]" 
                style={{ fontFamily: 'Subway Berlin OT, sans-serif' }}
              >
                BEATS
              </span>
              <br />
              Production
            </h2>
            
            <p className="text-body text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
              Ready to bring your musical vision to life? Let's collaborate 
              and create something extraordinary together.
            </p>

            <motion.div 
              className="relative group inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="/#contact"
                className="border-2 border-[#FFC60B] bg-[#FFC60B] text-background hover:bg-transparent hover:text-[#FFC60B] px-10 py-4 text-small uppercase font-semibold transition-all duration-300 rounded-sm inline-block relative z-10"
              >
                Start Your Project
              </a>
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 border-2 border-[#FFC60B] rounded-sm" />
                <div className="absolute inset-0 border-2 border-[#FFC60B] rounded-sm blur-sm" />
                <div className="absolute inset-0 border-2 border-[#FFC60B] rounded-sm blur-md opacity-50" />
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="mt-16 flex justify-center items-center gap-4 text-muted">
              <div className="w-12 h-[1px] bg-zinc-800"></div>
              <span className="text-small uppercase tracking-wider">Premium Quality Guaranteed</span>
              <div className="w-12 h-[1px] bg-zinc-800"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Modal */}
      {contactModalOpen && selectedBeat && (
        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
          beatName={selectedBeat.title}
        />
      )}
    </div>
  );
}