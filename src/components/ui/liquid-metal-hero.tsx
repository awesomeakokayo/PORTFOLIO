import { motion } from "framer-motion";
import { LiquidMetal } from "@paper-design/shaders-react";
import { Badge } from "./badge";
import { Button } from "./button";

interface LiquidMetalHeroProps {
  badge?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick: () => void;
  features?: string[];
}

export default function LiquidMetalHero({
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  features = [],
}: LiquidMetalHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#000000]">
      {/* LiquidMetal Shader Background */}
      <div className="absolute inset-0 z-0">
        <LiquidMetal
          style={{ width: "100%", height: "100%" }}
          speed={0.3}
          colorDark="#000000"
          colorLight="#2563EB"
          colorMetal="#1a1a2e"
        />
      </div>

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#000000]/80 via-[#000000]/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[980px] mx-auto px-[clamp(1.5rem,5vw,4rem)] py-20">
        <div className="max-w-[680px]">
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-6"
            >
              <Badge variant="default" className="text-xs tracking-wide">
                <span className="relative flex h-1.5 w-1.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563EB]/40" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2563EB]" />
                </span>
                {badge}
              </Badge>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="font-['Fraunces'] text-[52px] md:text-[72px] lg:text-[96px] font-[700] text-[#F5F5F7] leading-[1.05] mb-6"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="font-['Manrope'] text-[16px] md:text-[18px] text-white/60 leading-relaxed max-w-[540px] mb-10"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.45,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <Button
              size="xl"
              variant="secondary"
              onClick={onPrimaryCtaClick}
              className="bg-white text-[#000000] hover:bg-[#F5F5F7] font-[700] text-[16px] px-8 py-4 h-auto rounded-full"
            >
              {primaryCtaLabel}
            </Button>
            <Button
              size="xl"
              variant="dark-outline"
              onClick={onSecondaryCtaClick}
              className="font-[500] text-[15px] px-8 py-4 h-auto rounded-full"
            >
              {secondaryCtaLabel}
            </Button>
          </motion.div>

          {/* Features Strip */}
          {features.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-wrap gap-6"
            >
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2">
                  <span className="text-[#2563EB]">✦</span>
                  <span className="font-['Manrope'] text-sm text-white/50">
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
