export interface SidebarItem {
  title: string;
  url: string;
  icon?: string;
  badge?: string;
}

export interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export type SidebarItems = SidebarGroup[];
