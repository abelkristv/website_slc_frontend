import { Flex, VStack } from "@chakra-ui/react";
import { Button } from "../../../../components/ui/button";
import { useState } from "react";
import { Award } from "../../../../types/Award";
import { Assistant } from "../../../../types/Assistant";
import { Period } from "../../../../types/Period";
import { createAward } from "../../../../services/AwardService";
import { showErrorToast, showSuccessToast } from "../../../../utils/toastUtils";

interface AwardFormProps {
  awards: Award[];
  assistants: Assistant[];
  periods: Period[];
  isLoading: boolean;
  handleClose: () => void;
}

export default function AwardForm({
  awards,
  assistants,
  periods,
  handleClose,
}: AwardFormProps) {
  const [selectedAward, setSelectedAward] = useState("");
  const [selectedAssistant, setSelectedAssistant] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const assistantAward = {
      AssistantId: Number(selectedAssistant),
      AwardId: Number(selectedAward),
      PeriodId: Number(selectedPeriod),
    };

    setIsLoading(true);

    try {
      await createAward(assistantAward);
      showSuccessToast("Award created successfully!");
      handleClose();
    } catch (err: any) {
      const errorMessage = err.response?.data.message || "Submission failed";
      showErrorToast(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      alignItems={{ base: "start", md: "center" }}
      justifyContent="space-between"
      gap={4}
    >
      <Flex flexDir="column" gap={4} width="full">
        <VStack gap={2} alignItems={"start"}>
          {" "}
          <label htmlFor="awardSelect" style={{ fontWeight: "bold" }}>
            Select Award
          </label>
          <select
            id="awardSelect"
            value={selectedAward}
            onChange={(e) => setSelectedAward(e.target.value)}
            style={{
              padding: "6px 8px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              minWidth: "100%",
            }}
          >
            <option value="" disabled>
              -- Select an Award --
            </option>
            {awards.map((award) => (
              <option key={award.ID} value={award.ID}>
                {award.AwardTitle.toUpperCase()}
              </option>
            ))}
          </select>
        </VStack>
        <VStack gap={2} alignItems={"start"}>
          <label htmlFor="assistantSelect" style={{ fontWeight: "bold" }}>
            Select Assistant
          </label>
          <select
            id="assistantSelect"
            value={selectedAssistant}
            onChange={(e) => setSelectedAssistant(e.target.value)}
            style={{
              padding: "6px 8px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              minWidth: "100%",
            }}
          >
            <option value="" disabled>
              -- Select an Assistant --
            </option>
            {assistants.map((assistant) => (
              <option
                key={assistant.ID}
                value={assistant.ID}
              >{`${assistant.Initial} (${assistant.Generation})`}</option>
            ))}
          </select>
        </VStack>
        <VStack gap={2} alignItems={"start"}>
          <label htmlFor="awardSelect" style={{ fontWeight: "bold" }}>
            Select Period
          </label>
          <select
            id="periodSelect"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: "6px 8px",
              fontSize: "14px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              minWidth: "100%",
            }}
          >
            <option value="" disabled>
              -- Select Period --
            </option>

            {periods.map((period) => (
              <option key={period.ID} value={period.ID}>
                {period.PeriodTitle}
              </option>
            ))}
          </select>
        </VStack>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full"
          mt={4}
          bg="bluejack.100"
          color="white"
          _hover={{ bg: "bluejack.200" }}
        >
          Submit
        </Button>
      </Flex>
    </Flex>
  );
}
