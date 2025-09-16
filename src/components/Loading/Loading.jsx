import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loading = () => {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });
    
    // Animate the circles
    tl.to('.loading-circle-1', {
      duration: 0.8,
      scale: 1.2,
      opacity: 1,
      fill: '#6366f1',
      ease: 'power2.inOut',
      stagger: 0.2
    })
    .to('.loading-circle-2', {
      duration: 0.8,
      scale: 1.2,
      opacity: 1,
      fill: '#8b5cf6',
      ease: 'power2.inOut',
      stagger: 0.2
    }, '-=0.6')
    .to('.loading-circle-3', {
      duration: 0.8,
      scale: 1.2,
      opacity: 1,
      fill: '#ec4899',
      ease: 'power2.inOut',
      stagger: 0.2
    }, '-=0.6')
    .to('.loading-circle', {
      duration: 0.8,
      scale: 1,
      opacity: 0.7,
      fill: '#3b82f6',
      ease: 'power2.inOut',
      stagger: 0.2
    }, '+=0.2');
    
    // Animate the text
    gsap.to(textRef.current, {
      duration: 1,
      opacity: 0.6,
      scale: 1.05,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });
    
    // Background animation
    gsap.to(containerRef.current, {
      duration: 10,
      backgroundPosition: '100% 0%',
      repeat: -1,
      ease: 'none'
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 bg-[length:200%_100%]"
    >
      <svg
        ref={svgRef}
        className="w-48 h-48 mb-8"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated circles */}
        <circle
          className="loading-circle loading-circle-1"
          cx="40"
          cy="100"
          r="15"
          fill="#3b82f6"
          opacity="0.7"
        />
        <circle
          className="loading-circle loading-circle-2"
          cx="100"
          cy="100"
          r="15"
          fill="#3b82f6"
          opacity="0.7"
        />
        <circle
          className="loading-circle loading-circle-3"
          cx="160"
          cy="100"
          r="15"
          fill="#3b82f6"
          opacity="0.7"
        />
        
        {/* Outer ring */}
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="2"
        />
        
        {/* Animated arc */}
        <path
          className="loading-arc"
          d="M100,20 A80,80 0 0,1 180,100"
          fill="none"
          stroke="#6366f1"
          strokeWidth="3"
          strokeDasharray="330"
          strokeDashoffset="330"
        />
      </svg>
      
      <h1 
        ref={textRef}
        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
      >
        Loading...
      </h1>
      
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
        .loading-arc {
          animation: dash 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Loading;