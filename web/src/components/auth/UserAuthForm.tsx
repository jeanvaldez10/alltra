"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/global/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Auth from "../../../client/auth"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "../ui/toast"
import { redirect } from "next/navigation"
const auth = new Auth();

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [email, setEmail] = React.useState<string>("");
  const { toast } = useToast();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const response = await auth.checkEmail(email);
    if (response.code !== 200) {
      setIsLoading(false);
      return toast({
        title: "Email Sign Up Failed",
        description: response.message,
        action: (<ToastAction altText="Try Again">Undo</ToastAction>)
      })
    }
    setIsLoading(false);
    toast({
      title: "Email Availabe",
      description: "This email is available for signup, redirecting into SignUp page...",
      action: (<ToastAction altText="Try Again">Undo</ToastAction>)
    })
    setTimeout(() => {
      redirect(`/signup/email?value=${email}`)
    }, 500)
  }

  return (
    <div className={cn("grid gap-6 sm:px-0 px-4", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className="bg-zinc-950/50"
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In with Email
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 text-muted-foreground bg-zinc-950">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Button className="bg-zinc-950" variant="outline" type="button" disabled={isLoading} >
          {false ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.google className="mr-2 h-4 w-4" />
          )}{" "}
          Google
        </Button>
        <Button className="bg-zinc-950" variant="outline" type="button" disabled={isLoading}>
          {false ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Icons.apple className="mr-2 h-4 w-4" />
          )}{" "}
          Apple
        </Button>
      </div>


    </div>
  )
}