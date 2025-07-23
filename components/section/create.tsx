// create.tsx
'use client';

import { useState } from "react";
import InputWithLabel from "../input_with_label";
import axios from "axios";
import { Button } from "../ui/button";

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import { FeedbackColors, SubmitFeedbackProps } from "./props";

export default function CreateSection() {
  const [createName, setCreateName] = useState<string>("");
  const [createDesc, setCreateDesc] = useState<string>("");
  const [createAddress, setCreateAddress] = useState<string>("");
  const [submitFeedback, setSubmitFeedback] = useState<SubmitFeedbackProps>({
    type: "error",
    message: ""
  });

  const formData = [
    {
      Label: "Name",
      Id: "create_name",
      Value: createName,
      SetValue: setCreateName,
      Type: "text",
    },
    {
      Label: "Description",
      Id: "create_desc",
      Value: createDesc,
      SetValue: setCreateDesc,
      Type: "text",
    },
    {
      Label: "Address",
      Id: "create_address",
      Value: createAddress,
      SetValue: setCreateAddress,
      Type: "text",
    },
  ];

  const handleSubmit = async () => {

    // Validate first
    if (!createName || !createDesc || !createAddress) {
      setSubmitFeedback({
        type: "error",
        message: "Please fill all fields"
      });
      return;
    }

    setSubmitFeedback({
      type: "default",
      message: "Submitting..."
    });
    
    try {
      const res = await axios.post("/api/users", {
        name: createName,
        desc: createDesc,
        address: createAddress
      });

      setCreateName("");
      setCreateDesc("");
      setCreateAddress("");

      setSubmitFeedback({
        type: res.data.type,
        message: res.data.message
      });

    } catch (error) {
      setSubmitFeedback({
        type: "error",
        message: `Submit failed: ${error}`
      });
    }
  }

  return (
    <div className="font-thin mt-4">
      <h1 className="text-2xl">Create</h1>
      <div className="flex flex-col">
        <InputWithLabel Data={formData} />
        {submitFeedback.message && (
          <Alert className="text-center bg-transparent">
            <AlertTitle className={`${FeedbackColors[submitFeedback.type]}`}>{submitFeedback.message}</AlertTitle>
          </Alert>
        )}
        <Button onClick={handleSubmit} className="mt-2 transition duration-300 bg-white text-black hover:bg-gray-400 hover:cursor-pointer">Create User</Button>
      </div>
    </div>
  );
}
