import StaggerDemo from "@/components/gsap-basics/StaggerDemo";

export default function Page() {
    return (
        <div
            className="relative min-h-screen w-full overflow-hidden"
            style={{ background: '#080810' }}
        >
            {/* large emerald orb — top left */}
            <div
                className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            {/* blue orb — bottom right */}
            <div
                className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }}
            />
            {/* subtle grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)',
                    backgroundSize: '48px 48px',
                }}
            />

            <div className="relative z-10 w-full flex flex-col items-center px-6 pt-20 pb-24">
                <StaggerDemo />
            </div>
        </div>
    );
};