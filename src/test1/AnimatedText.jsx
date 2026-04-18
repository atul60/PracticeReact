import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

const AnimatedText = ({
    children,
    tag: Tag = 'h2',
    type = 'chars',
    y = 30,
    className = '',
}) => {
    const elRef = useRef();

    useEffect(() => {
        elRef.current.style.wordBreak = 'keep-all';
        elRef.current.style.overflowWrap = 'normal';

        const split = SplitText.create(elRef.current, { type });

        gsap.from(split[type], {
            y,
            autoAlpha: 0,
            stagger: 0.05,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: elRef.current,
                start: 'top 85%',
                toggleActions: 'play none none none',
            },
        });

        return () => {
            gsap.killTweensOf(elRef.current);
            split.revert();
        };
    }, [type, y]);

    return (
        <Tag ref={elRef} className={className}>
            {children}
        </Tag>
    );
};

export default AnimatedText;
