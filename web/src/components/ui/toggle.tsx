"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

type ToggleUIType = "basic" | "text" | "icon"

interface ToggleUIProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, "type"> {
    variant?: ToggleUIType
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
}

const ToggleUI = React.forwardRef<
    React.ElementRef<typeof SwitchPrimitives.Root>,
    ToggleUIProps
>(({ className, variant = "basic", checked, onCheckedChange, ...props }, ref) => {
    const renderContent = () => {
        if (variant === "text") {
            return (
                <span
                    className={cn(
                        "absolute left-[13px] top-1/2 -translate-y-1/2 text-lg font-medium font-geist text-white transition-opacity duration-200",
                        checked ? "opacity-100" : "opacity-0"
                    )}
                >
                    ON
                </span>
            )
        }

        if (variant === "icon") {
            return (
                <span
                    className={cn(
                        "absolute left-[13px] transition-opacity duration-200",
                        checked ? "opacity-100" : "opacity-0"
                    )}
                >
                    <Check className="size-6 text-white" />
                </span>
            )
        }

        return null
    }

    const renderOffContent = () => {
        if (variant === "text") {
            return (
                <span
                    className={cn(
                        "absolute right-1.5 text-lg font-medium text-[#777777] transition-opacity duration-200",
                        !checked ? "opacity-100" : "opacity-0"
                    )}
                >
                    OFF
                </span>
            )
        }

        if (variant === "icon") {
            return (
                <span
                    className={cn(
                        "absolute right-[11px] transition-opacity duration-200",
                        !checked ? "opacity-100" : "opacity-0"
                    )}
                >
                    <X className="size-6 text-[#848484]" />
                </span>
            )
        }

        return null
    }

    return (
        <div className="relative">
            <SwitchPrimitives.Root
                ref={ref}
                className={cn(
                    "peer relative inline-flex h-[45px] w-[90px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-1 data-[state=unchecked]:bg-secondary-2",
                    className
                )}
                checked={checked}
                onCheckedChange={onCheckedChange}
                {...props}
            >
                <SwitchPrimitives.Thumb
                    className={cn(
                        "pointer-events-none z-10 block h-[35px] w-[35px] rounded-full  shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[48px] data-[state=unchecked]:translate-x-[5px] data-[state=checked]:bg-white data-[state=unchecked]:bg-[#3F3D3D]"
                    )}
                />
                {renderContent()}
                {renderOffContent()}
            </SwitchPrimitives.Root>

        </div>
    )
})
ToggleUI.displayName = "ToggleUI"

export { ToggleUI }
