import {
  useScroll,
  useSpring,
  useTransform,
  motion,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { FC, useEffect } from "react";

interface indexProps {
  isHovered: boolean;
}

const index: FC<indexProps> = ({ isHovered }) => {
  const { scrollYProgress } = useScroll();

  const s = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [1, 0.8, 0.8, 1]);

  const translateP = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    ["0px", "-50px", "-50px", "0px"]
  );
  const opacityP = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    ["1", "0", "0", "1"]
  );

  const scale = useSpring(s, {
    bounce: 0,
    mass: 1,
    damping: 25,

    restSpeed: 0,
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { stiffness: 20 });
  const y = useSpring(mouseY, { stiffness: 20 });

  const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: any) => {
    const xPct = e.clientX / window?.innerWidth - 0.5;
    const yPct = e.clientY / window?.innerHeight - 0.5;
    //   console.log(xPct, xPct);
    x.set(xPct);
    y.set(yPct);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const transformText = useMotionTemplate` translateX(-50%) translateY(-50%)  translateZ(100px) scale(${scale})`;
  const transformP = useMotionTemplate` translateX(-50%) translateY(-50%)  translateZ(50px) translateZ(${translateP}) scale(${scale})`;

  return (
    <motion.div
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="h-[100vh]"
    >
      <motion.h1
        initial={{ y: -25, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { type: "linear", delay: 0.2, duration: 1 },
        }}
        style={{
          transformStyle: "preserve-3d",
          transform: transformText,
          color: "#Ffffff",
          opacity: window?.innerWidth > 640 ? 100 : opacityP,
        }}
        animate={{
          color: isHovered ? "#c7c7c7" : "#Ffffff",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`leading-[8vh] text-center text-[9vh] z-20 drop-shadow-md absolute top-1/2 left-1/2`}
      >
        AWAB SAGHIR
      </motion.h1>
      <motion.p
        initial={{ y: -25, opacity: 0 }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: { type: "linear", delay: 0.4, duration: 1 },
        }}
        style={{
          transformStyle: "preserve-3d",
          transform: transformP,
          opacity: opacityP,
        }}
        animate={{
          color: isHovered ? "#000000" : "#Ffffff",
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`sm:block hidden text-[3vh] z-10 drop-shadow-md absolute top-[58%] left-1/2 `}
      >
        Web-Developer • Student
      </motion.p>
    </motion.div>
  );
};

export default index;
