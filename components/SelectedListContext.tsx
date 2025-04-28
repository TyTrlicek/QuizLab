import { createContext, useState, useContext, ReactNode } from 'react';
import { Anime } from './types/Anime'
import { Music } from './types/Music';
import { SelectedListItem } from './types';


type ListContextType = {
  selectedList: SelectedListItem[];
  setSelectedList: React.Dispatch<React.SetStateAction<SelectedListItem[]>>;
};

  

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [selectedList, setSelectedList] = useState<SelectedListItem[]>([]);

  return (
    <ListContext.Provider value={{ selectedList, setSelectedList }}>
      {children}
    </ListContext.Provider>
  );
};


export const useSelectedList = (): ListContextType => {
    const context = useContext(ListContext);
    if(!context)
    {
        throw new Error("useSelectedList must be used within a ListProvider");
    }
    return context;
}