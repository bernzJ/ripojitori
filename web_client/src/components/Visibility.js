import React, { useState, useEffect } from 'react';

import Loading from './Loading';

const Visibility = ({ children }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      console.log(window.pageYOffset, window.scrollY);
      if (window.pageYOffset > 1) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  if (visible) {
    return children;
  }
  return <Loading />;
};

export default Visibility;
