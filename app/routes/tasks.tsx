import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

export default function Tasks() {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full h-full">
          <Header />
          <div className="bg-yellow-200 w-full">tasks</div>
        </main>
      </SidebarProvider>
    </div>
  );
}

function Header() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="w-full flex flex-row justify-between items-center bg-black h-12 px-3">
      <Button
        variant="ghost"
        size="icon"
        className="text-white"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </Button>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </header>
  );
}

function AppSidebar() {
  return (
    <Sidebar side="left" collapsible="offcanvas">
      <SidebarContent className="bg-black">
        <SidebarGroup>
          <Button
            variant={"ghost"}
            className="text-white"
            onClick={() => console.log("test")}
          >
            Test
          </Button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
