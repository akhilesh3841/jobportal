import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { BASE_URL } from '../utils/config';
const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null); // Track which application is being updated

  useEffect(() => {
    handleApplications();
  }, []);

  const handleApplications = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/employer/getall`,
        { withCredentials: true }
      );
      console.log(res.data.data)
      setApplications(res.data.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (status, jobId, userId, index) => {
    try {
      setUpdating(index);
      const res = await axios.post(
        `${BASE_URL}/review/${status}/${jobId}/${userId}`,
        {},
        { withCredentials: true }
      );
      console.log(res.data)
      toast.success(res.data.message);
      handleApplications(); // Refresh after update
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setUpdating(null);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
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
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
    disabled: { opacity: 0.6 }
  };

  const statusColors = {
    Applied: "bg-blue-100 text-blue-800",
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800"
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-6"
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-gray-800"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring" }}
      >
        My Applications
      </motion.h2>

      {loading ? (
        <motion.div 
          className="flex justify-center items-center h-64"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"
          />
        </motion.div>
      ) : applications.length === 0 ? (
        <motion.p 
          className="text-gray-500 text-center py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No applications found.
        </motion.p>
      ) : (
        <motion.ul 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {applications.map((app, index) => {
              const seeker = app.jobSeekerInfo;
              const job = app.jobInfo;
           const userId = seeker?.id?._id;
             const jobId = job?.jobId?._id;

              const currentStatus = app.status || "Applied";

              return (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  whileHover={{ y: -2 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700">Candidate</h3>
                      <p className="text-gray-900">{seeker?.name}</p>
                      <p className="text-gray-600 text-sm">{seeker?.email}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-700">Job Details</h3>
                      <p className="text-gray-900">{job?.jobTitle}</p>
                      <p className="text-gray-600 text-sm">{job?.companyName}</p>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[currentStatus]}`}>
                        {currentStatus}
                      </span>
                      
                      {currentStatus === "Applied" && (
                        <div className="flex gap-2 mt-3">
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            animate={updating === index ? "disabled" : ""}
                            disabled={updating === index}
                            className="bg-green-500 text-white px-3 py-1 rounded text-sm"
                            onClick={() => handleStatusUpdate("Accepted", jobId, userId, index)}
                          >
                            {updating === index ? "Processing..." : "Accept"}
                          </motion.button>
                          
                          <motion.button
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            animate={updating === index ? "disabled" : ""}
                            disabled={updating === index}
                            className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                            onClick={() => handleStatusUpdate("Rejected", jobId, userId, index)}
                          >
                            {updating === index ? "Processing..." : "Reject"}
                          </motion.button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      )}
    </motion.div>
  );
};

export default MyApplications;