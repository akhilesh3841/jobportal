import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addUser } from '../store/slices/userSlice';
import { motion } from 'framer-motion';
import { Import } from 'lucide-react';
import { BASE_URL } from '../utils/config';

const EditProfile = ({ name, email, phone, role, address, resume }) => {
  const dispatch = useDispatch();

  const [fname, setName] = useState('');
  const [femail, setEmail] = useState('');
  const [fphone, setPhone] = useState('');
  const [faddress, setAddress] = useState('');
  const [fresume, setResume] = useState(null);

  useEffect(() => {
    setName(name || '');
    setEmail(email || '');
    setPhone(phone || '');
    setAddress(address || '');
  }, [name, email, phone, address]);

  const handleChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('name', fname);
      formData.append('email', femail);
      formData.append('phone', fphone);
      formData.append('address', faddress);

      if (role === 'Job Seeker' && fresume) {
        formData.append('resume', fresume);
      }

      const res = await axios.put(
        `${BASE_URL}/update/profile`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log(res.data)

      toast.success('Profile updated successfully');
      dispatch(addUser(res.data.data.user));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="max-w-md mx-auto mt-11 bg-white p-6 rounded shadow-md flex flex-col gap-4"
    >
      <motion.h1
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold text-center"
      >
        Edit Profile
      </motion.h1>

      {[ 
        { value: fname, setter: setName, placeholder: "Full Name" },
        { value: femail, setter: setEmail, placeholder: "Email" },
        { value: fphone, setter: setPhone, placeholder: "Phone" },
        { value: faddress, setter: setAddress, placeholder: "Address" }
      ].map((field, idx) => (
        <motion.input
          key={idx}
          value={field.value}
          onChange={(e) => field.setter(e.target.value)}
          placeholder={field.placeholder}
          whileFocus={{ scale: 1.02 }}
          className="border px-3 py-2 rounded focus:outline-indigo-400"
        />
      ))}

      <div className="text-gray-700 font-medium">Role: {role}</div>

      {role === 'Job Seeker' && (
        <>
          <motion.input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setResume(e.target.files[0])}
            whileHover={{ scale: 1.01 }}
            className="border px-3 py-2 rounded"
          />

          {resume && typeof resume === 'string' && (
            <motion.a
              href={`https://docs.google.com/gview?url=${encodeURIComponent(resume)}&embedded=true`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm"
              whileHover={{ scale: 1.03 }}
            >
              View Current Resume
            </motion.a>
          )}

          {fresume && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-green-500"
            >
              Selected: {fresume.name}
            </motion.p>
          )}
        </>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleChanges}
        className="bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition"
      >
        Save Changes
      </motion.button>
    </motion.div>
  );
};

export default EditProfile;
