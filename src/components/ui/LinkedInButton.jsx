'use client';
import React, { useState } from 'react';
import { FaLinkedin, FaStar } from 'react-icons/fa';
import { Liquid } from './button-1';

const COLORS = {
  color1: '#FFFFFF',
  color2: '#0077B5', // LinkedIn blue shades
  color3: '#81C7EB',
  color4: '#FCFCFE',
  color5: '#F9F9FD',
  color6: '#B6D7EA',
  color7: '#00598a',
  color8: '#0077B5',
  color9: '#49A0E0',
  color10: '#75B6E6',
  color11: '#00598a',
  color12: '#D6E5FA',
  color13: '#0077B5',
  color14: '#B7D5F2',
  color15: '#C0D5EB',
  color16: '#00598a',
  color17: '#417BB6',
};

const LinkedInButton = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="flex justify-center pointer-events-auto">
      <a
        href="https://www.linkedin.com/in/shafan-manaz-085b34332"
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-block sm:w-36 w-14 h-[2.7em] mx-auto group dark:bg-black bg-white dark:border-white border-black border-2 rounded-lg pointer-events-auto">
        <div className="absolute w-[112.81%] h-[128.57%] top-[8.57%] left-1/2 -translate-x-1/2 filter blur-[19px] opacity-70">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9] filter blur-[6.5px]"></span>
          <div className="relative w-full h-full overflow-hidden rounded-lg">
            <Liquid isHovered={isHovered} colors={COLORS} />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[92.23%] h-[112.85%] rounded-lg bg-[#010128] filter blur-[7.3px]"></div>
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <span className="absolute inset-0 rounded-lg bg-[#d9d9d9]"></span>
          <span className="absolute inset-0 rounded-lg bg-black"></span>
          <Liquid isHovered={isHovered} colors={COLORS} />
          {[1, 2, 3, 4, 5].map((i) => (
            <span
              key={i}
              className={`absolute inset-0 rounded-lg border-solid border-[3px] border-gradient-to-b from-transparent to-white mix-blend-overlay filter ${i <= 2 ? 'blur-[3px]' : i === 3 ? 'blur-[5px]' : 'blur-[4px]'}`}></span>
          ))}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[70.8%] h-[42.85%] rounded-lg filter blur-[15px] bg-[#006]"></span>
        </div>
        <button
          className="absolute inset-0 rounded-lg bg-transparent cursor-pointer pointer-events-auto"
          aria-label="LinkedIn Link"
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          <span className="flex items-center justify-between px-4 gap-2 rounded-lg group-hover:text-cyan-400 text-white text-xl font-semibold tracking-wide whitespace-nowrap">
            <FaStar className="group-hover:fill-cyan-400 fill-white w-6 h-6 flex-shrink-0 sm:inline-block hidden" />
            <FaLinkedin className="sm:hidden inline-block group-hover:fill-cyan-400 fill-white w-6 h-6 flex-shrink-0" />
            <span className="sm:inline-block hidden">LinkedIn</span>
          </span>
        </button>
      </a>
    </div>
  );
};
export default LinkedInButton;
