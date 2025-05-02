"use client";
import { Separator } from "@/components/ui/separator";
import UsersSearchTable from "./components/users-search-table";
import { searchUsers } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const formSchema = z.object({
  username: z
    .string()
    .max(32, { message: "Username should be less than 32 characters!" }),
});

function page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const [submittedQuery, setSubmittedQuery] = useState("");
  const username = form.watch("username");

  const { data: users = [], isFetching } = useQuery({
    queryKey: ["users", submittedQuery],
    queryFn: async () => {
      if (!submittedQuery) return [];

      return await searchUsers(submittedQuery);
    },
    enabled: !!submittedQuery,
  });

  return (
    <section className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => setSubmittedQuery(username))}
          className="px-4 py-8"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">Search users</FormLabel>
                <div className="flex gap-4">
                  <FormControl>
                    <Input
                      placeholder="Enter username"
                      autoComplete="off"
                      autoCorrect="off"
                      {...field}
                    />
                  </FormControl>
                  <Button type="submit" className="cursor-pointer">
                    Submit
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Separator />
      {isFetching ? (
        <div className="w-full">
          <Image
            src="/logo.svg"
            alt="logo"
            width={120}
            height={120}
            className="animate-pulse mx-auto"
          />
        </div>
      ) : (
        users.length > 0 && <UsersSearchTable users={users} />
      )}
    </section>
  );
}

export default page;
