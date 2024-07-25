import React, { useState } from 'react';
import SignIn from './SignIn';

const MainComponent = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="relative">
      <button
        className="bg-blue-700 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        onClick={() => setShowSignIn(true)}
      >
        Sign In
      </button>
      {showSignIn && <SignIn setShowSignIn={setShowSignIn} />}
    </div>
  );
};

export default MainComponent;
