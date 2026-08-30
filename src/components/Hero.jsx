import { useEffect, useRef } from 'react';
import { ArrowDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { prefersStatic } from '../hooks/useTilt';
import {
    RESUME_URL,
    GITHUB_URL,
    LINKEDIN_URL,
    MAIL_COMPOSE_URL,
} from '../config';

export default function Hero() {
    const imgRef = useRef(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = imgRef.current;
        if (!el) return;
        const t = setTimeout(() => el.classList.add('visible'), 200);
        return () => clearTimeout(t);
    }, []);

    /* Parallax depth field: publish the cursor's offset from centre as CSS vars
     (-0.5 … 0.5) and let each .depth-* layer multiply it by its own factor. */
    useEffect(() => {
        const el = sectionRef.current;
        if (!el || prefersStatic()) return;

        let frame = null;

        const onMove = (e) => {
            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const rect = el.getBoundingClientRect();
                el.style.setProperty(
                    '--px',
                    (e.clientX - rect.left) / rect.width - 0.5
                );
                el.style.setProperty(
                    '--py',
                    (e.clientY - rect.top) / rect.height - 0.5
                );
            });
        };

        const onLeave = () => {
            if (frame) cancelAnimationFrame(frame);
            el.style.setProperty('--px', 0);
            el.style.setProperty('--py', 0);
        };

        el.addEventListener('mousemove', onMove);
        el.addEventListener('mouseleave', onLeave);

        return () => {
            el.removeEventListener('mousemove', onMove);
            el.removeEventListener('mouseleave', onLeave);
            if (frame) cancelAnimationFrame(frame);
        };
    }, []);

    const scrollTo = (id) =>
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

    return (
        <section
            id="hero"
            ref={sectionRef}
            className="relative min-h-screen flex items-center overflow-hidden bg-brand-bg scene"
        >
            {/* Ambient gradient orbs — the deepest layer, drifts against the cursor */}
            <div
                className="orb orb-drift depth-layer depth-far"
                style={{
                    width: 520,
                    height: 520,
                    background: 'rgba(255,90,31,0.20)',
                    top: '-14%',
                    left: '-8%',
                }}
            />
            <div
                className="orb orb-drift depth-layer depth-far"
                style={{
                    width: 400,
                    height: 400,
                    background: 'rgba(120,90,255,0.13)',
                    bottom: '-10%',
                    right: '-6%',
                    animationDelay: '5s',
                }}
            />

            {/* Background grid pattern */}
            <div
                className="absolute inset-0 opacity-5 depth-layer depth-far"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,90,31,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,90,31,0.3) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Geometric decorative elements */}
            <div className="absolute top-20 right-[5%] w-72 h-72 md:w-96 md:h-96 pointer-events-none depth-layer depth-mid">
                <div
                    className="geo-line absolute inset-0 rotate-12"
                    style={{
                        border: '1px solid rgba(255,90,31,0.12)',
                        borderRadius: '8px',
                    }}
                />
                <div
                    className="geo-line absolute inset-4 rotate-6"
                    style={{
                        border: '1px solid rgba(255,90,31,0.08)',
                        borderRadius: '8px',
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-brand-orange rounded-full shadow-[0_0_30px_10px_rgba(255,90,31,0.15)]" />
            </div>

            {/* Floating dots */}
            <div
                className="absolute top-40 left-10 w-2 h-2 bg-brand-orange rounded-full opacity-40 animate-ping"
                style={{ animationDuration: '3s' }}
            />
            <div
                className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-brand-orange rounded-full opacity-30 animate-ping"
                style={{ animationDuration: '4s', animationDelay: '1s' }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text side */}
                    <div className="order-2 lg:order-1 space-y-6">
                        {/* Pill */}
                        <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/30 text-brand-orange text-xs font-semibold px-4 py-2 rounded-full tracking-widest uppercase reveal visible">
                            <span className="w-2 h-2 bg-brand-orange rounded-full animate-pulse" />
                            Hello, I am
                        </div>

                        {/* Name */}
                        <div
                            className="reveal visible"
                            style={{ transitionDelay: '0.1s' }}
                        >
                            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight text-white">
                                Azmol Huda
                                <br />
                                <span className="text-gradient">Nahid</span>
                            </h1>
                        </div>

                        {/* Role */}
                        <div
                            className="reveal visible"
                            style={{ transitionDelay: '0.2s' }}
                        >
                            <p className="text-lg sm:text-xl font-semibold text-brand-gray">
                                Full-Stack Web Developer
                            </p>
                            <p className="text-brand-gray/70 mt-1 text-sm sm:text-base">
                                Laravel · React · WordPress · Flutter —{' '}
                                <span className="text-shimmer font-semibold">
                                    Super charged with AI
                                </span>
                            </p>
                        </div>

                        {/* Description */}
                        <div
                            className="reveal visible"
                            style={{ transitionDelay: '0.3s' }}
                        >
                            <p className="text-brand-gray text-sm sm:text-base leading-relaxed max-w-lg">
                                Full-stack web apps in Laravel, React and
                                WordPress, cross-platform mobile in Flutter, and
                                AI automation for the repetitive work. Web and
                                AI automation are where I go deepest.
                            </p>
                        </div>

                        {/* Buttons */}
                        <div
                            className="flex flex-wrap gap-4 reveal visible"
                            style={{ transitionDelay: '0.4s' }}
                        >
                            <button
                                onClick={() => scrollTo('portfolio')}
                                className="btn-primary flex items-center gap-2"
                            >
                                View My Work
                                <ArrowDown size={16} />
                            </button>
                            <button
                                onClick={() => scrollTo('contact')}
                                className="btn-outline flex items-center gap-2"
                            >
                                Hire Me
                            </button>
                            {RESUME_URL && (
                                <a
                                    href={RESUME_URL}
                                    download
                                    className="btn-outline flex items-center gap-2"
                                >
                                    <Download size={16} /> Download CV
                                </a>
                            )}
                        </div>

                        {/* Socials */}
                        <div
                            className="flex items-center gap-4 pt-2 reveal visible"
                            style={{ transitionDelay: '0.5s' }}
                        >
                            <a
                                href={GITHUB_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition-all duration-200"
                                aria-label="GitHub"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href={LINKEDIN_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition-all duration-200"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href={MAIL_COMPOSE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center text-brand-gray hover:text-brand-orange hover:border-brand-orange transition-all duration-200"
                                aria-label="Email"
                            >
                                <Mail size={18} />
                            </a>
                            <span className="text-brand-border text-xs ml-2">
                                Follow Me
                            </span>
                        </div>
                    </div>

                    {/* Photo side */}
                    <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
                        {/* Outer glow ring */}
                        <div className="relative w-64 h-64 sm:w-80 sm:h-80 xl:w-96 xl:h-96 depth-layer depth-near">
                            {/* Rotating border */}
                            <div
                                className="absolute -inset-3 rounded-full opacity-30"
                                style={{
                                    background:
                                        'conic-gradient(from 0deg, #FF5A1F, transparent, #FF5A1F)',
                                    animation: 'spin 8s linear infinite',
                                }}
                            />
                            {/* Static glow */}
                            <div className="absolute -inset-1 rounded-full bg-brand-orange/20 blur-xl" />

                            {/* Hexagonal-ish container with clipping */}
                            <div
                                ref={imgRef}
                                className="reveal relative w-full h-full rounded-full overflow-hidden border-4 border-brand-orange/40 shadow-2xl shadow-brand-orange/20"
                                style={{ transitionDelay: '0.2s' }}
                            >
                                <img
                                    src={`${import.meta.env.BASE_URL}assets/images/hero.jpg`}
                                    alt="Azmol Huda Nahid — Web Developer & Programmer"
                                    className="w-full h-full object-cover object-top"
                                    loading="eager"
                                />
                            </div>

                            {/* Badge */}
                            <div className="absolute -bottom-4 -left-4 bg-brand-card border border-brand-orange/40 rounded-xl px-4 py-3 shadow-xl float-chip">
                                <p className="text-2xl font-extrabold text-white leading-none">
                                    2023
                                </p>
                                <p className="text-[10px] text-brand-gray uppercase tracking-wider mt-0.5">
                                    Building since
                                </p>
                            </div>

                            {/* Floating tech chips — orbit the portrait at different phases */}
                            <div
                                className="absolute -top-4 -right-4 bg-brand-orange text-white text-xs font-bold px-3 py-2 rounded-xl shadow-xl float-chip"
                                style={{ animationDelay: '0.4s' }}
                            >
                                ⚡ Laravel &amp; React
                            </div>
                            <div
                                className="absolute top-1/3 -left-8 hidden sm:block bg-brand-card border border-brand-border text-brand-gray text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-xl float-chip"
                                style={{ animationDelay: '1.6s' }}
                            >
                                🤖 AI-Powered
                            </div>
                            <div
                                className="absolute bottom-1/4 -right-6 hidden sm:block bg-brand-card border border-brand-border text-brand-gray text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-xl float-chip"
                                style={{ animationDelay: '2.4s' }}
                            >
                                🚀 Full-Stack
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-brand-gray/50 bounce-slow">
                    <div className="w-6 h-10 rounded-full border-2 border-brand-gray/30 flex items-start justify-center p-1.5">
                        <div className="w-1 h-2 bg-brand-orange rounded-full animate-bounce" />
                    </div>
                    <span className="text-xs tracking-widest uppercase">
                        Scroll
                    </span>
                </div>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </section>
    );
}
