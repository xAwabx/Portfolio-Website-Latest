"use client";
import { FC, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface indexProps {
  text: string;
  setSubject: any;
  subject: Array<string>;
}

const Tag: FC<indexProps> = ({ text, setSubject, subject }) => {
  const [hover, setHover] = useState(false);
  const [clicked, setClicked] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    subject.length === 0 && setClicked(false);
  }, [subject]);

  useEffect(() => {
    clicked
      ? setSubject((prev: Array<string>) => {
          return !prev.includes(text) ? [...prev, text] : prev;
        })
      : setSubject((prev: Array<string>) => {
          const new_array = prev.filter((val: any) => val != text);
          return prev.includes(text) ? new_array : prev;
        });
  }, [clicked]);

  return (
    <motion.div
      onClick={() => {
        setClicked((prev) => !prev);
      }}
      onMouseEnter={() => {
        window.innerWidth > 640 && setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      ref={ref}
      transition={{ duration: 1, ease: "easeInOut", type: "spring" }}
      className={`rounded-full h-min cursor-pointer w-fit text-[14px]  text-white backdrop-blur-md ${
        clicked
          ? hover
            ? "bg-[#272727] bg-opacity-100"
            : "bg-[#000000] bg-opacity-100"
          : hover
          ? "bg-[#353535] bg-opacity-80"
          : "bg-[#858585] bg-opacity-90"
      } transition-colors ease-in-out duration-300 px-[14px] py-[8px]`}
    >
      <motion.h1
        // whileHover={{ color: "#000000" }}
        animate={{
          color: hover || clicked ? "#ffffff" : "#000000",

          transition: { duration: 0.3, ease: "easeOut", type: "spring" },
        }}
        className=" text-[1.7vh] tracking-wider"
      >
        {text}
      </motion.h1>
    </motion.div>
  );
};

export default Tag;
