"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DropdownProps {
    dropDownElements: string[];
    dropDownTitle: string;
    // Add other props your Dropdown component might accept, e.g.,
    // onSelect?: (value: string) => void;
    // label?: string;
  }

const Dropdown = ({ dropDownElements, dropDownTitle }: DropdownProps) => {

    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" >{dropDownTitle}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {dropDownElements.map((element, index) => (
            <DropdownMenuItem className="bg-gray-800 text-white hover:bg-gray-700" key = {index}>{element}</DropdownMenuItem>
        ))}
        
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
