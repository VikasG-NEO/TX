import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Shield, Clock, Users, Gavel, AlertTriangle, FileCheck } from 'lucide-react';
import NeonButton from '@/components/NeonButton';
import { useNavigate } from 'react-router-dom';

const Rules = () => {
    const navigate = useNavigate();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const floatingY = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const rules = [
        {
            title: "1️⃣ General Eligibility",
            icon: Users,
            content: [
                "The fest is open to UG/PG students from recognized institutions.",
                "Participants must carry a valid College ID / Fee Receipt and a Government ID on event days.",
                "Entry without valid identification will not be permitted."
            ]
        },
        {
            title: "2️⃣ Registration Rules",
            icon: FileCheck,
            content: [
                "Registration is online only through the official platform.",
                "No spot or late registrations will be accepted unless officially announced.",
                "Each participant may register only once per event, unless specified otherwise."
            ]
        },
        {
            title: "3️⃣ Multiple Event Participation & Time Clash",
            icon: Clock,
            isHighlight: true,
            content: [
                "Participants are allowed to register for multiple events.",
                "However, if the timings of two or more registered events clash, the entire responsibility lies with the participant.",
                "The organizing committee will not reschedule, refund, or adjust events due to time clashes.",
                "No complaints regarding event overlap will be entertained.",
                "📌 Participants are strongly advised to check event schedules before registering."
            ]
        },
        {
            title: "4️⃣ Reporting & Attendance",
            icon: Clock,
            content: [
                "Participants must report at least 30 minutes before their scheduled event time.",
                "Late reporting may result in disqualification, at the discretion of the organizers.",
                "Absence during roll call or verification will be treated as withdrawal."
            ]
        },
        {
            title: "5️⃣ Code of Conduct",
            icon: Shield,
            content: [
                "All participants must maintain discipline, decorum, and respectful behavior at all times.",
                "Any form of misbehavior, harassment, vulgarity, or misconduct will lead to immediate disqualification.",
                "Participants must strictly follow instructions given by volunteers, security, and organizers."
            ]
        },
        {
            title: "6️⃣ Event Rules & Fair Play",
            icon: Gavel,
            content: [
                "Each event has its own specific rules, which must be followed strictly.",
                "Use of unfair means, plagiarism, cheating, or external assistance is strictly prohibited.",
                "Judges’ and organizers’ decisions are final and binding."
            ]
        },
        {
            title: "7️⃣ Personal Belongings & Safety",
            icon: Shield,
            content: [
                "Participants are responsible for their personal belongings.",
                "The organizing committee will not be responsible for any loss, theft, or damage.",
                "Restricted items (as per security guidelines) are strictly prohibited inside the campus."
            ]
        },
        {
            title: "8️⃣ Disqualification Clause",
            icon: AlertTriangle,
            content: [
                "Participants may be disqualified for:",
                "• Rule violations",
                "• Late reporting",
                "• Misconduct or indiscipline",
                "• Providing false information",
                "• Failure to comply with instructions"
            ]
        },
        {
            title: "9️⃣ Rights Reserved",
            icon: Gavel,
            content: [
                "The organizers reserve the right to:",
                "• Modify event rules if required",
                "• Change event schedules or venues",
                "• Disqualify participants violating rules",
                "All decisions taken by the organizing committee are final and non-negotiable."
            ]
        },
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-background relative overflow-hidden font-sans text-foreground">
            {/* Background elements (borrowed from Index/Hero) */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
            </div>

            {/* Header */}
            <header className="relative pt-32 pb-16 px-4 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-primary font-stranger tracking-[0.3em] text-sm md:text-base">MANDATORY PROTOCOLS</span>
                    <h1 className="text-4xl md:text-6xl font-display mt-4 neon-text-subtle text-primary">
                        TERMS & CONDITIONS
                    </h1>
                    <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
                        TechXpression 2026 Participation Guidelines. Read carefully before proceeding.
                    </p>
                </motion.div>
            </header>

            {/* Content Rules */}
            <main className="relative z-10 max-w-5xl mx-auto px-4 pb-32">
                <div className="grid gap-8">
                    {rules.map((rule, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: index * 0.1 }}
                            className={`p-6 md:p-8 rounded-xl border backdrop-blur-sm transition-all duration-300 ${rule.isHighlight
                                    ? "bg-primary/10 border-primary/50 shadow-[0_0_30px_rgba(220,38,38,0.2)] scale-[1.02]"
                                    : "bg-card/50 border-primary/20 hover:border-primary/40"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-3 rounded-lg ${rule.isHighlight ? "bg-primary/20" : "bg-secondary/50"}`}>
                                    <rule.icon className={`w-6 h-6 ${rule.isHighlight ? "text-primary animate-pulse" : "text-muted-foreground"}`} />
                                </div>
                                <div className="space-y-4">
                                    <h2 className={`text-xl md:text-2xl font-display ${rule.isHighlight ? "text-primary" : "text-foreground"}`}>
                                        {rule.title}
                                    </h2>
                                    <ul className="space-y-2">
                                        {rule.content.map((line, i) => (
                                            <li key={i} className="flex gap-2 text-sm md:text-base text-muted-foreground/90">
                                                <span className="text-primary mt-1">›</span>
                                                {line}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 mt-8 border-t border-primary/30 text-center space-y-6"
                    >
                        <h2 className="text-2xl font-display text-primary">🔟 Acceptance of Terms</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            By registering for any event under TechXpression 2026, participants confirm that they have read, understood, and accepted all the above Terms & Conditions.
                        </p>

                        <div className="flex justify-center pt-4">
                            <NeonButton onClick={() => navigate('/')}>
                                I Understand & Continue
                            </NeonButton>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Floating decoration */}
            <motion.div style={{ y: floatingY }} className="fixed top-20 right-10 opacity-20 pointer-events-none z-0 hidden md:block">
                <Terminal className="w-64 h-64 text-primary" />
            </motion.div>
        </div>
    );
};

export default Rules;
