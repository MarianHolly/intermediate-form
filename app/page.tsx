'use client'

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

import { useZustand } from "./store";
import { formSchema } from "./schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Home() {
  const { toast } = useToast();

  // define a FORM
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { username: "" },
  });

  // ZUSTAND store
  const username = useZustand((state) => state.username);
  const updateUser = useZustand((state) => state.updateUser);

  // SUBMIT function
  function onSubmit(values: z.infer<typeof formSchema>) {
    updateUser(values.username);
  }

  // toast data stored in zustand
  function onToast() {
    toast({
      title: `${username}`,
      description: "This is your zustand store data.",
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
