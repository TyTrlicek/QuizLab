"use client"

import React, { useState } from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";

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
    setSelectedItem(item); // Update the selected item
    setIsOpen(false); // Close the dropdown after selection
    onChange?.(item);
  };

  return (
    <DropdownMenuPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <div className={`relative ${width ?? "w-auto"}`}>
  <DropdownMenuPrimitive.Trigger
    className={`min-w-[6rem] px-4 py-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between ${width ?? "w-auto"}`}
  >
    {selectedItem} <ChevronDownIcon className="ml-2" />
  </DropdownMenuPrimitive.Trigger>

  <DropdownMenuPrimitive.Content
    className={`absolute mt-2 min-w-[6rem] bg-gray-700 border rounded-md shadow-lg z-10 ${width ?? "w-auto"}`}
  >
    {dropDownElements.map((element, index) => (
      <DropdownMenuPrimitive.Item
        key={index}
        onClick={() => handleItemClick(element)}
        className="px-4 py-2 cursor-pointer hover:bg-blue-300 focus:ring-2 focus:ring-blue-500"
      >
        {element}
      </DropdownMenuPrimitive.Item>
    ))}
  </DropdownMenuPrimitive.Content>
</div>

    </DropdownMenuPrimitive.Root>
  );
};

export default Dropdown;
