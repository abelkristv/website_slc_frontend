import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";

interface SelectFieldProps {
  collection: any;
  placeholder: string;
  onChange: (value: string) => void;
  width?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  collection,
  placeholder,
  onChange,
  width = "full",
}) => {
  return (
    <SelectRoot
      collection={collection}
      variant="outline"
      outline="none"
      borderRadius="md"
      bgColor="white"
      width={width}
      shadow="xs"
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
            _hover={{ backgroundColor: "gray.100" }}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default SelectField;
