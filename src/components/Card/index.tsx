"use client";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FC, useEffect, useRef, useState } from "react";
import { DiReact } from "react-icons/di";
import { DiJsBadge } from "react-icons/di";
import { BiLogoTypescript } from "react-icons/bi";
import { DiHtml5 } from "react-icons/di";
import { DiCss3 } from "react-icons/di";

import Image from "next/image";
import { CgArrowLongRight } from "react-icons/cg";

interface indexProps {
  project: {
    text: string;
    top: number;
    left: number;
    color: string;
    desc: string;
    pic: any;
  };
  index: number;
  setColor: any;
  setIsHovered: any;
  setTextColor: any;
}

const index: FC<indexProps> = ({
  index,
  project,
  setColor,
  setIsHovered,
  setTextColor,
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 110%", `-90% start`],
  });
  const [cardHover, setCardHover] = useState(false);

  // mouse values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 40 });
  const y = useSpring(mouseY, { damping: 40 });

  // tilt values
  const deg = useTransform(scrollYProgress, [0, 1], ["35deg", "0deg"]);
  const scale = useTransform(scrollYProgress, [0, 1], ["1.5", "1"]);
  const rotateX = useTransform(y, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-4deg", "4deg"]);

  const transform = useMotionTemplate` translateX(${
    window.innerWidth > 640 ? project.left : 1
  }vw) translateY(${
    window.innerWidth > 640 ? project.top : 1
  }vh) scale(${scale}) rotateX(${rotateX}) rotateY(${rotateY}) perspective(600px)  rotateX(${deg})  `;

  //values for opacity cover
  const opacity = useTransform(scrollYProgress, [0.4, 0.8], [1, 0]);

  const handleMouseEnter = (e: any) => {
    const rect = e.target.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };
  const ref1 = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      id={`card${index}`}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseEnter}
      onMouseEnter={() => {
        setCardHover(true);
        setIsHovered(true);
        setColor(project.color);
        // setTextColor("#000000");
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
        setCardHover(false);
        setIsHovered(false);
        setColor("#000000");
        // setTextColor("#Ffffff");
      }}
      ref={ref}
      style={{
        transform,
        transformStyle: "preserve-3d",
      }}
      className={`h-[34vh] w-[34vh] sm:h-[500px] sm:w-[500px] cursor-pointer flex justify-center items-end text-4xl text-center text-gray-200 bg-[#1b1b1b] sm:bg-[#292929] rounded-sm opacity-100 shadow-2xl z-20`}
    >
      <motion.p
        ref={ref1}
        initial={{ y: -2 }}
        animate={{
          opacity: cardHover ? [0, 1] : 0,
          y: cardHover
            ? [
                -2,
                (window.innerWidth > 640 ? 35 : 25) +
                  ref1.current!.clientHeight,
              ]
            : -2,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(49px)",
          opacity: 0,
        }}
        className="absolute flex leading-6 mt-auto py-4 px-4 text-[14px]"
      >
        {project.desc}
      </motion.p>
      <Image
        src={project.pic}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(50px)",
        }}
        className="h-[30vh] w-[30vh] sm:h-[450px] sm:w-[450px] z-30 top-0 left-0 m-auto opacity-80 rounded-md"
        alt={""}
      ></Image>
      {/* cover for when it is shown */}
      <motion.div
        // initial={{ opacity: 1 }}
        // whileInView={{ opacity: 0, transition: { duration: 1 } }}
        style={{
          opacity,
          transformStyle: "preserve-3d",
          transform: "translateZ(50px) translateY(61%) translateX(-50%)",
        }}
        className="h-[30vh] w-[30vh] sm:h-[450px] sm:w-[450px] absolute bg-red-800 z-[100] top-[-50%] left-[50%] m-auto opacity-100"
      />
      {/* <DiReact className="absolute top-4 left-0 z-50" />
      <DiJsBadge className="absolute left-5 top-4 z-50" />
      <BiLogoTypescript className="absolute left-10 top-4 z-50" />
      <DiHtml5 className="absolute left-15 top-4 z-50" />
      <DiCss3 className="absolute left-20 top-4 z-50" /> */}
      <div
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(100px)",
        }}
        className="z-30 absolute bottom-0 left-10"
      >
        <div className="flex flex-row items-center gap-3 text-[20px]">
          <CgArrowLongRight />
          {project.text}
        </div>
      </div>
    </motion.div>
  );
};

export default index;
