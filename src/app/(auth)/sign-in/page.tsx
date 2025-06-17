/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useDebounceValue, useDebounceCallback } from 'usehooks-ts'
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"


const page = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const router = useRouter();

  // zod implementation
    const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
        identifier: "",
        password: "",
    }
    })


    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
      const result = await signIn('credentials', {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      })
      if (result?.error) {
        toast.error("Invalid email or password")
      }
      if (result?.url) {
        router.replace('/dashboard')
      }
    }

    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Ghost Feedback
            </h1>
            <p className="mb-4">Sign in to start your anonymous experience</p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Email/Username</FormLabel>
                <FormControl>
                <Input placeholder="Enter your email or username" 
                {...field}
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
            <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                <Input type="password" placeholder="Enter your password" 
                {...field}
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full cursor-pointer">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Sign In"}
        </Button>
            </form>
        </Form>
        <div className="text-center mt-4">
            <p>
            New User?{" "}
            <Link href="/sign-up" className="text-blue-500 hover:underline">
                Sign in
            </Link>
            </p>
        </div>
        </div>
    </div>
    )
}

export default page