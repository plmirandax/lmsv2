'use client'
import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

const achievementsList = [
  {
    metric: "Properties",
    value: "280",
    postfix: " +",
  },
  {
    prefix: "",
    metric: "Satisfied Tenants",
    value: "213,000",
  },
  {
    metric: "Awards",
    value: "28",
  },
  {
    metric: "Years in service.",
    value: "39",
  },
];

const AchievementsSection:React.FC = () => {
  const [key, setKey] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(Date.now());
    }, 8000); // Change key every 2 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <div className="dark:text-white light:text-black py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-[#33353F] sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0 dark:text-white light:text-black"
            >
              <h2 className="dark:text-white light:text-black text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <CountUp
                   key={key}
                   end={parseInt(achievement.value)}
                   duration={5} // Animation duration in seconds
                   separator=","
                   className="dark:text-white light:text-black text-4xl font-bold"
                />
                {achievement.postfix}
              </h2>
              <p className="dark:text-white light:text-black text-base">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection;