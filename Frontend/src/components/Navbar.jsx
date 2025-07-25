import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { removeUser } from '../store/slices/userSlice';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiBriefcase, FiFileText } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '../utils/config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isrole = user?.role;

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios(`${BASE_URL}/logout`, { 
        withCredentials: true 
      });
      toast.success(response.data.message);
      dispatch(removeUser());
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Logout failed');
    }
  };

  // Animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const mobileItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-white/80 backdrop-blur-sm py-4'} border-b border-gray-100`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo with animation */}
          <Link to="/" className="flex items-center">
            <motion.span 
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              CareerConnect
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  <FiHome className="mr-2" />
                  Home
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/alljobs" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                  <FiBriefcase className="mr-2" />
                  All Jobs
                </Link>
              </motion.div>
              
              {isrole === "Job Seeker" && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/appliedjobs" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                    <FiFileText className="mr-2" />
                    Applied Jobs
                  </Link>
                </motion.div>
              )}
              
              {isrole === "Employer" && (
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/jobs" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors font-medium">
                    <FiBriefcase className="mr-2" />
                    My Jobs
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Auth Section */}
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/user" className="flex items-center px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors">
                    <FiUser className="mr-2" />
                    <span className="font-medium">{user.name}</span>
                  </Link>
                </motion.div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link 
                  to="/login" 
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  Login
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-indigo-600 focus:outline-none p-2 rounded-full hover:bg-gray-100"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation with animations */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
              className="md:hidden mt-4 pb-4 space-y-2"
            >
              <motion.div variants={mobileItemVariants}>
                <Link 
                  to="/" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiHome className="mr-3" />
                  Home
                </Link>
              </motion.div>
              
              <motion.div variants={mobileItemVariants}>
                <Link 
                  to="/alljobs" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <FiBriefcase className="mr-3" />
                  All Jobs
                </Link>
              </motion.div>
              
              {isrole === "Job Seeker" && (
                <motion.div variants={mobileItemVariants}>
                  <Link 
                    to="/appliedjobs" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiFileText className="mr-3" />
                    Applied Jobs
                  </Link>
                </motion.div>
              )}
              
              {isrole === "Employer" && (
                <motion.div variants={mobileItemVariants}>
                  <Link 
                    to="/jobs" 
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiBriefcase className="mr-3" />
                    My Jobs
                  </Link>
                </motion.div>
              )}
              
              {user ? (
                <>
                  <motion.div variants={mobileItemVariants}>
                    <Link 
                      to="/user" 
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-indigo-50 rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <FiUser className="mr-3" />
                      Profile
                    </Link>
                  </motion.div>
                  
                  <motion.div variants={mobileItemVariants}>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiLogOut className="mr-3" />
                      Logout
                    </button>
                  </motion.div>
                </>
              ) : (
                <motion.div variants={mobileItemVariants}>
                  <Link 
                    to="/login" 
                    className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all mt-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
