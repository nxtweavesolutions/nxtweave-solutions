import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export const saveLead = async (data) => {
  try {
    await addDoc(collection(db, "contacts"), {
      name: data.name || "",
      phone: data.phone || "",
      email: data.email || "",
      service: data.service || "",
      message: data.message || "",
      source: data.source || "website", // hero / contact
      status: "pending",
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Lead save error:", error);
    return { success: false };
  }
};