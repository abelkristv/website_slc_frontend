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
    { src: c, label: "C" },
    { src: androidStudio, label: "Android Studio" },
    { src: csharp, label: "C#" },
    { src: css, label: "CSS" },
    { src: go, label: "Go" },
    { src: mongodb, label: "MongoDB" },
    { src: js, label: "JavaScript" },
    { src: html, label: "HTML" },
    { src: laravel, label: "Laravel" },
    { src: typescript, label: "TypeScript" },
    { src: sqlite, label: "SQLite" },
    { src: react, label: "React" },
    { src: python, label: "Python" },
    { src: php, label: "PHP" },
    { src: java, label: "Java" },
  ],
  softSkills: [
    { src: leadership, label: "Leadership" },
    { src: problemSolving, label: "Problem Solving" },
    { src: publicSpeaking, label: "Public Speaking" },
    { src: timeManagement, label: "Time Management" },
    { src: responsibility, label: "Responsibility" },
    { src: teamwork, label: "Teamwork" },
  ],
  otherBenefits: [
    { src: freeParking, label: "Free Parking" },
    { src: jobExperience, label: "Job Experience" },
    { src: medicalBenefit, label: "Medical Benefit" },
    { src: salary, label: "Salary" },
    { src: sat, label: "SAT" },
  ],
};

export default function BenefitsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref);

  const renderSkillsSection = (
    title: string,
    skills: { src: string; label: string }[],
    duration: string,
    direction: string
  ) => (
    <VStack>
      <Heading fontSize={{ base: "2xl", lg: "3xl" }}>{title}</Heading>
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
          .map((skill, index) => (
            <Box
              key={index}
              position="relative"
              w="100px"
              h="100px"
              border={useColorModeValue(
                "1px solid white",
                "1px solid rgba(255, 255, 255, 0.2)"
              )}
              rounded="full"
              backdropFilter="blur(10px)"
              bgColor={useColorModeValue("rgba(255, 255, 255, 0.4)", "black")}
              p={6}
              display="inline-block"
              flexShrink={0}
              className="group"
            >
              <img
                src={skill.src}
                alt={skill.label}
                style={{ width: "100%", height: "100%" }}
              />
              <Box
                position="absolute"
                bottom="-10%"
                left="50%"
                transform="translateX(-50%)"
                bgColor="card"
                color="secondary"
                px="8px"
                py="4px"
                rounded="md"
                fontSize="sm"
                whiteSpace="nowrap"
                opacity={0}
                transition="opacity 0.3s"
                _groupHover={{ opacity: 1 }}
                cursor="default"
              >
                {skill.label}
              </Box>
            </Box>
          ))}
      </motion.div>
    </VStack>
  );

  return (
    <motion.section
      ref={ref}
      style={{
        scrollSnapAlign: "start",
        margin: "0 0 50% 0",
        scrollBehavior: "smooth",
        scrollSnapType: "y mandatory",
      }}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      <VStack
        justifyContent="center"
        alignItems="center"
        gap={5}
        textAlign="center"
        minHeight="91.5vh"
        animation={isInView ? "fade-in 1.5s" : ""}
      >
        <Heading
          fontSize={{ base: "5xl", lg: "6xl" }}
          fontWeight="bold"
          mb={6}
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
              transform: translateX(-20%);
            }
          }
          @keyframes scroll-right {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(20%);
            }
          }
        `}
      </style>
    </motion.section>
  );
}
