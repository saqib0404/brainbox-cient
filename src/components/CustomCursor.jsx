import React, { useState, useEffect, useRef } from 'react';

// A custom AnimatedCursor component that replicates the functionality
export const AnimatedCursor = ({
    innerSize = 8,
    outerSize = 16,
    color = '193, 11, 111',
    outerAlpha = 0.2,
    innerScale = 0.7,
    outerScale = 5,
    clickables = []
}) => {
    const [isHovering, setIsHovering] = useState(false);
    const outerCursorRef = useRef(null);
    const innerCursorRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const innerPos = useRef({ x: 0, y: 0 });
    const outerPos = useRef({ x: 0, y: 0 });

    // Handle mouse movement and animation
    useEffect(() => {
        const handleMouseMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);

        let animationFrameId;
        const animate = () => {
            // Smoothly move the inner cursor towards the mouse position
            innerPos.current.x += (mouse.current.x - innerPos.current.x) * 0.1;
            innerPos.current.y += (mouse.current.y - innerPos.current.y) * 0.1;

            // Smoothly move the outer cursor with a trailing effect (adjusted to be subtle)
            outerPos.current.x += (mouse.current.x - outerPos.current.x) * 0.05;
            outerPos.current.y += (mouse.current.y - outerPos.current.y) * 0.05;

            if (innerCursorRef.current) {
                innerCursorRef.current.style.transform = `translate(-50%, -50%) translate3d(${innerPos.current.x}px, ${innerPos.current.y}px, 0)`;
            }

            if (outerCursorRef.current) {
                outerCursorRef.current.style.transform = `translate(-50%, -50%) translate3d(${outerPos.current.x}px, ${outerPos.current.y}px, 0) scale(${isHovering ? outerScale : 1})`;
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [outerScale, isHovering]);

    // Handle hover effects for "clickables"
    useEffect(() => {
        // Collect all elements that are "clickable" based on the provided selectors
        const selectors = clickables.map(c => typeof c === 'string' ? c : c.target).join(',');
        const targets = document.querySelectorAll(selectors);

        const handleMouseEnter = (e) => {
            setIsHovering(true);
            // Here, you could add more logic to apply custom options
            // from the clickables array if needed.
        };

        const handleMouseLeave = () => {
            setIsHovering(false);
        };

        targets.forEach(target => {
            target.addEventListener('mouseenter', handleMouseEnter);
            target.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            targets.forEach(target => {
                target.removeEventListener('mouseenter', handleMouseEnter);
                target.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [clickables]);

    // Render the two cursor elements
    return (
        <>
            <div
                ref={outerCursorRef}
                className="fixed top-0 left-0 pointer-events-none rounded-full"
                style={{
                    width: `${outerSize}px`,
                    height: `${outerSize}px`,
                    backgroundColor: 'transparent',
                    border: `2px solid rgba(${color}, ${outerAlpha})`,
                    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s',
                    zIndex: 9999,
                    opacity: 1
                }}
            />
            <div
                ref={innerCursorRef}
                className="fixed top-0 left-0 pointer-events-none rounded-full"
                style={{
                    width: `${innerSize}px`,
                    height: `${innerSize}px`,
                    backgroundColor: `rgba(${color}, 1)`,
                    transform: `scale(${isHovering ? innerScale : 1})`,
                    transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    zIndex: 9999
                }}
            />
        </>
    );
};