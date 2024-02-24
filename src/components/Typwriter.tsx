import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface TypewriterProps {
  text: string;
  speed: number;
  tag: 'p'|'h1'|'span'|'h2';
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed, tag: Tag }) => {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText((prevText) => prevText + text[currentIndex]);
          setCurrentIndex((prevIndex) => prevIndex + 1);
        } else {
          clearInterval(intervalId);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }
  }, [currentIndex, inView, speed, text]);

  return <Tag ref={ref}>{displayText}</Tag>;
};

export default Typewriter;
