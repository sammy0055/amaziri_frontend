"use client";
import React, { useEffect } from "react";

const Clock = ({ color = "black", className = "" }) => {
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const secondDeg = now.getSeconds() * 6;
      const minuteDeg = now.getMinutes() * 6 + now.getSeconds() * 0.1;
      const hourDeg = ((now.getHours() % 12) + now.getMinutes() / 60) * 30;

      document
        .getElementById("second")!
        .setAttribute("transform", `rotate(${secondDeg}, 50, 50)`);
      document
        .getElementById("minute")!
        .setAttribute("transform", `rotate(${minuteDeg}, 50, 50)`);
      document
        .getElementById("hour")!
        .setAttribute("transform", `rotate(${hourDeg}, 50, 50)`);
    };

    setInterval(updateClock, 1000);
    updateClock();
  }, []);

  return (
    <svg
      id="clock"
      viewBox="0 0 100 100"
      width="50"
      height="50"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke={color}
        strokeWidth="4"
      />
      <line
        id="hour"
        x1="50"
        y1="50"
        x2="50"
        y2="30"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        id="minute"
        x1="50"
        y1="50"
        x2="50"
        y2="20"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <line
        id="second"
        x1="50"
        y1="50"
        x2="50"
        y2="15"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="1" fill={color} />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fill={color}
      >
        12
      </text>
    </svg>
  );
};

export default Clock;
