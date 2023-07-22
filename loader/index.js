import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const Loader = () => {
  const loaderRef = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const loaderElement = loaderRef.current;

    // GSAP Animation
    gsap.set(loaderElement, { x: "-100%", rotate: -90 });

    gsap.to(loaderElement, {
      x: "0%",
      rotate: 0,
      duration: 2,
      ease: "elastic.out(1, 0.3)",
      onComplete: () => {
        gsap.to(loaderElement, {
          x: "0%",
          rotate: 0,
          duration: 0.7,
          ease: "none",
          onComplete: () => {
            setAnimationComplete(true); // Set animation completion state to true
          },
        });
      },
    });
  }, []);

  return (
    <div className="center-container">
      <div className="page-loader">
        <div className="loader" ref={loaderRef}>
          <Image
            src="/logo-no-background.png"
            alt="logo"
            width={250}
            height={150}
          />
        </div>
      </div>
      {animationComplete && (
        <div className="copyright">
          <p>Copyright reserved by DA.</p>
        </div>
      )}
    </div>
  );
};

export default Loader;
