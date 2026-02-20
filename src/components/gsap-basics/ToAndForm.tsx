import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const ToAndForm = () => {
const containerRef = useRef<HTMLDivElement>(null);
const ctx= useRef<gsap.Context | null>(null);

const runAnimation = () => {
    if(ctx.current){
        ctx.current.revert();
    }
    ctx.current = gsap.context(() => {
        gsap.from('.from-box', {
            x: -200,
            y: 100,
            scale: 0,
            opacity: 0,
            duration: 1.5,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.5,
        });
        gsap.to('.to-box', {
            x: 300,
            rotation: 360,
            backgroundColor: '#ef4444',
            scale: 1.2,
            opacity: 0.5,
            duration: 2,
            ease: 'power2.inOut',
            repeat: -1,
            yoyo: true,
        });
    }, containerRef);

}   

useGSAP(() => {
    runAnimation();
},{scope: containerRef} );

    return (
        <div>
           <div ref={containerRef} className="flex gap-10">
            <div className="from-box w-20 h-20 bg-blue-500 rounded-lg"></div>
            <div className="to-box w-20 h-20 bg-green-500 rounded-lg"></div>
           </div>

        </div>
    );
};

export default ToAndForm;