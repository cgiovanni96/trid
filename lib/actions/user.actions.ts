"use server";

import { revalidatePath } from "next/cache";

import { connectToDB } from "../mongoose";
import { IUser, User } from "../models";
import { MongooseFetchProperties } from "@/types";

type Payload = {
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
};

export async function updateUser(
  userId: string,
  payload: Payload,
): Promise<void> {
  connectToDB();

  try {
    const { name, username, bio, image, path } = payload;

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      {
        upsert: true,
      },
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (e: any) {
    throw new Error(`Failed to create/update user: ${e.message}`);
  }
}

export async function fetchUser(
  id: string,
): Promise<IUser & MongooseFetchProperties | null> {
  try {
    connectToDB();

    return await User.findOne({ id: id });
  } catch (e: any) {
    throw new Error(`Failed to fetch user: ${e.message}`);
  }
}
