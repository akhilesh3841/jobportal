import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { BASE_URL } from '../utils/config';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendLink = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/forgotpass`,
        { email },
        { withCredentials: true }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    tap: { scale: 0.95 },
    hover: { scale: 1.02 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 px-4"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
      >
        <motion.h1 
          variants={itemVariants}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          Forgot Password
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-sm text-gray-600 mb-6"
        >
          Enter your registered email address to receive a password reset link.
        </motion.p>

        <motion.div variants={itemVariants}>
          <input
            type="email"
            placeholder="Your Registered Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
          />
        </motion.div>

        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={handleSendLink}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 font-semibold shadow-md transition disabled:opacity-70"
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPassword;