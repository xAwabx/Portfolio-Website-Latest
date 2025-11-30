"use client";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Card from "../components/Card/index";
import NavButton from "../components/NavButton/index";
import NavButtonMenu from "../components/NavButtonMenu/index";
import Background from "../components/Background/index";
import ArrowButton from "../components/ArrowButton/index";
import chat from "../images/Chat.jpg";
import group from "../images/Group.jpg";
import todo from "../images/Todo.jpg";
import ContactPopup from "../components/ContactPopUp/index";
import data from "../images/data.jpg";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [color, setColor] = useState(["#000000"]);
  const [textColor, setTextColor] = useState(["#Ffffff"]);
  const [navHovered, setNavHovered] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactOpened, setContactOpened] = useState<boolean>(false);
  const [translate, setTranslate] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setRender(true);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // console.log(latest);
    if (latest > 0.1 && latest < 0.9) {
      setScrolled(true);
      // console.log(scrolled);
    } else {
      setScrolled(false);
      // console.log(scrolled);
    }
    if (latest === 1) {
      // console.log("reset now");
      window.scrollTo(0, 0);
    }
  });

  const projects = [
    {
      text: "CHAT APP",
      desc: "Real-time chat application that I designed and developed using TypeScript, Next.js, Pusher, Firebase, and Tailwind CSS. This dynamic platform enables you to effortlessly add and remove friends, send friend requests, and engage in seamless conversations within your personalized chatroom.",
      top: -10,
      left: 67,
      color: "#2b0000",
      pic: chat,
    },
    {
      text: "TALLY APP",
      desc: "Create, edit, and manage groups seamlessly on a platform developed using the MERN Stack. Authenticated through Firebase, users can efficiently collaborate, tallying the hours spent collectively on specific tasks. Additionally, users can easily add others to their groups, enhancing the collaborative experience.",
      top: -15,
      left: 10,
      color: "#2b0000",
      pic: group,
    },
    {
      text: "TODO APP",
      desc: "A user-friendly web application designed to help you effortlessly manage your to-do list. Developed using the powerful MERN stack, this platform ensures seamless organization and tracking of tasks, providing a streamlined and efficient task management solution.",
      top: -20,
      left: 65,
      color: "#2b0000",
      pic: todo,
    },
    {
      text: "DATA EXTRACTION",
      desc: "A Python automation script that efficiently extracts valuable real estate data from a website and inputs it into a spreadsheet.",
      top: -15,
      left: 14,
      color: "#2b0000",
      pic: data,
    },
    // { text: "", top: -20, left: 70, color: "#202020" },
  ];

  const nav = [
    { name: "Projects", route: "/" },
    { name: "Information", route: "/Info" },
    { name: "Contact", route: "" },
  ];
  const navsm = [
    { name: "Menu", route: "" },
    { name: "Projects", route: "/" },
    { name: "Information", route: "/Info" },
    { name: "Contact", route: "" },
  ];

  const socials = [
    {
      text: "Instagram",
      pos: [20, 30],
      link: "https://www.instagram.com/awab_saghir/",
    },
    {
      text: "Linkedin",
      pos: [170, 30],
      link: "https://www.linkedin.com/in/awab-saghir-a8a1a7245/",
    },
    {
      text: "GitHub",
      pos: [320, 30],
      link: "https://github.com/xAwabx",
    },
  ];
  const transitionRef = useRef<HTMLDivElement>(null);

  return render ? (
    <div className="bg-black">
      {/* transition div */}
      <motion.div
        initial={{ top: "100vh" }}
        id="transitionDiv"
        ref={transitionRef}
        className="fixed left-0 h-[100vh] w-[100vw] bg-red-900 z-[100]"
      >
        <div className="flex justify-center items-center h-full w-full">
          <h1 className="text-[10vw] sm:text-[20vh] text-center ">
            INFORMATION
          </h1>
        </div>
      </motion.div>
      <ContactPopup
        contactOpen={contactOpened}
        setContactOpened={setContactOpened}
      />
      <div
        className={`${
          contactOpened
            ? "pointer-events-none overscroll-none"
            : "pointer-events-auto"
        }`}
      >
        <motion.div
          animate={{ backgroundColor: isHovered ? color : color }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`h-[100vh] w-[100vw] fixed flex flex-col p-7  transform-scale ease-out`}
        >
          <Background isHovered={isHovered} />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`text-center absolute bottom-[8.5vh] sm:bottom-4 left-[50%] translate-x-[-50%] pointer-events-none z-100 text-white text-xl`}
          >
            SCROLL
          </motion.h1>
          <div className="w-full flex flex-row sm:justify-normal  sm:gap-[4vw]  justify-evenly sm:items-start">
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
              className="text-white text-[14px] hidden sm:block absolute bottom-[2vh] right-[2vw] opacity-50 "
            >
              © Muhammad Awab 2024
            </motion.h1>
          </div>
        </motion.div>
        {/* navbar for lg */}
        <motion.div
          exit={{ y: 25, opacity: 0 }}
          className="sm:hidden fixed top-7 left-7 h-[4vh] flex flex-row bg-pink z-50"
        >
          {navsm.map((item, i) => {
            return (
              <NavButtonMenu
                key={i}
                translate={translate}
                setTranslate={setTranslate}
                text={item.name}
                route={item.route}
                index={i}
                cardHovered={isHovered}
                setContactOpened={setContactOpened}
              />
            );
          })}
        </motion.div>
        {/* navbar for sm */}
        <motion.div
          exit={{ y: 25, opacity: 0 }}
          className="hidden sm:fixed top-7 left-7 h-[4vh] sm:flex flex-row bg-pink z-50"
        >
          {nav.map((item, i) => {
            return (
              <NavButton
                key={i}
                text={item.name}
                route={item.route}
                index={i}
                cardHovered={isHovered}
                navHovered={navHovered}
                setNavHovered={setNavHovered}
                setContactOpened={setContactOpened}
              />
            );
          })}
        </motion.div>
        <div className="bg-red-500 h-100vh fixed z-[19] " />
        <div className="min-h-screen flex flex-col  justify-center gap-[42vh] sm:gap-0 sm:justify-normal items-center sm:items-start h-full bg-black py-[120vh] scroll-smooth z-0 overflow-x-hidden ">
          {projects.map((project, i) => {
            return (
              <Card
                key={i}
                index={i}
                project={project}
                setColor={setColor}
                setTextColor={setTextColor}
                setIsHovered={setIsHovered}
              />
            );
          })}
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-black" />
  );
}
