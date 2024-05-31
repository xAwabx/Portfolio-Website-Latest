import { FC } from "react";
import { motion } from "framer-motion";

interface indexProps {
  text: string;
}

const index: FC<indexProps> = ({ text }) => {
  return (
    <div className="flex flex-col">
      <h1 className="text-white text-[6vh] flex-1">{text}</h1>
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
        className=" bg-red-600 h-[2px] top-[45vh] left-[2vw]"
      />
    </div>
  );
};

export default index;
