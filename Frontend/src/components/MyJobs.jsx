import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '../utils/config';

const MyJobs = () => {
  const [jobdata, setJobdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const Deletejobs = async (id) => {
    setDeletingId(id);
    try {
      const res = await axios.delete(`${BASE_URL}/delete/${id}`, {
        withCredentials: true
      });
      toast.success(res.data.message || "Job deleted successfully!");
      getMyJobs();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job.");
      console.error("Error deleting job:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const getMyJobs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/getmyjobs`, {
        withCredentials: true
      });
      setJobdata(res.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch jobs.");
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyJobs();
  }, []);

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

  const jobTypeColors = {
    'full-time': 'bg-blue-100 text-blue-800',
    'part-time': 'bg-purple-100 text-purple-800',
    'contract': 'bg-orange-100 text-orange-800',
    'internship': 'bg-green-100 text-green-800',
    'remote': 'bg-teal-100 text-teal-800'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Posted Jobs</h1>
          <p className="text-lg text-gray-600">Manage your job listings</p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : Array.isArray(jobdata) && jobdata.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence>
              {jobdata.map((item) => (
                <motion.div
                  key={item._id}
                  variants={item}
                  layout
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                >
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        jobTypeColors[item.jobType] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.jobType}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="text-gray-600">{item.companyName}</span>
                      </div>

                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-gray-600">{item.location}</span>
                      </div>

                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">₹{item.salary}</span>
                      </div>

                      <div className="pt-3 border-t border-gray-100">
                        <h3 className="font-medium text-gray-800 mb-1">Description</h3>
                        <p className="text-gray-600 text-sm line-clamp-3">{item.introduction}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Posted {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this job posting?")) {
                          Deletejobs(item._id);
                        }
                      }}
                      disabled={deletingId === item._id}
                      className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                        deletingId === item._id ? 'bg-red-400' : 'bg-red-500 hover:bg-red-600'
                      } transition-colors`}
                    >
                      {deletingId === item._id ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Deleting...
                        </span>
                      ) : 'Delete'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-xl shadow-sm p-8 text-center"
          >
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No jobs posted yet</h3>
            <p className="mt-1 text-gray-500">Get started by posting your first job listing.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MyJobs;