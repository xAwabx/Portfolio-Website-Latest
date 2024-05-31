"use client";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import pic from "../../images/selfpic1.jpg";
import NavButton from "../../components/NavButton/index";
import Skill from "../../components/Skill/index";
import SkillHeader from "../../components/Skill/SkillHeader/index";
import ArrowButton from "../../components/ArrowButton/index";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [navHovered, setNavHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [skillHovered, setSkillHovered] = useState(false);
  const [transitionComp, setTransitionComp] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  const skills1 = [
    { name: "Python", percentage: 80 },
    { name: "JavaScript", percentage: 85 },
    { name: "TypeScript", percentage: 70 },
    { name: "Dart", percentage: 30 },
    { name: "Node Js", percentage: 60 },
    { name: "ReactJs", percentage: 90 },
    { name: "NextJs", percentage: 85 },
  ];
  const skills2 = [
    { name: "ExpressJs", percentage: 80 },
    { name: "Flask", percentage: 50 },
    { name: "MongoDB", percentage: 90 },
    { name: "Mongoose", percentage: 90 },
    { name: "TailwindCSS", percentage: 90 },
    { name: "FramerMotion", percentage: 60 },
    { name: "REST API's", percentage: 90 },
  ];
  const socials = [
    {
      text: "Instagram",
      pos: [20, -170],
      link: "https://www.instagram.com/awab_ghouri/",
    },
    {
      text: "Linkedin",
      pos: [170, -170],
      link: "https://www.linkedin.com/in/awab-saghir-a8a1a7245/",
    },
    { text: "GitHub", pos: [320, -170], link: "https://github.com/xAwabx" },
  ];

  return render ? (
    <div
      className={`${
        transitionComp ? "h-fit" : "h-[100vh]"
      } bg-black px-[4vw] sm:px-[2vw] py-[2vh] overflow-hidden `}
    >
      <motion.div
        initial={{ top: 0 }}
        animate={{
          top: "-100vh",
          transition: { delay: 1, duration: 0.5, ease: [0.83, 0, 0.17, 1] },
        }}
        onAnimationComplete={() => {
          setTransitionComp(true);
        }}
        className="absolute  left-0 h-[100vh] w-[100vw] bg-red-900 z-50"
      >
        <div className="flex justify-center items-center h-full w-full">
          <h1 className="text-[10vw] sm:text-[20vh] text-center ">
            INFORMATION
          </h1>
        </div>
      </motion.div>
      <div className="flex flex-col">
        <motion.div
          exit={{ y: 25, opacity: 0 }}
          className="fixed h-[4vh] flex flex-row bg-pink z-50"
        >
          <NavButton
            text={"Back"}
            route={"/"}
            index={0}
            cardHovered={isHovered}
            navHovered={navHovered}
            setNavHovered={setNavHovered}
            setContactOpened={null}
          />
        </motion.div>
        <div className="flex flex-col sm:flex-row  gap-[2vw] w-auto sm:w-full mt-[5vh] ">
          <div className="flex flex-col w-full text-left sm:items-start items-center gap-[2.5vh] sm:gap-[3vh]">
            <p className=" text-white text-[2.6vh] sm:text-[5vh]  text-left cursor-default">
              {/* for phones image */}
              <Image
                src={pic}
                alt="pfp"
                className="sm:hidden block float-right h-[25vh] sm:h-[40vh] rounded-full pl-[3vw] w-auto"
              />
              <motion.span
                onHoverStart={() => {
                  setIsHovered(true);
                  setSkillHovered(true);
                }}
                onHoverEnd={() => {
                  setSkillHovered(false);
                  setIsHovered(false);
                }}
                whileHover={{
                  color: "rgb(220, 38, 38)",
                  transition: { duration: 0.3 },
                }}
              >
                AWAB SAGHIR{" "}
              </motion.span>
              <span
                className={`${
                  isHovered ? "opacity-70 duration-300" : "opacity-100"
                } w-full`}
              >
                is a 17-year-old self taught programmer, currently enrolled in
                college. His journey in the world of computers and technology
                has been exciting, driven by a genuine passion for all things
                digital.
              </span>
            </p>
            {/* line under text*/}
            <motion.div
              initial={{ width: "0vw" }}
              animate={{
                width: "100%",
                transition: {
                  delay: 0.8,
                  duration: 1,
                  ease: [0.32, 0, 0.67, 0],
                },
              }}
              className=" bg-red-600 w-[100%] h-[2px] top-[45vh] left-[2vw]"
            />
            <div className="flex sm:justify-normal justify-center mb-[2vh] flex-row ">
              <SkillHeader text="Skills" />
            </div>
          </div>

          <Image
            src={pic}
            alt="pfp"
            className="hidden sm:block top-[10vh] right-[2vw] h-[20vh] sm:h-[40vh] rounded-lg w-auto"
          />
        </div>
      </div>

      <div className="flex flex-col gap-[5vh] ">
        <div>
          <div className="flex flex-col sm:flex-row justify-between mx-[2vw]">
            <div>
              <div className="flex flex-col">
                {skills1.map((obj, i) => {
                  return (
                    <Skill
                      SkillHovered={skillHovered}
                      setSkillHovered={setSkillHovered}
                      key={i}
                      name={obj.name}
                      percentage={obj.percentage}
                    />
                  );
                })}
              </div>
            </div>
            <div>
              {skills2.map((obj, i) => {
                return (
                  <Skill
                    SkillHovered={skillHovered}
                    setSkillHovered={setSkillHovered}
                    key={i}
                    name={obj.name}
                    percentage={obj.percentage}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex flex-row sm:justify-normal justify-evenly  sm:gap-[4vw] w-full">
          {socials.map((desc, index) => {
            return (
              <ArrowButton
                key={index}
                i={index}
                text={desc.text}
                pos={desc.pos}
                link={desc.link}
              />
            );
          })}

          {transitionComp && (
            <motion.h1
              initial={{
                y: -25,
                opacity: 0,
                translateX: window.innerWidth < 640 ? "50%" : "0",
              }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { type: "linear", duration: 0.5 },
              }}
              className="text-white text-[14px] hidden sm:block absolute bottom-[-12.5vh] right-[2vw] opacity-50 "
            >
              © Muhammad Awab 2024
            </motion.h1>
          )}
        </div>
      </div>
    </div>
  ) : (
    <motion.div
      initial={{ top: 0 }}
      className="absolute  left-0 h-[100vh] w-[100vw] bg-red-900 z-50"
    >
      <div className="flex justify-center items-center h-full w-full">
        <h1 className="text-[10vw] sm:text-[20vh] text-center ">INFORMATION</h1>
      </div>
    </motion.div>
  );
};

export default page;
