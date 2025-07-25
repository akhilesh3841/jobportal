import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JobPost from '../components/JobPost';
import Alljob from '../components/Alljob';
import MyJobs from '../components/MyJobs';
import MyApplications from '../components/MyApplications';


const Jobs = () => {
  const [activeTab, setActiveTab] = useState("jobpost");
  const [loading, setLoading] = useState(false);

  // Tab configuration
  const tabs = [
    { id: "jobpost", label: "Post Job", component: <JobPost /> },
    { id: "myjobs", label: "My Jobs", component: <MyJobs /> },
    { id: "checkapplications", label: "Applications", component: <MyApplications /> }
  ];

  // Animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
    exit: { opacity: 0, y: -10 }
  };

  const handleTabChange = (tabId) => {
    setLoading(true);
    setActiveTab(tabId);
    // Simulate loading delay for smoother transitions
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <div className="p-4 md:p-6 lg:mr-5 mt-5">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative px-4 py-2 rounded-t-lg text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id 
                ? "text-blue-600" 
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              variants={tabContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {tabs.find(tab => tab.id === activeTab)?.component}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Jobs;