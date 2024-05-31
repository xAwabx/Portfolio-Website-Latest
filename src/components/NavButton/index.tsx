import { FC, useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValueEvent, useScroll } from "framer-motion";
import { useRouter } from "next/navigation";

interface IndexProps {
  text: string;
  index: number;
  cardHovered: any;
  navHovered: any;
  setNavHovered: any;
  route: string;
  setContactOpened: any;
}

const Index: FC<IndexProps> = ({
  text,
  index,
  cardHovered,
  navHovered,
  setNavHovered,
  setContactOpened,
}) => {
  const [hover, setHover] = useState(false);
  const { scrollYProgress } = useScroll();
  const [translate, setTranslate] = useState(false);
  const zIndex = (3 - 1 - index) * 10;
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    const previous = scrollYProgress.getPrevious();

    if (current > previous! && current > 0.02) {
      setTranslate(true);
      setNavHovered(false);
    } else {
      setTranslate(false);
    }
  });
  useEffect(() => {
    navHovered && setTranslate(false);
  }, [navHovered]);

  return (
    <motion.div
      initial={{ y: -25, opacity: 0 }}
      whileInView={{
        y: 0,
        opacity: 1,
        transition: { type: "linear", duration: 0.5 },
      }}
      onMouseEnter={() => {
        setHover(true);
        setNavHovered(true);
      }}
      onMouseLeave={() => setHover(false)}
      ref={ref}
      onClick={async () => {
        const transition = document.getElementById(
          "transitionDiv"
        ) as HTMLDivElement;

        if (text === "Back") {
          router.push("/");
        }
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
      }}
      animate={{
        translateX: translate ? index * -83 : 0,
      }}
      transition={{ duration: 1, type: "spring", ease: [0.5, 0, 0.75, 0] }}
      className={`rounded-full h-min relative mr-2 cursor-pointer  
      ${translate && text != "Back" ? "w-[85.1px]" : "w-full"}
        text-[14px] min-h-[37px] text-white z-${zIndex}  backdrop-blur-md ${
        hover || cardHovered
          ? !cardHovered
            ? "bg-[#ffffff] opacity-100"
            : "bg-[#ffffff] bg-opacity-50"
          : "bg-[#2f2f2f] bg-opacity-50"
      } transition-colors ease-in-out duration-500 px-[16px] py-[8px]`}
    >
      <motion.h1
        whileHover={{ color: "#000000" }}
        animate={{
          color: hover || cardHovered ? "#000000" : "#ffffff",
          opacity: translate && index !== 0 ? 0 : 1,
          transition: { duration: 0.5, ease: "easeOut", type: "spring" },
        }}
      >
        {text}
      </motion.h1>
    </motion.div>
  );
};

export default Index;
