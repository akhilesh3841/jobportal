import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BASE_URL } from '../utils/config';

const Appliedjobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkApplyJobs();
  }, []);

  const checkApplyJobs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/jobseeker/getall`,
        { withCredentials: true }
      );
      console.log(res.data.applications)
      setJobs(res.data.applications || []);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch applied jobs');
    } finally {
      setIsLoading(false);
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const statusColors = {
    Applied: 'bg-blue-100 text-blue-800',
    Accepted: 'bg-green-100 text-green-800',
    Rejected: 'bg-red-100 text-red-800',
    Interview: 'bg-purple-100 text-purple-800',
    default: 'bg-gray-100 text-gray-800'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Applications</h1>
          <p className="text-gray-600">Track the status of your job applications</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : jobs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center"
          >
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No applications found</h3>
            <p className="mt-1 text-gray-500">You haven't applied to any jobs yet.</p>
          </motion.div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <AnimatePresence>
              {jobs.map((item) => (
                <motion.div
                  key={item._id}
                  variants={item}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex-shrink-0 h-12   bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                            {item?.jobInfo?.jobId?.companyName?.charAt(0) || 'C'}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {item?.jobInfo?.jobId?.title}
                            </h3>
                            <p className="text-gray-600">{item?.jobInfo?.jobId?.companyName}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-gray-500">Location</p>
                            <p className="text-gray-700">{item?.jobInfo?.jobId?.location || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Salary</p>
                            <p className="text-gray-700">${item?.jobInfo?.jobId?.salary || 'Not specified'}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Job Type</p>
                            <p className="text-gray-700 capitalize">{item?.jobInfo?.jobId?.jobType || 'Not specified'}</p>
                          </div>
                          {/* <div>
                            <p className="text-sm text-gray-500">Applied Date</p>
                            <p className="text-gray-700">
                              {new Date(item.createdAt).toLocaleDateString()}
                            </p>
                          </div> */}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          statusColors[item.jobSeekerInfo?.status] || statusColors.default
                        }`}>
                          {item.jobSeekerInfo?.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Appliedjobs;