"use server";

import { revalidatePath } from "next/cache";
import { Trid, User } from "../models";
import { connectToDB } from "../mongoose";
import { PagingParams } from "@/types";

export type CreateTrid = {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
};

export const createTrid = async (props: CreateTrid) => {
  try {
    const { text, author, communityId, path } = props;
    connectToDB();

    const createdTrid = await Trid.create({ text, author, community: null });

    await User.findByIdAndUpdate(author, {
      $push: {
        threads: createdTrid._id,
      },
    });

    revalidatePath(path);
  } catch (e: any) {
    throw new Error(`Error while creating trid: ${e.message}`);
  }
};

export const fetchTrids = async ({
  pageNumber = 1,
  pageSize = 20,
}: PagingParams) => {
  try {
    connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    const tridsQuery = Trid.find({ parentId: { $in: [null, undefined] } }).sort(
      { createdAt: "desc" },
    ).skip(skipAmount).limit(pageSize).populate({
      path: "author",
      model: User,
    }).populate({
      path: "children",
      populate: {
        path: "author",
        model: "User",
        select: "_id name parentId image",
      },
    });
    const totalTridsCount = await Trid.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const trids = await tridsQuery.exec();
    const hasNext = totalTridsCount > skipAmount + trids.length;

    return { trids, hasNext };
    
  } catch (e: any) {
    throw new Error(`Failed at fetching Trids: ${e.message}`);
  }
};
