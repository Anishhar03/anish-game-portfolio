"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function TooltipContent({
  children,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        sideOffset={sideOffset}
        className="z-[200] border border-[#79ffbb]/40 bg-[#07100d] px-3 py-2 font-mono text-[10px] uppercase text-[#eef7f4] shadow-xl"
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="fill-[#79ffbb]/40" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}
