// import { useEffect, useState, useRef } from "react";

// export default function useScrollAnimation() {
//   const [isVisible, setIsVisible] = useState(false);
//   const elementRef = useRef();

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setIsVisible(true);
//           observer.unobserve(entry.target);
//         }
//       },
//       { threshold: 0.3 }
//     );

//     if (elementRef.current) {
//       observer.observe(elementRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return [elementRef, isVisible];
// }
