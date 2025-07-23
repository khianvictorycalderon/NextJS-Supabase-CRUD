'use client'
import { useState } from "react";
import { FeedbackColors, SubmitFeedbackProps } from "./props";
import InputWithLabel from "../input_with_label";
import { Button } from "../ui/button";

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import axios from "axios";

export default function UpdateSection () {

    const [updateID, setUpdateID] = useState<string>("");
    const [updateName, setUpdateName] = useState<string>("");
    const [updateDesc, setUpdateDesc] = useState<string>("");
    const [updateAddress, setUpdateAddress] = useState<string>("");
    const [submitFeedback, setSubmitFeedback] = useState<SubmitFeedbackProps>({
        type: "error",
        message: ""
    });

    const formData = [
        {
            Label: "ID",
            Id: "update_id",
            Value: updateID,
            SetValue: setUpdateID,
            Type: "text",
        },
        {
            Label: "New Name",
            Id: "update_name",
            Value: updateName,
            SetValue: setUpdateName,
            Type: "text",
        },
        {
            Label: "New Description",
            Id: "update_desc",
            Value: updateDesc,
            SetValue: setUpdateDesc,
            Type: "text",
        },
        {
            Label: "New Address",
            Id: "update_address",
            Value: updateAddress,
            SetValue: setUpdateAddress,
            Type: "text",
        },
    ];

    const handleSubmit = async () => {
        if (!updateID.trim()) {
            setSubmitFeedback({
                type: "error",
                message: "User ID is required."
            });
            return;
        }

        const fieldsToUpdate: Record<string, string> = {};
        if (updateName.trim()) fieldsToUpdate.name = updateName.trim();
        if (updateDesc.trim()) fieldsToUpdate.desc = updateDesc.trim();
        if (updateAddress.trim()) fieldsToUpdate.address = updateAddress.trim();

        if (Object.keys(fieldsToUpdate).length === 0) {
            setSubmitFeedback({
                type: "error",
                message: "Please enter at least one field to update."
            });
            return;
        }

        setSubmitFeedback({
            type: "default",
            message: "Updating..."
        });

        try {
            const res = await axios.patch(`/api/users/${updateID}`, fieldsToUpdate);

            if (res.data.type === "success") {
                setSubmitFeedback({
                    type: "success",
                    message: res.data.message
                });

                // Clears the input
                setUpdateID("");
                setUpdateName("");
                setUpdateDesc("");
                setUpdateAddress("");

            } else {
                setSubmitFeedback({
                    type: "error",
                    message: res.data.message || "Update failed."
                });
            }
        } catch (error: any) {
            setSubmitFeedback({
                type: "error",
                message: `Request error: ${error?.response?.data?.message || error.message}`
            });
        }
    };

    return (
        <div className="font-thin mt-4">
            <h1 className="text-2xl">Update</h1>
            <InputWithLabel Data={formData} Style={{ LabelStyle: "md:flex-1/4", InputStyle: "md:flex-3/4" }}/>
            {submitFeedback.message && (
            <Alert className="text-center bg-transparent">
                <AlertTitle className={`${FeedbackColors[submitFeedback.type]}`}>{submitFeedback.message}</AlertTitle>
            </Alert>
            )}
            <p>Note: Empty fields will not be updated.</p>
            <Button onClick={handleSubmit} className="w-full mt-2 transition duration-300 bg-white text-black hover:bg-gray-400 hover:cursor-pointer">Update User</Button>
        </div>
    );
}