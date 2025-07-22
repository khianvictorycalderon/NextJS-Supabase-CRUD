'use client';

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Alert,
  AlertTitle,
} from "@/components/ui/alert"
import { FeedbackColors, SubmitFeedbackProps, UserListProps } from "./props";
import axios from "axios";

export default function ReadSection () {

    const [userlist, setUserList] = useState<UserListProps[]>([]);
    const [submitFeedback, setSubmitFeedback] = useState<SubmitFeedbackProps>({
        type: "error",
        message: ""
    });

    const handleReloadUserList = async () => {
        setSubmitFeedback({
            type: "default",
            message: "Fetching..."
        });

        try {
            const res = await axios.get("/api/users");

            if (res.data.type === "success") {
                setUserList(res.data.data);
                setSubmitFeedback({
                    type: res.data.type,
                    message: res.data.message
                });
            }
        } catch (error) {
            setSubmitFeedback({
                type: "error",
                message: `Fetch failed: ${error}`
            });
        }
    }

    useEffect(() => {
        handleReloadUserList();
    },[]);

    return (
        <div className="font-thin mt-4">
            <h1 className="text-2xl">Read</h1>
            {submitFeedback.message && (
                <Alert className="text-center bg-transparent mt-2">
                    <AlertTitle className={`${FeedbackColors[submitFeedback.type]}`}>{submitFeedback.message}</AlertTitle>
                </Alert>
            )}
            <Button onClick={handleReloadUserList} className="w-full mt-2 transition duration-300 bg-white text-black hover:bg-gray-400 hover:cursor-pointer">Reload User List</Button>
            <div className="my-6 w-full overflow-x-auto">
                {userlist.length > 0 ? (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-t">
                                <th className="border px-4 py-2 md:w-1/12 text-center font-bold">ID</th>
                                <th className="border px-4 py-2 md:w-2/12 text-center font-bold">Name</th>
                                <th className="border px-4 py-2 md:w-4/12 text-center font-bold">Description</th>
                                <th className="border px-4 py-2 md:w-3/12 text-center font-bold">Address</th>
                                <th className="border px-4 py-2 md:w-2/12 text-center font-bold">Date Creation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userlist.map((item, index) => (
                                <tr className="border-t" key={index}>
                                    <td className="border px-4 py-2">{item.id}</td>
                                    <td className="border px-4 py-2">{item.name}</td>
                                    <td className="border px-4 py-2">{item.desc}</td>
                                    <td className="border px-4 py-2">{item.address}</td>
                                    <td className="border px-4 py-2">{item.created_at}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>
                        No users yet...
                    </p>
                )}
            </div>
        </div>
    );
}