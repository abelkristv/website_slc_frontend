import { Box, Heading } from "@chakra-ui/react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#3182CE", "#38B2AC", "#ED8936", "#ED64A6", "#9F7AEA"];

export function AlumniChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <Box maxWidth="container.xl" mx="auto" px={4}>
      <Heading as="h2" size="xl" textAlign="center" mb={12}>
        SLC Alumni Career Destination
      </Heading>
      <Box height="400px">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
