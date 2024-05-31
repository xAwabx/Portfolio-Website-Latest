import { FC } from "react";
import { CgArrowLongRight } from "react-icons/cg";
import { motion } from "framer-motion";

interface IndexProps {
  text: string;
  pos?: number[];
  link: string;
  i: number;
}

const Index: FC<IndexProps> = ({ text, pos, link, i }) => {
  return (
    <motion.a
      initial={{ y: -25, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { type: "linear", duration: 0.5 },
      }}
      href={link}
      target="_blank"
      style={
        {
          // bottom: pos && `${pos![1]}px`,
          // left: pos && `${pos![0] + 15}px`,
        }
      }
      className={`relative`}
    >
      <div className="flex flex-row  items-center cursor-pointer hover:opacity-50 transition duration-500 ">
        <CgArrowLongRight color="white" size={20} className="hidden sm:block" />
        <h1 className="text-white text-[14px] pl-2">{text}</h1>
      </div>
    </motion.a>
  );
};

export default Index;
