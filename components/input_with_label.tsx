import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputWithLabelProps {
  Data: {
    Label: string;
    Id: string;
    Value: string;
    SetValue: (value: string) => void;
    Type: string;
    Pattern?: string;
  }[];
}

export default function InputWithLabel({ Data }: InputWithLabelProps) {
  return (
    <>
      {Data.map((item, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-2 my-2">
          <Label htmlFor={item.Id} className="md:flex-1/10 md:flex md:justify-center">{item.Label}: </Label>
          <Input
            id={item.Id}
            type={item.Type}
            pattern={item.Pattern || ""}
            value={item.Value}
            onChange={(e) => item.SetValue(e.target.value)}
            className="md:flex-9/10 selection:bg-slate-700"
            placeholder={`${item.Label}...`}
          />
        </div>
      ))}
    </>
  );
}