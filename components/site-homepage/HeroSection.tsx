"use client";
import React from 'react';
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const HeroSection: React.FC = () => {
  return (
    <section className="lg:py-16">
    <div className="grid grid-cols-1 sm:grid-cols-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
      >
        <h1 className="dark:text-white light:text-black mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">
            RD REALTY
          </span>
          <br></br>
          <TypeAnimation
            sequence={[
              "DEVELOPMENT",
              500,
              "CORPORATION",
              500,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="dark:text-white light:text-black text-base sm:text-lg mb-6 lg:text-lg">
          A MEMBER OF RD GROUP OF COMPANIES
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="col-span-4 place-self-center mt-4 lg:mt-0"
      >
        <div className=" w-[350px] h-[350px] lg:w-[400px] lg:h-[400px] relative dark:text-white light:text-black">
          <Image rel="preload" fetchPriority="high"
            src="/images/rdrdc.webp"
            alt="hero image"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            width={300}
            height={300}
          />
        </div>
      </motion.div>
    </div>
  </section>
  )
}

export default HeroSection