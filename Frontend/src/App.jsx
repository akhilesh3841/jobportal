import React, { useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";


import Login from "./pages/Login";
import Register from "./pages/Register";

import { PersistGate } from 'redux-persist/integration/react';
import { appStore,persistor } from "./store/store";
import { Provider, useSelector} from 'react-redux';
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import User from "./pages/User";
import Jobs from "./pages/Jobs";
import Alljob from "./components/Alljob";
import Appliedjobs from "./pages/Appliedjobs";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <Provider store={appStore}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
        {/* Navbar Section */}
        <Navbar />

        {/* Main Content */}
        <main className="bg-white dark:bg-gray-800 text-black dark:text-white p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alljobs" element={<Alljob/>}/>
            <Route path="/jobs" element={<Jobs/>} />
            {/* <Route path="/post/application/:jobId" element={<PostApplication />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<Forgotpassword/>}/>
            <Route path="/resetpassword/:token" element={<Resetpassword/>}></Route>
          
            <Route path="/user" element={<User/>}></Route>
            <Route path="/appliedjobs" element={<Appliedjobs/>}></Route>
          </Routes>
        </main>

        {/* Footer Section */}
        <Footer />

        <ToastContainer position="bottom-right" autoClose={3000}  theme="dark" />
      </BrowserRouter>
            </PersistGate>
    </Provider>
  );
};

export default App;
