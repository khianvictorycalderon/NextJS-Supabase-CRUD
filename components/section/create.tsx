// create.tsx
'use client';

import { useState } from "react";
import InputWithLabel from "../input_with_label";

export default function CreateSection() {
  const [createName, setCreateName] = useState<string>("");
  const [createDesc, setCreateDesc] = useState<string>("");
  const [createAddress, setCreateAddress] = useState<string>("");

  const formData = [
    {
      Label: "Name",
      Id: "name",
      Value: createName,
      SetValue: setCreateName,
      Type: "text",
    },
    {
      Label: "Description",
      Id: "desc",
      Value: createDesc,
      SetValue: setCreateDesc,
      Type: "text",
    },
    {
      Label: "Address",
      Id: "address",
      Value: createAddress,
      SetValue: setCreateAddress,
      Type: "text",
    },
  ];

  return (
    <div className="font-thin mt-4">
      <h1 className="text-2xl">Create</h1>
      <div className="flex flex-col">
        <InputWithLabel Data={formData} />
      </div>
    </div>
  );
}
