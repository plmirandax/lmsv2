"use client";
import React, { useState } from "react";
import GithubIcon from '../../public/gmail.svg'
import LinkedinIcon from "../../public/messenger.svg";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      email: (e.target as any).email.value,
      subject: (e.target as any).subject.value,
      message: (e.target as any).message.value,
    };
    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/send";

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "POST",
      // Tell the server we're sending JSON.
      headers: {
        "Content-Type": "application/json",
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);
    const resData = await response.json();

    if (response.status === 200) {
      console.log("Message sent.");
      setEmailSubmitted(true);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-xl font-bold dark:text-white light:text-black my-2">
          Contact Us
        </h5>
        <p className="dark:text-white light:text-black mb-4 max-w-md">
          {" "}
          Exploring real estate opportunities? Don&apos;t hesitate to reach out to us at RD Realty.
          Whether you&apos;re curious about buying, selling, or renting properties,
          we&apos;re here to provide guidance and support every step of the way.
        </p>
        <div className="socials flex flex-row gap-2">
          <Link rel="preload" href="github.com">
            <Image src={GithubIcon} alt="Github Icon" width={50} height={50} />
          </Link>
          <Link rel="preload" href="https://www.facebook.com/RDRealtyGensan">
            <Image src={LinkedinIcon} alt="Linkedin Icon" width={50} height={50} />
          </Link>
        </div>
      </div>
      <div>
        {emailSubmitted ? (
          <p className="text-blue-500 text-sm mt-2">
            Email sent successfully!
          </p>
        ) : (
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="dark:text-white light:text-black block mb-2 text-sm font-medium"
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className=" border border-[#33353F] placeholder-[#9CA2A9] dark:text-white light:text-black text-sm rounded-lg block w-full p-2.5"
                placeholder="your@email.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="dark:text-white light:text-black block text-sm mb-2 font-medium"
              >
                Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className=" border border-[#33353F] placeholder-[#9CA2A9] dark:text-white light:text-black text-sm rounded-lg block w-full p-2.5"
                placeholder="Request for site visit."
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="dark:text-white light:text-black block text-sm mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="border border-[#33353F] placeholder-[#9CA2A9] dark:text-white light:text-black text-sm rounded-lg block w-full p-2.5"
                placeholder="Your inquiry here."
              />
            </div>
            <Button type="submit"
              className="bg-primary-500 hover:bg-blue-600 dark:text-white light:text-black font-medium py-2.5 px-5 rounded-lg w-full"
              variant="outline">
                Submit message
              </Button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
