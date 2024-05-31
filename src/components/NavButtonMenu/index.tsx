"use client";
import { FC, useEffect, useRef, useState } from "react";
import { animate, motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface IndexProps {
  translate: boolean;
  setTranslate: any;
  text: string;
  index: number;
  cardHovered: any;
  route: string;
  setContactOpened: any;
}

const Index: FC<IndexProps> = ({
  translate,
  setTranslate,
  text,
  index,
  cardHovered,
  setContactOpened,
}) => {
  const [menuText, setMenuText] = useState("Menu");
  const [hover, setHover] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const zIndex = (3 - 1 - index) * 10;

  useEffect(() => {
    console.log(translate, "IT SHOULD TRANSLATE");
    if (!translate) {
      setMenuText("X");
    } else {
      setMenuText("Menu");
    }
  }, [translate]);

  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { type: "linear", duration: 0.5 },
      }}
      onTouchStart={async () => {
        index === 0 && setTranslate((prev: boolean) => !prev);
        setHover(true);
        // setNavHovered(true);
      }}
      onTouchEnd={() => setHover(false)}
      ref={ref}
      onClick={async () => {
        const transition = document.getElementById(
          "transitionDiv"
        ) as HTMLDivElement;
        if (!translate) {
          if (text === "Projects") {
            window.scrollTo({ top: 1000, left: 0, behavior: "smooth" });
          }
          if (text === "Contact") {
            setContactOpened(true);
          }
          if (text === "Information") {
            await animate(
              [transition],
              {
                top: "0vh",
              },
              { duration: 1, ease: [1, 0.15, 0, 0.85] }
            );
            router.push("/Info");
          }
        }
      }}
      animate={{ translateX: translate ? index * -73 : 0 }}
      transition={{ duration: 1, type: "spring", ease: [0.5, 0, 0.75, 0] }}
      className={`rounded-full h-min relative mr-2 cursor-pointer  
      ${translate ? "w-[71px]" : "w-full"}

        text-[1.5vh] h-full text-white z-${zIndex}  backdrop-blur-md ${
        hover || cardHovered || (index === 0 && !translate)
          ? !cardHovered
            ? "bg-[#ffffff] opacity-100"
            : "bg-[#ffffff] bg-opacity-50"
          : "bg-[#2f2f2f] bg-opacity-50"
      } transition-colors ease-in-out duration-500 px-[16px] py-[8px]`}
    >
      <motion.h1
        whileHover={{ color: "#000000" }}
        animate={{
          color:
            hover || cardHovered || (index === 0 && !translate)
              ? "#000000"
              : "#ffffff",
          opacity: translate && index !== 0 ? 0 : 1,
          transition: { duration: 0.5, ease: "easeOut", type: "spring" },
        }}
      >
        {text === "Menu" ? menuText : text}
      </motion.h1>
    </motion.div>
  );
};

export default Index;
