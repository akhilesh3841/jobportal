import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { BASE_URL } from '../utils/config';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        `${BASE_URL}/resetpassword/${token}`,
        { password },
        { withCredentials: true }
      );

      toast.success(response.data.message || "Password reset successful");
      setTimeout(() => navigate("/login"), 1500); // Delay navigation to show success message
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.02, boxShadow: "0px 5px 15px rgba(126, 58, 242, 0.3)" },
    tap: { scale: 0.98 },
    disabled: { opacity: 0.7 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-purple-50 px-4"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-3xl font-bold text-center text-purple-700 mb-6"
        >
          Reset Password
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            variants={itemVariants}
            className="flex flex-col space-y-2"
          >
            <label className="font-medium text-gray-700">New Password</label>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
              className="border border-gray-300 text-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover="hover"
            whileTap="tap"
            animate={isSubmitting ? "disabled" : ""}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold transition"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="inline-block mr-2"
                >
                  ↻
                </motion.span>
                Resetting...
              </span>
            ) : (
              "Reset Password"
            )}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword;