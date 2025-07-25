import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import vid from '../assets/vid.mp4';
import hero from '../assets/hero.png';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

// ✅ Define MotionLink
const MotionLink = motion(Link);

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Gradient Background (fallback for video) */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 z-0" />
      
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src={vid}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Animated Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-br from-indigo-900/70 via-purple-900/50 to-blue-900/30" />

      {/* Content */}
      <motion.div 
        className="relative z-20 flex flex-col md:flex-row items-center justify-center h-full text-white px-4 md:px-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Text */}
        <motion.div 
          className="text-center md:text-left max-w-2xl space-y-6 md:pr-10"
          variants={containerVariants}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            variants={itemVariants}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-300">
              Find Your Dream Job
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-100 max-w-lg"
            variants={itemVariants}
          >
            Join thousands of professionals discovering their perfect career match with our platform.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <MotionLink
              to="/login"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-white font-semibold text-lg transition-all duration-300 shadow-xl flex items-center"
            >
              Get Started
              <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </MotionLink>
          </motion.div>

          <motion.div 
            className="flex items-center justify-center md:justify-start space-x-4 pt-4"
            variants={itemVariants}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3].map((item) => (
                <img 
                  key={item}
                  src={`https://randomuser.me/api/portraits/${item % 2 === 0 ? 'women' : 'men'}/${item+20}.jpg`}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white/80"
                />
              ))}
            </div>
            <p className="text-gray-200 text-sm">
              Join <span className="font-bold text-white">10,000+</span> professionals
            </p>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div 
          className="mt-10 md:mt-0 md:ml-10"
          variants={itemVariants}
        >
          <motion.img
            src={hero}
            alt="Career growth illustration"
            className="w-80 md:w-[32rem] object-contain drop-shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            drag
            dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
            dragElastic={0.1}
          />
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
