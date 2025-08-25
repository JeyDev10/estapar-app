import { ComponentProps } from "react"

import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { LoaderCircle, LucideIcon } from "lucide-react"

import { cn } from "@src/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-brand-primary text-white shadow-xs hover:bg-brand-primary/90",
        transparent: "text-gray-secondary bg-transparent hover:bg-bg-primary hover:text-gray-primary"
      },
      size: {
        default: "h-9 px-4 py-2 ha s-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  icon = undefined,
  ...props
}: ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
    icon?: LucideIcon
  }) {
  const Comp = asChild ? Slot : "button"
  const Icon = icon ?? undefined

  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {isLoading ? (
        <LoaderCircle className="animate-spin" />
      ) : (
        <>
          {Icon && <Icon />}
          {props.children}
        </>
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
