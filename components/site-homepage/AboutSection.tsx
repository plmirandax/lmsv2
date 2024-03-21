"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from './TabButton';

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2 dark:text-white light:text-black">
        <li>We are committed to a sustainable and profitable real estate development and business transactions through fostering a mutually beneficial relationship with our stakeholders.</li>
        <li> We aim to uplift the quality of life of the communities where we operate and glorify God in everything we do.</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2 dark:text-white light:text-black">
        <li>A diversified real estate company delivering maximum value to customers and stockholders guided by the highest ethical standards of practice and strong faith in God.</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2 dark:text-white light:text-black">
        <li>Integrity • Innovation • Excellence • Interdependence • Godliness</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  const selectedTab = TAB_DATA.find((t) => t.id === tab);
  const selectedTabContent = selectedTab ? selectedTab.content : null;

  return (
    <section className="dark:text-white light:text-black" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 dark:text-white light:text-black">
      <Image rel="preload" fetchPriority="high" src="/images/rd.webp" alt="About us" width={700} height={700} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full dark:text-white light:text-black">
          <h2 className="text-4xl font-bold dark:text-white light:text-black mb-4">ABOUT US</h2>
          <p className="text-base lg:text-lg mb-2.5 dark:text-white light:text-black">
          RD Realty Development Corporation was established & registered
          in June 24, 1985 and is one of the subsidiaries of RD Group of 
          Companies under the management and direction of Mr. Roy C. Rivera.
          </p>
          <p className="text-base lg:text-lg mb-2.5 dark:text-white light:text-black">
          RD Realty Development Corporation is a member of RD Group of Companies
          that engaged in the development of real estate projects, property management,
          and construction of many of the company’s future developments. It has grown
           into a very integrated company providing employment to over 250 people.
          </p>
          <p className="text-base lg:text-lg mb-2.5 dark:text-white light:text-black">
           RD Realty Development Corporation is the property holding firm of the Realty
           Development Group. It is the largest property owner and considered as the 
           trendsetter in the leasing industry in General Santos City which today 
           operates a growing inventory of 45,000 sqm leasable building spaces across
           the country and overseas.
          </p>
          <div className="flex flex-row justify-center mt-8 dark:text-white light:text-black">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              MISSION{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              VISION{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              CORE VALUES{" "}
            </TabButton>
          </div>
          <div className="mt-8 dark:text-white light:text-black">
            {selectedTabContent}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;