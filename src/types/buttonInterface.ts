export interface ViewButtonProps {
    name: string;  
    onClick: () => void; 
    className:string
  }

 export interface TabButtonProps {
    label: string;
    count?: number;
    isActive: boolean;
    onClick: () => void;
  }