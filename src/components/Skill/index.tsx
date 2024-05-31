import { FC, useState } from "react";
import { motion } from "framer-motion";

interface indexProps {
  name: string;
  percentage: number;
  setSkillHovered: any;
  SkillHovered: any;
}

const index: FC<indexProps> = ({
  name,
  percentage,
  SkillHovered,
  setSkillHovered,
}) => {
  const [hover, setHover] = useState(false);
  const maxWidth = 95;
  return (
    <div
      onMouseEnter={() => {
        setSkillHovered(true);
        setHover(true);
      }}
      onMouseLeave={() => {
        setSkillHovered(false);
        setHover(false);
      }}
      className={`flex flex-row ${
        SkillHovered && !hover ? "opacity-50" : "opacity-100"
      } transition-opacity duration-300 sm:gap-[2vw] justify-between sm:justify-normal  sm:w-fit items-center mt-3 `}
    >
      <h1 className=" text-white text-[2.6vh] sm:text-[4vh] cursor-default">
        {name}
      </h1>
      <div />
      {/* progress bar */}
      <div>
        <div className=" w-[40vw] sm:w-[25vw] relative bg-red-500 rounded-lg h-[4vh] cursor-pointer">
          <div className="bg-black absolute top-1/2 translate-y-[-50%] h-[2.5vh] mx-[2.5%] w-[95%] bg-opacity-20 rounded-lg " />
          <motion.div
            initial={{ width: "0", scale: 1, translateY: "-50%" }}
            animate={{
              width: `${95 * (percentage / 100)}%`,
              transition: { delay: 1.5, duration: 1, ease: [0.65, 0, 0.35, 1] },
            }}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.5, ease: [0.65, 0, 0.35, 1] },
            }}
            className="bg-black absolute top-1/2 translate-y-[-50%] h-[2.5vh] mx-[2.5%] rounded-lg shadow-sm shadow-black"
          />
        </div>
      </div>
    </div>
  );
};

export default index;
