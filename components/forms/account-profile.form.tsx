"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useState } from "react";

import { IUserValidation, userValidation } from "@/lib/validations";
import { Button, Form, Input, Textarea } from "@/components/ui";
import { svgDimensions } from "@/lib/constants";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { User } from "@/types";
import { USER_ACTIONS } from "@/lib/actions";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  user?: User;
  btnTitle: string;
};

export const AccountProfile = ({ user, btnTitle }: Props) => {
  const [files, setFiles] = useState<File[]>([]);

  const router = useRouter();
  const pathname = usePathname();

  const { startUpload } = useUploadThing("media");

  const form = useForm<IUserValidation>({
    resolver: zodResolver(userValidation),
    defaultValues: {
      profile_photo: user?.image,
      name: user?.name,
      username: user?.username,
      bio: user?.bio,
    },
  });

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    field: (value: string) => void,
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDatUrl = event.target?.result?.toString() || "";
        field(imageDatUrl);
      };

      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = async (values: IUserValidation) => {
    const blob = values.profile_photo;

    const hasImageChanged = isBase64Image(blob);
    if (hasImageChanged) {
      const imgRes = await startUpload(files);
      if (imgRes && imgRes[0].url) {
        values.profile_photo = imgRes[0].url;
      }
    }

    await USER_ACTIONS.updateUser(user!.id, {
      username: values.username,
      name: values.name,
      image: values.profile_photo,
      bio: values.bio,
      path: pathname,
    });

    pathname === "/profile/edit" ? router.back() : router.push("/");
  };

  return (
    <Form.Root {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <Form.Field
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <Form.Item className="flex items-center gap-4">
              <Form.Label className="account-form_image-label">
                {field.value
                  ? (
                    <Image
                      src={field.value}
                      alt="profile photo"
                      width={96}
                      height={96}
                      priority
                      className="rounded-full object-contain"
                    />
                  )
                  : (
                    <Image
                      src="/assets/profile.svg"
                      alt="profile photo"
                      {...svgDimensions.default}
                      className="full object-contain"
                    />
                  )}
              </Form.Label>
              <Form.Control className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload a photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </Form.Control>
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="name"
          render={({ field }) => (
            <Form.Item className="flex flex-col gap-3 w-full">
              <Form.Label className="text-base-semibold text-light-2">
                Name
              </Form.Label>
              <Form.Control className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </Form.Control>
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="username"
          render={({ field }) => (
            <Form.Item className="flex flex-col gap-3 w-full">
              <Form.Label className="text-base-semibold text-light-2">
                Username
              </Form.Label>
              <Form.Control className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </Form.Control>
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name="bio"
          render={({ field }) => (
            <Form.Item className="flex flex-col gap-3 w-full">
              <Form.Label className="text-base-semibold text-light-2">
                Bio
              </Form.Label>
              <Form.Control className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </Form.Control>
            </Form.Item>
          )}
        />

        <Button type="submit" className="bg-primary-500">Submit</Button>
      </form>
    </Form.Root>
  );
};
