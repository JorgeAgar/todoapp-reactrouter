import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

export default function Tasks() {
  return (
    <main className="w-full h-svh bg-black">
      <Header />
      <div className="bg-black w-full h-full flex items-center justify-center p-4">
        <Card className="dark w-xl">
          <CardHeader>
            <CardTitle>Group Name</CardTitle>
            <CardDescription>Group Description (optional)</CardDescription>
            <CardAction>
              <HoverCard openDelay={1000} closeDelay={50}>
                <HoverCardTrigger>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    className="rounded-full"
                    onClick={() => {
                      console.log("add task");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent
                  className="dark text-xs font-normal w-fit h-fit py-1 px-2 -translate-y-1.5"
                  side="right"
                >
                  Add task
                </HoverCardContent>
              </HoverCard>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              <li>
                <TaskCard
                  title="Sample Task"
                  description="This is a sample task description."
                />
              </li>
              <li>
              <TaskCard
                  title="Sample Task 2"
                  description="This is a sample task description 2."
                />
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <p>Tasks completed</p>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="w-full flex flex-row justify-between items-center bg-black h-12 px-3">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:bg-neutral-900 hover:text-white hover:transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
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

function TaskCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Item size="xs" className="group">
      <ItemMedia variant="image">
        <Checkbox className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button variant="ghost" size="icon-xs" className="-translate-y-3.5 group-hover:visible invisible">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
            />
          </svg>
        </Button>
      </ItemActions>
    </Item>
  );
}
