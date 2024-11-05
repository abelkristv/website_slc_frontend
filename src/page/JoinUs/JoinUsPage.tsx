import { VStack } from "@chakra-ui/react";
import RequirementsSection from "./components/RequirementsSection";
import RegistrationSection from "./components/RegistrationSection";
import MoreInformationSection from "./components/MoreInfromationSection";
import BenefitsSection from "./components/BenefitsSection";

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
      <RegistrationSection />
      <MoreInformationSection />
    </VStack>
  );
}
