'use client'
import { useState } from "react";
import InputWithLabel from "../input_with_label";
import { Button } from "../ui/button";
import { FeedbackColors, SubmitFeedbackProps } from "./props";

import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import axios from "axios";

export default function DeleteSection () {

    const [deleteID, setDeleteID] = useState<string>("");
    const [submitFeedback, setSubmitFeedback] = useState<SubmitFeedbackProps>({
        type: "default",
        message: ""
    });
    const formData = [
        {
            Label: "ID",
            Id: "delete_id",
            Value: deleteID,
            SetValue: setDeleteID,
            Type: "text",
        }
    ];

    const handleDeleteUser = async() => {
        if (!deleteID) {
            setSubmitFeedback({
                type: "error",
                message: "Please enter a user id."
            });
            return;
        }

        setSubmitFeedback({
            type: "default",
            message: "Deleting..."
        })

        try {
            const req = await axios.delete(`/api/users/${deleteID}`);

            if (req.data.type === "success") {
                setSubmitFeedback({
                    type: "success",
                    message: req.data.message
                });

                // Clears the id
                setDeleteID("");
            } else {
                setSubmitFeedback({
                    type: "error",
                    message: req.data.message
                });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setSubmitFeedback({
                    type: "error",
                    message: `Failed to delete: ${error.message}`
                });
            }
        }

    }

    const handleDeleteAllUser = async() => {
        setSubmitFeedback({
            type: "default",
            message: "Deleting all users..."
        });

        try {
            const req = await axios.delete("/api/users");

            if (req.data.type === "success") {
                setSubmitFeedback({
                    type: "success",
                    message: req.data.message
                });
            } else {
                setSubmitFeedback({
                    type: "error",
                    message: req.data.message
                });
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setSubmitFeedback({
                    type: "error",
                    message: `Failed to delete: ${error.message}`
                });
            }
        }
    }

    return (
        <div className="font-thin mt-4">
            <h1 className="text-2xl">Delete</h1>
            <InputWithLabel Data={formData} Style={{ LabelStyle: "md:flex-1/10", InputStyle: "md:flex-9/10" }}/>
            {submitFeedback.message && (
            <Alert className="text-center bg-transparent">
                <AlertTitle className={`${FeedbackColors[submitFeedback.type]}`}>{submitFeedback.message}</AlertTitle>
            </Alert>
            )}
            <Button onClick={handleDeleteUser} className="w-full mt-2 transition duration-300 bg-red-800 text-white hover:bg-red-600 hover:cursor-pointer">Delete User</Button>
            <Button onClick={handleDeleteAllUser} className="w-full mt-2 transition duration-300 bg-red-600 text-white hover:bg-red-400 hover:cursor-pointer">Delete All User</Button>
            <p className="mt-2">WARNING: Deleting all users is not reversible and does not require ID. Order of ID will also be resetted back to 1.</p>
        </div>
    );
}