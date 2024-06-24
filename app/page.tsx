"use client";

import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useZustand } from "./store";
import { Textarea } from "@/components/ui/textarea";

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
});

export default function Home() {
  const { toast } = useToast();

  // define a FORM
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // ZUSTAND store
  const username = useZustand((state) => state.username);
  const updateUser = useZustand((state) => state.updateUser);
  const bio = useZustand((state) => state.bio);
  const updateBio = useZustand((state) => state.updateBio);

  // SUBMIT function
  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser(values.username);
    updateBio(values.bio);
  }

  // toast data stored in zustand
  function onToast() {
    toast({
      title: `${username}`,
      description: `${bio}`,
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start my-12">
      <h2 className="text-center text-2xl font-semibold mb-6">React Hook Form</h2>
      {/* FORM */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="spacy-y-4 flex flex-col">
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="shadcn" />
                </FormControl>
                <FormDescription className="text-xs">
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  You can <span>@mention</span> other users and organizations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="m-2">
            Submit
          </Button>
        </form>
      </Form>
      <Button variant="outline" className="w-44 bg-slate-100" onClick={() => onToast()}>
        Toast
      </Button>
    </main>
  );
}
