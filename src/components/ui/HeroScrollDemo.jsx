"use client";
import React from "react";
import { ContainerScroll } from "./container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-32">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-gradient-warm">
                Scroll Animations
              </span>
            </h1>
          </>
        }
      >
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2420&auto=format&fit=crop"
          alt="hero"
          className="mx-auto rounded-2xl object-cover h-full object-left-top w-full pointer-events-auto"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
