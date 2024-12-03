import React, { useState, useEffect } from "react";
import { ArrowUp } from "phosphor-react";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-5 right-5 bg-brown/80 hover:bg-pale text-white p-3 rounded-full shadow-lg transition duration-300 ease-in-out"
      >
        <ArrowUp size={24} />
      </button>
    )
  );
};

export default ScrollToTopButton;
