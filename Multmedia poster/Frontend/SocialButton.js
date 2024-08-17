
import React from 'react';

const SocialButtons = ({ switchScreen, fbService, twService }) => {

  const handleFbClick = async () => {
    if (fbService.isAuthenticated()) {
      await fbService.signOut();
    } else {
      await fbService.signIn();
    }
  };

  const handleTwClick = async () => {
    if (twService.isAuthenticated()) {
      await twService.signOut();
    } else {
      await twService.signIn();
    }
  };

  return (
    <div id="login-section" className="screen">
      <button id="fb-btn" onClick={handleFbClick}>Facebook</button>
      <button id="tw-btn" onClick={handleTwClick}>Twitter</button>
      <button id="insta-btn">Instagram</button>
      <button id="right-btn" onClick={switchScreen}>Switch to Publish</button>
    </div>
  );
};

export default SocialButtons;
