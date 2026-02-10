import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { authClient } from "~/lib/auth-client";
import { type ClientLoaderFunctionArgs } from "react-router";
import { db } from "drizzle/src/index";
import { task } from "drizzle/src/db/schema";
import { eq } from "drizzle-orm";
import type { Route } from "./+types/tasks";

export async function clientLoader({ params }: ClientLoaderFunctionArgs) {
  const { data: session, error } = await authClient.getSession();

  if (error || !session) {
    console.error(error);
    throw new Response("Unauthorized", { status: 401 });
  }

  const tasks = await db.select().from(task).where(eq(task.userId, session.user.id));
  if (tasks) console.log("Queried tasks");

  return { tasks, user: session.user };
}

export function HydrateFallback() {
  return <div>Loading tasks...</div>;
}

export default function Tasks({ loaderData }: Route.ComponentProps) {
  const [open, setOpen] = useState(false); // Tasks completed collapsible state
  const { tasks, user } = loaderData;

  console.log("Loaded tasks for user:", user);
  console.log("Tasks:", tasks);

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
            <Collapsible open={open} onOpenChange={setOpen} className="w-full">
              <CollapsibleTrigger className="flex flex-row justify-between items-center w-full text-neutral-300">
                Tasks completed
                <span>{open ? chevronUp : chevronDown}</span>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <ul className="flex flex-col gap-2 mt-2">
                  <li>
                    <TaskCard
                      title="Sample Task 3"
                      description="This is a sample task description. 3"
                      completed={true}
                    />
                  </li>
                  <li>
                    <TaskCard
                      title="Sample Task 4"
                      description="This is a sample task description 4."
                      completed={true}
                    />
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
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
      <AvatarDropdown />
    </header>
  );
}

export function AvatarDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 dark">
        <DropdownMenuGroup>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" onClick={async () => await authClient.signOut()}>
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
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TaskCard({
  title,
  description,
  completed = false,
}: {
  title: string;
  description: string;
  completed?: boolean;
}) {
  const [checked, setChecked] = useState(completed);

  return (
    // @ts-expect-error I think it expects types from radix ui but i used base ui (from shadcn)
    <Item size="xs" className="group">
      <ItemMedia variant="image">
        <Checkbox
          className="size-5"
          onCheckedChange={(checkedState) => {
            setChecked(!checked);
            console.log("Task ", title, " set to ", checkedState);
          }}
          checked={checked}
        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className={completed ? "line-through" : ""}>
          {title}
        </ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              className="-translate-y-3.5 group-hover:visible invisible"
            >
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
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dark">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => console.log("editing task ", title)}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => console.log("deleted task ", title)}
              >
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
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
                Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}

const chevronDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const chevronUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 15.75 7.5-7.5 7.5 7.5"
    />
  </svg>
);
