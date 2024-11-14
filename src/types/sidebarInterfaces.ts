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


  export interface MenuItemsProps {
    toggleSection: (sectionName: string) => void;
    openSections: { [key: string]: boolean };
  }
  
  