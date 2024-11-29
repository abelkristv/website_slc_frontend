import { VStack, Text, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { getUsers } from "../../../services/UserService";
import {
  getGenerations,
  getSLCPositions,
} from "../../../services/AssistantService";
import { User } from "../../../types/User";
import Pagination from "../../../components/Pagination";
import AssistantsNotFound from "../../Assistants/components/AssistantsNotFound";
import { SLCPosition } from "../../../types/SLCPosition";

export default function ManageNewsPage() {
  return (
    <VStack gap={4} bg="primary" p={6} borderRadius="lg" boxShadow="lg">
      <a href="/admin/add-news">add news</a>
    </VStack>
  );
}
