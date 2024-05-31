import { FC, useRef, useState } from "react";
import { motion } from "framer-motion";

interface IndexProps {
  text: string;
  type: string;
  value: any;
  setValue: any;
}

const InputC: FC<IndexProps> = ({ text, type, value, setValue }) => {
  const [isFocused, setIsFocused] = useState<Boolean>();
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full relative">
      <motion.h1
        animate={{
          transform:
            isFocused || ref.current?.value.trim() != ""
              ? "translateY(-30px)"
              : "translateY(7px)",
          fontSize:
            isFocused || ref.current?.value.trim() != "" ? "120%" : "170%",
          opacity:
            isFocused || ref.current?.value.trim() != "" ? "50%" : "100%",
        }}
        className="absolute text-[3vh] text-left text-black pointer-events-none"
      >
        {text}
      </motion.h1>
      <input
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        ref={ref}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);
        }}
        type={type}
        className={`h-[5.5vh] text-[2.5vh] bg-transparent outline-none border-opacity-30 border-b-[1px] border-separate focus:border-opacity-100 duration-200  border-black w-full`}
      />
    </div>
  );
};

export default InputC;
