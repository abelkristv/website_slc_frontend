import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import { useColorModeValue } from "./ui/color-mode";

interface SelectFieldProps {
  collection: any;
  placeholder: string;
  onChange: (value: string) => void;
  width?: string;
  value: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  collection,
  placeholder,
  onChange,
  width = "full",
  value,
}) => {
  function createValue(value: string): string[] {
    const arr = collection.items.filter((item: any) => item.value === value);
    return arr.map((item: any) => item.value);
  }

  return (
    <SelectRoot
      collection={collection}
      variant="outline"
      outline="none"
      borderRadius="md"
      bg="primary"
      width={width}
      shadow="xs"
      value={createValue(value)}
      onValueChange={(e) => onChange(e.value[0])}
    >
      <SelectTrigger clearable>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {collection.items.map((item: any) => (
          <SelectItem
            item={item}
            key={item.value}
            _hover={{ bg: useColorModeValue("gray.100", "gray.800") }}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default SelectField;
