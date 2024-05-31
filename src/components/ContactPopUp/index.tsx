"use client";
import { FC, useRef, useState } from "react";
import InputC from "./Input/";
import { motion } from "framer-motion";
import { RxCross1 } from "react-icons/rx";
import Tag from "./Chip";
import { CgArrowLongRight } from "react-icons/cg";
import emailjs from "@emailjs/browser";
import { setTimeout } from "timers";

interface IndexProps {
  contactOpen: boolean;
  setContactOpened: any;
}

const ContactPopUp: FC<IndexProps> = ({ contactOpen, setContactOpened }) => {
  const [isFocusedMessage, setIsFocusedMessage] = useState<boolean>();
  const [submitHovered, setSubmitHovered] = useState<boolean>();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [subject, setSubject] = useState<Array<string>>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const [errMessage, setErrMessage] = useState<string>("");

  const messageref = useRef<HTMLTextAreaElement>(null);

  const SubjectChips = [
    " Project",
    " Freelance",
    " Job",
    " Commission",
    " Chat",
    " Collaboration",
    " Help",
    " Other",
  ];

  const onSubmit = async () => {
    const showERR = (message?: string) => {
      message ? setErrMessage(message) : setErrMessage("");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    };
    const showSUCC = () => {
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    };
    const clearFields = () => {
      setName("");
      setEmail("");
      setMessage("");
      setSubject([]);
    };

    const data = {
      name: name,
      email: email,
      message: message,
      subject: subject,
    };
    if (message != "" && email != "" && name != "") {
      try {
        setButtonDisable(true);
        const response = await emailjs.send(
          process.env.NEXT_PUBLIC_SERVICE_ID!,
          process.env.NEXT_PUBLIC_TEMPLETE_ID!,
          data,
          process.env.NEXT_PUBLIC_PUBLIC_KEY!
        );
        console.log("SUCCESS: ", response.status);
        if (response.status === 200) {
          showSUCC();
          clearFields();
        }
      } catch (error) {
        console.log("ERROR", error);
        showERR();
        clearFields();
      }
    } else {
      showERR("please enter all the fields.");
    }
    setButtonDisable(false);
  };

  return (
    <motion.div
      animate={{
        transform: contactOpen ? "translateX(-100%)" : "translate(100%)",
        transition: { duration: 1, ease: [0.83, 0, 0.17, 1] },
      }}
      className="shadow-lg  shadow-black fixed z-[200] h-[100vh] w-[100vw] sm:w-[70vh]  left-[100%] bg-white bg-opacity-70
     backdrop-blur-md pt-[10vh] sm:pt-[7%] flex flex-col p-[30px] text-center items-center gap-[6%] tracking-tight"
    >
      {success && (
        <p
          className={`text-green-700 absolute top-7 left-1/2 translate-x-[-50%]`}
        >
          Message was sent successfully.
        </p>
      )}
      {error && (
        <p
          className={`text-red-500 absolute top-7 left-1/2 translate-x-[-50%]`}
        >
          {errMessage ? errMessage : "Something went wrong try again later."}
        </p>
      )}
      <RxCross1
        onClick={() => {
          setContactOpened(false);
        }}
        size={40}
        className="absolute cursor-pointer top-7 right-7 hover:opacity-80 transition-opacity duration-200"
      />
      {/* NAME INPUT */}

      <InputC text="your name" type="text" value={name} setValue={setName} />

      {/* EMAIL INPUT */}

      <InputC
        text="your email"
        type="email"
        value={email}
        setValue={setEmail}
      />

      {/* SUBJECT CHIPS */}
      <div className="w-full">
        <h1 className="text-[3vh] text-left mb-4 text-black pointer-events-none">
          Subject
        </h1>
        <div className="h-[17vh] sm:h-[10vh] flex flex-wrap gap-1 sm:gap-4 align-middle justify-items-center">
          {SubjectChips.map((text: any, i) => {
            return (
              <Tag
                text={text}
                setSubject={setSubject}
                key={i}
                subject={subject}
              />
            );
          })}
        </div>
      </div>

      {/* MESSAGE INPUT */}
      <div className="w-full mt-5 sm:m-0  relative">
        <motion.h1
          animate={{
            transform:
              isFocusedMessage || messageref.current?.value.trim() != ""
                ? "translateY(-30px)"
                : "translateY(7px)",
            fontSize:
              isFocusedMessage || messageref.current?.value.trim() != ""
                ? "120%"
                : "170%",
            opacity:
              isFocusedMessage || messageref.current?.value.trim() != ""
                ? "50%"
                : "100%",
          }}
          className="absolute  text-[3vh] text-left text-black font pointer-events-none"
        >
          Message
        </motion.h1>
        <textarea
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          ref={messageref}
          onFocus={() => {
            setIsFocusedMessage(true);
          }}
          onBlur={() => {
            setIsFocusedMessage(false);
          }}
          className={`h-[11vh] text-[2.5vh]  bg-transparent outline-none border-opacity-30 border-separate focus:border-opacity-100 duration-200 border-b-[1px] border-black w-full`}
        />
      </div>
      {/* submit button  */}
      <button
        disabled={buttonDisable}
        onClick={onSubmit}
        onMouseEnter={() => {
          setSubmitHovered(true);
        }}
        onMouseLeave={() => {
          setSubmitHovered(false);
        }}
        className={`rounded-full h-min cursor-pointer w-fit text-[2vh]  text-white backdrop-blur-md ${
          !buttonDisable
            ? !submitHovered
              ? "bg-[#000000] bg-opacity-90"
              : "bg-[#222222] bg-opacity-60"
            : "cursor-not-allowed bg-gray-500"
        } transition-colors ease-in-out duration-300 px-[14px] py-[8px]`}
      >
        Submit
      </button>

      {/* Email and Instagram Arrow Buttons */}
      <motion.a
        initial={{ x: -55, opacity: 0 }}
        whileInView={{
          x: 0,
          opacity: 1,
          transition: {
            type: "linear",
            duration: 0.5,
            ease: [0.83, 0, 0.17, 1],
          },
        }}
        onClick={(e) => {
          window.location.href = "mailto:awabsaghir@gmail.com";
          e.preventDefault();
        }}
        className="absolute bottom-4 left-7"
      >
        <div className="flex flex-row  items-center cursor-pointer hover:opacity-50 transition duration-500 ">
          <CgArrowLongRight color="black" size={25} />
          <h1 className="text-black text-[20px] pl-2">email</h1>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default ContactPopUp;
