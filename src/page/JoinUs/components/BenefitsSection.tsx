import { VStack, Box, Heading } from "@chakra-ui/react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import c from "../../../assets/hard_skill_icons/c.png";
import androidStudio from "../../../assets/hard_skill_icons/android-studio.png";
import csharp from "../../../assets/hard_skill_icons/csharp.webp";
import css from "../../../assets/hard_skill_icons/css.png";
import go from "../../../assets/hard_skill_icons/go.png";
import mongodb from "../../../assets/hard_skill_icons/mongodb.png";
import js from "../../../assets/hard_skill_icons/js.webp";
import html from "../../../assets/hard_skill_icons/html.png";
import laravel from "../../../assets/hard_skill_icons/laravel.png";
import typescript from "../../../assets/hard_skill_icons/typescript.png";
import sqlite from "../../../assets/hard_skill_icons/sqlite.png";
import react from "../../../assets/hard_skill_icons/react.png";
import python from "../../../assets/hard_skill_icons/python.png";
import php from "../../../assets/hard_skill_icons/php.png";
import java from "../../../assets/hard_skill_icons/java.png";

import leadership from "../../../assets/soft-skill-icons/leadership.png";
import problemSolving from "../../../assets/soft-skill-icons/problem-solving.png";
import publicSpeaking from "../../../assets/soft-skill-icons/public-speaking.png";
import timeManagement from "../../../assets/soft-skill-icons/time-management.png";
import responsibility from "../../../assets/soft-skill-icons/responsibility.png";
import teamwork from "../../../assets/soft-skill-icons/teamwork.png";

import freeParking from "../../../assets/other-benefit-icons/free-parking.png";
import jobExperience from "../../../assets/other-benefit-icons/job-experience.png";
import medicalBenefit from "../../../assets/other-benefit-icons/medical-benefit.png";
import salary from "../../../assets/other-benefit-icons/salary.png";
import sat from "../../../assets/other-benefit-icons/sat.png";
import { useColorModeValue } from "../../../components/ui/color-mode";

const skillsData = {
  hardSkills: [
    c,
    androidStudio,
    csharp,
    css,
    go,
    mongodb,
    js,
    html,
    laravel,
    typescript,
    sqlite,
    react,
    python,
    php,
    java,
  ],
  softSkills: [
    leadership,
    problemSolving,
    publicSpeaking,
    timeManagement,
    responsibility,
    teamwork,
  ],
  otherBenefits: [freeParking, jobExperience, medicalBenefit, salary, sat],
};

const BenefitsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

  const renderSkillsSection = (
    title: string,
    skills: string[],
    duration: string,
    direction: string
  ) => (
    <VStack>
      <Heading fontSize="3xl">{title}</Heading>
      <motion.div
        className="scrolling-container"
        style={{
          display: "flex",
          gap: "0.5rem",
          flexDirection: "row",
          overflow: "hidden",
          whiteSpace: "nowrap",
          animation: isInView
            ? `${
                direction === "right" ? "scroll-right" : "scroll-left"
              } ${duration} linear infinite`
            : "none",
          padding: "1rem",
          transform: `translateX(${direction === "right" ? "100%" : "-100%"})`,
        }}
      >
        {skills
          .concat(skills)
          .concat(skills)
          .concat(skills)
          .concat(skills)
          .concat(skills)
          .concat(skills)
          .concat(skills)
          .concat(skills)
          .concat(skills)
          .map((skill, index) => (
            <Box
              key={index}
              w="100px"
              h="100px"
              border={useColorModeValue(
                "1px solid white",
                "1px solid rgba(255, 255, 255, 0.2)"
              )}
              rounded={"full"}
              backdropFilter={"blur(10px)"}
              bgColor={useColorModeValue("rgba(255, 255, 255, 0.4)", "black")}
              p={6}
              style={{
                display: "inline-block",
                flexShrink: 0,
              }}
              _hover={{ transform: "scale(1.1)" }}
              transition={"transform 0.2s"}
            >
              <img
                src={skill}
                alt={`Skill ${index + 1}`}
                style={{ width: "100%", height: "100%" }}
              />
            </Box>
          ))}
      </motion.div>
    </VStack>
  );

  return (
    <motion.section
      ref={ref}
      style={{ scrollSnapAlign: "start" }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <VStack
        justifyContent="center"
        alignItems="center"
        gap={5}
        textAlign="center"
        minHeight="91.5vh"
      >
        <Heading
          fontSize="6xl"
          fontWeight="bold"
          mb={5}
          textShadow="1px 1px 1px rgba(30, 30, 30, 0.3)"
        >
          Benefits
        </Heading>

        {renderSkillsSection(
          "Hard Skills",
          skillsData.hardSkills,
          "60s",
          "left"
        )}
        {renderSkillsSection(
          "Soft Skills",
          skillsData.softSkills,
          "45s",
          "right"
        )}
        {renderSkillsSection(
          "Other Benefits",
          skillsData.otherBenefits,
          "20s",
          "left"
        )}
      </VStack>
      <style>
        {`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-10%);
            }
          }
            @keyframes scroll-right {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(10%);
            }
          }
        
        `}
      </style>
    </motion.section>
  );
};

export default BenefitsSection;
