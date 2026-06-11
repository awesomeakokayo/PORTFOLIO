import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-[600] transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#EFF6FF] text-[#2563EB]",
        secondary: "bg-[#F5F5F7] text-[#6E6E73]",
        destructive: "bg-red-100 text-red-700",
        outline: "border border-[#D2D2D7] text-[#6E6E73]",
        success: "bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
