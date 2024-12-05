import { VStack } from "@chakra-ui/react";
import RequirementsSection from "./components/RequirementsSection";
import MoreInformationSection from "./components/MoreInfromationSection";
import BenefitsSection from "./components/BenefitsSection";
import PhasesSection from "./components/PhasesSection";

export default function JoinUsPage() {
  return (
    <VStack
      className="page-container"
      overflowY="scroll"
      height="91.5vh"
      scrollSnapType="y mandatory"
      scrollBehavior={"smooth"}
      gap={12}
      color={"white"}
      overflowX={"hidden"}
    >
      <RequirementsSection />
      <BenefitsSection />
      <PhasesSection />
      <MoreInformationSection />
    </VStack>
  );
}
