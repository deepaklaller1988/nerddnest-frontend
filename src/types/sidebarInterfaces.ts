export interface MenuLink {
    name: string;
    href: string;
  }
  
  export interface MenuItem {
    name: string;
    icon: React.ReactNode;
    links: MenuLink[];
  }
  
  export interface MenuItemsProps {
    toggleSection: (sectionName: string) => void;
    openSections: { [key: string]: boolean };
  }



 export interface MenuItemProp {
    name: string;
    icon: React.ReactNode;
    links?: { name: string; href: string }[];
    isOpen: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
  }
  
  