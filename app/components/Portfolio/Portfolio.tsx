"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Portfolio.css";

const USER = {
  name: "Alex Rivera",
  role: "Creative Developer & Digital Designer",
  bio: "Crafting immersive digital experiences at the intersection of design and technology. Passionate about pushing creative boundaries.",
  stats: [
    { num: "150+", label: "Projects" },
    { num: "8+", label: "Years" },
    { num: "40+", label: "Clients" },
    { num: "15+", label: "Awards" },
  ],
  skills: [
    { name: "UI/UX Design", icon: "U", color: "#f6c90e", pct: 92 },
    { name: "3D Visualization", icon: "3D", color: "#ff8c00", pct: 85 },
    { name: "Brand Strategy", icon: "B", color: "#b388ff", pct: 78 },
    { name: "Web Development", icon: "W", color: "#00e676", pct: 95 },
    { name: "Motion Design", icon: "M", color: "#00bcd4", pct: 88 },
  ],
  projects: [
    { title: "Nebula Dashboard", desc: "Real-time analytics platform with immersive 3D data visualization and AI-powered insights.", tags: ["React", "Three.js", "D3"] },
    { title: "Prism Studio", desc: "Brand identity system for a creative agency, including motion guidelines and digital assets.", tags: ["Branding", "Motion", "Figma"] },
    { title: "Orbit CMS", desc: "Headless content management system with visual drag-drop builder and live preview.", tags: ["Next.js", "TypeScript", "Tailwind"] },
    { title: "Aether App", desc: "Meditation and mindfulness app featuring adaptive soundscapes and haptic feedback.", tags: ["React Native", "Framer", "iOS"] },
    { title: "Flux Design System", desc: "Comprehensive component library with accessibility-first approach and dark mode support.", tags: ["Storybook", "CSS", "Accessibility"] },
    { title: "Void E-Commerce", desc: "High-performance storefront with 3D product viewer and AR try-on experience.", tags: ["Next.js", "Three.js", "Stripe"] },
  ],
};

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty("--rx", `${y * -12}deg`);
    ref.current.style.setProperty("--ry", `${x * 12}deg`);
  };

  return (
    <section className="hero" ref={ref} onMouseMove={handleMouseMove} style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}>
      <div className="hero-bg">
        <div className="hero-orb" />
        <div className="hero-orb" />
        <div className="hero-grid" />
      </div>

      <motion.div className="hero-content" style={{ y, opacity }}>
        <div className="hero-badge">Available for work</div>
        <h1 className="hero-name">{USER.name}</h1>
        <p className="hero-role">{USER.role}</p>
        <p className="hero-bio">{USER.bio}</p>
        <a href="#projects" className="hero-cta">
          View Projects ↓
        </a>
      </motion.div>

      <div className="hero-shapes">
        {[
          { s: 80, sty: { top: "15%", left: "8%" }, d: 0 },
          { s: 50, sty: { bottom: "20%", right: "12%" }, d: -3 },
          { s: 40, sty: { top: "30%", right: "25%" }, d: -6 },
          { s: 60, sty: { bottom: "35%", left: "15%" }, d: -2 },
        ].map((shape, i) => (
          <div
            key={i}
            className="hero-shape"
            style={{
              width: shape.s,
              height: shape.s,
              ...shape.sty,
              animationDelay: `${shape.d}s`,
              transform: `translateZ(${20 + i * 15}px)`,
            }}
          />
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <div className="stats">
      {USER.stats.map((s, i) => (
        <motion.div
          key={i}
          className="stat-item"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
        >
          <div className="stat-number">{s.num}</div>
          <div className="stat-label">{s.label}</div>
        </motion.div>
      ))}
    </div>
  );
}

function SkillsSection() {
  const skillsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: skillsRef, offset: ["start end", "end start"] });

  return (
    <section className="section" id="skills" ref={skillsRef}>
      <div className="section-label">Expertise</div>
      <h2 className="section-title">Skills & Tools</h2>
      <div className="skills-grid">
        {USER.skills.map((skill, i) => (
          <motion.div
            key={i}
            className="skill-card"
            initial={{ opacity: 0, rotateX: 15 }}
            whileInView={{ opacity: 1, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="skill-icon" style={{ background: `${skill.color}20`, color: skill.color }}>
              {skill.icon}
            </div>
            <div className="skill-name">{skill.name}</div>
            <div className="skill-bar">
              <motion.div
                className="skill-bar-fill"
                style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.pct}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectsSection() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const handleCardMove = (e: React.MouseEvent, idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 8}deg) rotateX(${y * -8}deg) translateZ(10px)`;
    card.style.setProperty("--glare-x", `${(e.clientX - r.left) / r.width * 100}%`);
    card.style.setProperty("--glare-y", `${(e.clientY - r.top) / r.height * 100}%`);
  };

  const handleCardLeave = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    card.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) translateZ(0px)";
  };

  return (
    <section className="section" id="projects">
      <div className="section-label">Portfolio</div>
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        {USER.projects.map((p, i) => (
          <motion.div
            key={i}
            className="project-card"
            ref={(el) => { cardsRef.current[i] = el; }}
            onMouseMove={(e) => handleCardMove(e, i)}
            onMouseLeave={() => handleCardLeave(i)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <div className="project-card-inner">
              <div className="project-number">0{i + 1}</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <div className="project-tags">
                {p.tags.map((t, j) => (
                  <span key={j} className="project-tag">{t}</span>
                ))}
              </div>
              <div className="project-glare" style={{ background: `radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(246, 201, 14, 0.06), transparent 70%)` }} />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="contact-title">Let's Work Together</h2>
        <p className="contact-desc">Have a project in mind? Let's create something extraordinary.</p>
        <button className="contact-btn" onClick={() => alert("hello@alexrivera.dev")}>
          Get in Touch →
        </button>
      </motion.div>
    </section>
  );
}

const Portfolio: React.FC = () => {
  return (
    <div className="portfolio-page">
      <HeroSection />
      <StatsSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
};

export default Portfolio;
