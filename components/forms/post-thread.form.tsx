"use client";

import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, Textarea } from "@/components/ui";
import { ThreadValidation, threadValidation } from "@/lib/validations";
import { TRID_ACTIONS } from "@/lib/actions";

type Props = {
  userId: string;
};

export const PostThread = ({ userId }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<ThreadValidation>({
    resolver: zodResolver(threadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: ThreadValidation) => {
    await TRID_ACTIONS.createTrid({
      text: values.thread,
      author: userId,
      communityId: null,
      path: pathname,
    });

    router.push("/");
  };

  return (
    <Form.Root {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-10"
      >
        <Form.Field
          control={form.control}
          name="thread"
          render={({ field }) => (
            <Form.Item className="flex flex-col w-full gap-3">
              <Form.Label className="text-base-semibold text-light-2">
                Content
              </Form.Label>
              <Form.Control className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </Form.Control>
            </Form.Item>
          )}
        />

        <Button type="submit" className="bg-primary-500">Post Trid</Button>
      </form>
    </Form.Root>
  );
};
