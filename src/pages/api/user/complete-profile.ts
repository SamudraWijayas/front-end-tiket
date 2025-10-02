import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import authServices from "@/services/auth.service";
import NextAuth from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, NextAuth) as any;

    if (!session?.accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { gender, nohp } = req.body;

    if (!gender || !nohp) {
      return res.status(400).json({
        message: "Gender and nohp number are required"
      });
    }

    // Update user profile via backend API
    const updatedProfile = await authServices.updateProfile({
      gender,
      nohp: nohp, // Map to backend field name
      isProfileComplete: true,
    });

    return res.status(200).json({
      message: "Profile completed successfully",
      data: updatedProfile.data.data,
    });
  } catch (error) {
    console.error("Complete profile error:", error);
    return res.status(500).json({
      message: "Failed to complete profile",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
