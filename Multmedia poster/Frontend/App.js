// src/components/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import SocialButtons from './SocialButtons';
import PublishScreen from './PublishScreen';
import FacebookService from '../services/FacebookService';
import TwitterService from '../services/TwitterService';
import { fetchFgData } from '../utils/fetchFgData';

function App() {
  const [isLoginScreen, setIsLoginScreen] = useState(true);
  const [fbService] = useState(new FacebookService());
  const [twService] = useState(new TwitterService());
  const [fgData, setFgData] = useState("");

  useEffect(() => {
    fetchFgData().then(data => setFgData(data));
    feather.replace();

    const fbCheckInterval = setInterval(() => {
      if (window.FB) {
        refreshLoginUI();
        clearInterval(fbCheckInterval);
      }
    }, 500);

    return () => clearInterval(fbCheckInterval);
  }, [fbService]);

  const switchScreen = () => {
    setIsLoginScreen(prev => !prev);
  };

  const refreshLoginUI = () => {
    fbService.refreshStatus();
    twService.refreshStatus();
  };

  const handleSubmit = async () => {
    try {
      if (document.getElementById("fb-checkbox").checked) {
        await fbService.signIn(fbService.createPost);
      }
      if (document.getElementById("tw-checkbox").checked) {
        await twService.createPost();
      }
      runPostAnimation();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  const runPostAnimation = () => {
    const publishSection = document.getElementById("publish-section");
    publishSection.classList.add("start-post-animation");

    setTimeout(() => {
      document.getElementById("publish-textarea").value = "";
      setTimeout(() => {
        publishSection.classList.remove("start-post-animation");
      }, 400);
    }, 400);
  };

  return (
    <div className="app-container">
      {isLoginScreen ? (
        <SocialButtons switchScreen={switchScreen} fbService={fbService} twService={twService} />
      ) : (
        <PublishScreen switchScreen={switchScreen} handleSubmit={handleSubmit} />
      )}
    </div>
  );
}

export default App;
