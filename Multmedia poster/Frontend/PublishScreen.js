
import React from 'react';

const PublishScreen = ({ switchScreen, handleSubmit }) => {
  return (
    <div id="publish-section" className="screen">
      <textarea id="publish-textarea"></textarea>
      <div id="network-checkbox-container">
        <label>
          <input type="checkbox" id="fb-checkbox" /> Facebook
        </label>
        <label>
          <input type="checkbox" id="tw-checkbox" /> Twitter
        </label>
        <label>
          <input type="checkbox" id="insta-checkbox" disabled /> Instagram
        </label>
      </div>
      <button id="submit-btn" onClick={handleSubmit}>Publish</button>
      <button id="left-btn" onClick={switchScreen}>Switch to Login</button>
    </div>
  );
};

export default PublishScreen;
