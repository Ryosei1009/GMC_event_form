import React from 'react';
import Header from './components/utils/Header';
import { Route, Routes } from 'react-router-dom';
import NewItem from './components/newitem/NewItemV2';
import NewItemList from './components/newitem_list/NewItemList';
import NotFound from './components/utils/NotFound';
import Redirect from './components/utils/Redirect';
import Footer from './components/utils/Footer';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import NewItemList2 from './components/newitem_list2/NewItemList2';

const App = () => {
  const token = localStorage.getItem('token') || null;
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!token) return;
    async function fetchUserInfo() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_DOMAIN}/account/userinfo`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.data && response.data[0].role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    }
    fetchUserInfo();
  }, [token]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-main/60 via-main to-main/60">
      <Header isAdmin={isAdmin} />
      <main className="pb-16">
        <Routes>
          {!localStorage.getItem('citizenid') && (
            <Route path="/" element={<NewItem />} />
          )}
          {localStorage.getItem('citizenid') && (
            <Route path="/" element={<NewItemList2 />} />
          )}
          {isAdmin && (
            <>
              <Route path="/admin" element={<NewItemList token={token} />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
