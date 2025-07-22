// create.tsx
'use client';

import { useState } from "react";
import InputWithLabel from "../input_with_label";
import axios from "axios";
import { Button } from "../ui/button";

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

  const handleSubmit = async () => {
    
    try {
      const res = await axios.post("/api/users", {
        name: createName,
        desc: createDesc,
        address: createAddress
      });

      setCreateName("");
      setCreateDesc("");
      setCreateAddress("");
      alert(res.data.message);

    } catch (error) {
      console.error(`Axios error: ${error}`);
    }
  }

  return (
    <div className="font-thin mt-4">
      <h1 className="text-2xl">Create</h1>
      <div className="flex flex-col">
        <InputWithLabel Data={formData} />
        <Button onClick={handleSubmit} className="mt-2 transition duration-300 bg-white text-black hover:bg-gray-400 hover:cursor-pointer">Create User</Button>
      </div>
    </div>
  );
}
