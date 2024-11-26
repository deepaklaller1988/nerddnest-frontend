export interface MenuLink {
    name: string;
    href: string;
  }
  
  export interface MenuItem {
    name: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | React.ReactNode; 
        links?: MenuLink[];
        action?:any
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
  
  export interface TabContentProps<T extends string, Item> {
    title: string;
    items: Item[];
    isLoading: boolean;
    noItemsMessage: string;
    tabs: { label: string; count: number; tabName: T }[];
    onTabSwitch: (tab: T) => void;
    activeTab: T;
    renderItem: (item: Item) => JSX.Element;
    viewAllText: string;
  }
  