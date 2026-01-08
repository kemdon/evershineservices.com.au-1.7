"use client";

import { useEffect, useRef, useState } from "react";

export type HomeStat = {
  icon?: string | null;
  value: number;
  suffix?: string | null;
  label: string;
};

const defaultStats: HomeStat[] = [
  { icon: "📊", value: 500, suffix: "+", label: "Leads per Week (AVG)" },
  { icon: "⭐", value: 100, suffix: "%", label: "Satisfaction Rate" },
  { icon: "👥", value: 2000, suffix: "+", label: "Customers Each Year" },
  { icon: "🏆", value: 10, suffix: "+", label: "Years of Experience" },
];

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 2000;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-white">
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function HomeStats({ stats = defaultStats }: { stats?: HomeStat[] | null }) {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {(stats?.length ? stats : defaultStats).map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-105 transition-transform duration-300"
            >
              {/* Icon */}
              <div className="text-5xl mb-4 filter drop-shadow-lg">{stat.icon}</div>

              {/* Counter */}
              <CountUp end={stat.value} suffix={stat.suffix || ""} />

              {/* Label */}
              <p className="text-white/90 font-medium mt-3 text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
