"use client"

import React, { useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, Check } from "lucide-react";

interface DropdownProps {
  dropDownElements: string[];
  dropDownTitle: string;
  onChange?: (selected: string) => void;
  width?: string;
}

const Dropdown = ({ dropDownElements, dropDownTitle, onChange, width }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(dropDownTitle);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
    onChange?.(item);
  };

  return (
    <DropdownMenuPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className={`relative ${width ?? "w-auto"} z-[60]`}>
        <DropdownMenuPrimitive.Trigger
          className={`btn btn-secondary flex items-center justify-between gap-2 min-w-[140px] ${width ?? "w-auto"} relative z-[60] bg-black`}
        >
          <span className="truncate">{selectedItem}</span>
          <ChevronDownIcon
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </DropdownMenuPrimitive.Trigger>

        <DropdownMenuPrimitive.Content
          className={`absolute mt-2 min-w-[140px] bg-gray-900 border border-white/20 rounded-xl p-2 z-[70] ${width ?? "w-auto"} shadow-xl`}
          align="start"
          sideOffset={4}
        >
          {dropDownElements.map((element, index) => (
            <DropdownMenuPrimitive.Item
              key={index}
              onClick={() => handleItemClick(element)}
              className="group relative flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer hover:bg-white/10 focus:bg-white/10 focus:outline-none transition-colors"
            >
              <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                {element}
              </span>
              {selectedItem === element && (
                <Check className="w-4 h-4 text-cyan-400" />
              )}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </div>
    </DropdownMenuPrimitive.Root>
  );
};

export default Dropdown;
