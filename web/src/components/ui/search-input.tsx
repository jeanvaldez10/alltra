import * as React from "react"

import { cn } from "@/lib/utils"
import { SearchIcon } from "lucide-react"

interface SearchInputProps extends React.ComponentProps<"input"> {
  value: string
  setValue: (value: string) => void
}
const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type = "text", value, setValue, ...props }, ref) => {
    return (
      <div className={cn("flex items-center pr-5 w-full rounded-xl bg-[#171717] h-[61px]",
        className
      )}>
        <input
          type={type}
          className="flex h-full flex-1 w-full p-5 border-none bg-transparent text-base text-[#848484] placeholder:text-[#848484] focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50"
          ref={ref}
          onChange={(e) => setValue(e.target.value)}
          {...props}
        />
        <SearchIcon size={20} strokeWidth={2} color="#848484" />
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"

export { SearchInput }
