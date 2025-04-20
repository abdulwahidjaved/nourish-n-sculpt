
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Utensils, 
  Dumbbell, 
  LineChart, 
  User, 
  Settings 
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export function AppSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      title: "Meal Planner",
      path: "/meals",
      icon: <Utensils className="h-5 w-5" />
    },
    {
      title: "Workout Planner",
      path: "/workouts",
      icon: <Dumbbell className="h-5 w-5" />
    },
    {
      title: "Progress",
      path: "/progress",
      icon: <LineChart className="h-5 w-5" />
    },
    {
      title: "Profile",
      path: "/profile",
      icon: <User className="h-5 w-5" />
    }
  ];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton 
                    asChild
                    isActive={
                      item.path === "/"
                        ? currentPath === "/"
                        : currentPath.startsWith(item.path)
                    }
                  >
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="#">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
