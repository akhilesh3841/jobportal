import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appendjob } from '../store/slices/jobSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiDollarSign, FiClock, FiCheckCircle, FiExternalLink } from 'react-icons/fi';
import { FaSearch, FaFilter } from 'react-icons/fa';

import { BASE_URL } from '../utils/config';

const Alljob = () => {
  const user = useSelector((store) => store.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    jobType: '',
    salaryRange: '',
    location: ''
  });

  // Fetch all jobs
  const getalljobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/getall`, {
        withCredentials: true,
      });
      setJobs(res.data.data || []);
      dispatch(appendjob(res.data.data || []));
    } catch (error) {
      console.log(error);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (id) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/post/${id}`,
        {
          name: user.name,
          email: user.email,
          address: user.address,
          phone: user.phone,
          resume: user.resume,
        },
        { withCredentials: true }
      );
      toast.success("Applied successfully!");
      console.log(res.data)
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to apply.");
    }
  };

  // Filter jobs based on search and filters
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = 
      (filters.jobType === '' || job.jobType === filters.jobType) &&
      (filters.location === '' || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
      (filters.salaryRange === '' || 
        (filters.salaryRange === '0-5' && job.salary <= 500000) ||
        (filters.salaryRange === '5-10' && job.salary > 500000 && job.salary <= 1000000) ||
        (filters.salaryRange === '10+' && job.salary > 1000000));
    
    return matchesSearch && matchesFilters;
  });

  // On mount
  useEffect(() => {
    getalljobs();
  }, []);

  // Animation variants
  const jobCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Dream Job</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our latest job openings and take the next step in your career
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by job title or company..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.jobType}
                onChange={(e) => setFilters({...filters, jobType: e.target.value})}
              >
                <option value="">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
              </select>
              
              <select
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filters.salaryRange}
                onChange={(e) => setFilters({...filters, salaryRange: e.target.value})}
              >
                <option value="">All Salaries</option>
                <option value="0-5">Up to ₹5L</option>
                <option value="5-10">₹5L - ₹10L</option>
                <option value="10+">₹10L+</option>
              </select>
              
              <button 
                onClick={() => setFilters({ jobType: '', salaryRange: '', location: '' })}
                className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No jobs found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredJobs.map((job) => (
                <motion.div
                  key={job._id}
                  variants={jobCardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.3 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="p-6 flex-grow">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h3>
                        <p className="text-blue-600 font-medium mb-3">{job.companyName}</p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {job.jobType}
                      </span>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center text-gray-600">
                        <FiMapPin className="mr-2" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FiDollarSign className="mr-2" />
                        <span>₹{job.salary.toLocaleString()}/year</span>
                      </div>
                      {/* <div className="flex items-center text-gray-600">
                        <FiClock className="mr-2" />
                        <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                      </div> */}
                    </div>
                    
                    <p className="mt-4 text-gray-700 line-clamp-3">{job.introduction}</p>
                  </div>
                  
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    {user?.role === "Job Seeker" ? (
                      <div className="flex justify-between items-center">
                        {/* <button
                          onClick={() => navigate(`/job/${job._id}`)}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                        >
                          View Details <FiExternalLink className="ml-1" />
                        </button> */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleApply(job._id)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm flex items-center"
                        >
                          <FiCheckCircle className="mr-2" />
                          Apply Now
                        </motion.button>
                      </div>
                    ) : (
                    <div>
                    </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alljob;