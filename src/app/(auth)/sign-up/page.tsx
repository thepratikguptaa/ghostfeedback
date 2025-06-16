/* eslint-disable prefer-const */
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


const page = () => {
    const [username, setUsername] = useState("")
    const [usernameMessage, setUsernameMessage] = useState("")
    const [isCheckingUsername, setIsCheckingUsername] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const debounced = useDebounceCallback(setUsername, 300)
    const router = useRouter();

  // zod implementation
    const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
        username: "",
        email: "",
        password: "",
    }
    })

    useEffect(() => {
    const checkUsernameUnique = async () => {
        if (username) {
        setIsCheckingUsername(true)
        setUsernameMessage('')
        try {
            const response = await axios.get(`/api/check-username-unique?username=${username}`)
            console.log(response.data.message);
            
            let messageUnique = response.data.message
            console.log(messageUnique);
            
            setUsernameMessage(messageUnique);
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
            )
        } finally {
            setIsCheckingUsername(false)
        }
        }
    }

    checkUsernameUnique()

    }, [username])

    const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true)
    try {
        const response = await axios.post<ApiResponse>('/api/sign-up', data)
        toast.success(response.data.message)
        router.replace(`/verify/${username}`)
        setIsSubmitting(false)

    } catch (error) {
        console.error("Error in signup of user", error);
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(axiosError.response?.data.message ?? "Error in signup of user")
        setIsSubmitting(false)
        
    }
    }

    return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Ghost Feedback
            </h1>
            <p className="mb-4">Sign up to start your anonymous experience</p>
        </div>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                <Input placeholder="Create an username" 
                {...field}
                onChange={(e) => {
                    field.onChange(e)
                    debounced(e.target.value)
                }}
                />
                </FormControl>
                {isCheckingUsername && <Loader2 className="animate-spin"/>}
                <p className={`text-sm ${usernameMessage === 'Username is unique'
                            ? 'text-green-500'
                            : 'text-red-500'}`}>
                    {usernameMessage}
                </p>
                <FormMessage />
            </FormItem>
            )}
        />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                <Input placeholder="Enter your email" 
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
                <Input type="password" placeholder="Enter a password" 
                {...field}
                />
                </FormControl>
                <FormMessage />
            </FormItem>
            )}
        />
        <Button type="submit" disabled={isSubmitting || isCheckingUsername} className="w-full cursor-pointer">
            {isSubmitting ? (
            <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
            </>
            ) : (
            'Signup'
            )}
        </Button>
            </form>
        </Form>
        <div className="text-center mt-4">
            <p>
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:underline">
                Sign in
            </Link>
            </p>
        </div>
        </div>
    </div>
    )
}

export default page