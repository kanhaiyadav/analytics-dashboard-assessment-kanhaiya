import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useState } from "react";


const SelectColumn = ({ options, setOption, placeholder }: {
    options: string[];
    setOption: (placeholder:string, opt:string) => void;
    placeholder: string;
}) => {
  const [selected, setSelected] = useState("");

  return (
      <Select
          value={selected}
          onValueChange={(value) => {
              setSelected(value);
              setOption(placeholder, value);
          }}
      >
          <SelectTrigger className="w-[220px]">
              <SelectValue placeholder={`Select ${placeholder}`} />
          </SelectTrigger>
          <SelectContent className="glass text-foreground">
              {options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                      {opt}
                  </SelectItem>
              ))}
          </SelectContent>
      </Select>
  );

}

export default SelectColumn;