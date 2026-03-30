import { useState } from "react";
import clsx from "clsx";
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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { auth } from "~/lib/auth";
import { authClient } from "~/lib/auth-client";
import { db } from "drizzle/src/index";
import { task } from "drizzle/src/db/schema";
import { eq } from "drizzle-orm";
import type { Route } from "./+types/tasks";
import { useNavigate, useFetcher, useSubmit, Link, useNavigation } from "react-router";

export async function loader({ request }: { request: Request }) {
  const session = await auth.api.getSession({ headers: request.headers });

  // console.log("request: ", request);

  if (!session) throw new Response("Unauthorized", { status: 401 });

  const tasks = await db
    .select()
    .from(task)
    .where(eq(task.userId, session.user.id));
  if (tasks) console.log("Queried tasks");

  return { tasks, user: session.user };
}

export default function Tasks({ loaderData }: Route.ComponentProps) {
  const { tasks, user } = loaderData;

  // console.log("Loaded tasks for user:", user);
  // console.log("Tasks:", tasks);

  const tasksCompleted = tasks.filter((task) => task.completedAt != null);
  const tasksNotCompleted = tasks.filter((task) => !task.completedAt);

  return (
    <main className="w-full h-svh bg-black">
      <Header user={user} />
      <div className="bg-black w-full h-full flex items-center justify-center p-4">
        <Card className="dark w-xl">
          <CardHeader className="flex flex-row justify-between items-center content-center">
            <CardTitle>Your Tasks</CardTitle>
            {/* <CardDescription>Group Description (optional)</CardDescription> */}
            <CardAction>
              <AddTask />
            </CardAction>
          </CardHeader>
          <CardContent>
            {tasksNotCompleted.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {tasksNotCompleted.map((task) => (
                  <li key={task.id}>
                    <TaskCard task={task} />
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState />
            )}
          </CardContent>
          <CardFooter>
            <TasksCompleted tasks={tasksCompleted} />
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}

function EmptyState() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">{checkCircle}</EmptyMedia>
        {/* <EmptyTitle>No data</EmptyTitle> */}
        <EmptyDescription>All tasks completed!</EmptyDescription>
      </EmptyHeader>
      {/* <EmptyContent>
        <Button>Add data</Button>
      </EmptyContent> */}
    </Empty>
  );
}

function AddTask() {
  let fetcher = useFetcher();
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  console.log("addtask dialog state: ", open)
  // console.log("fetcher: ", fetcher);
  if(open && fetcher.state === "idle" && fetcher.data?.success && submitting) {
    setOpen(false);
    setSubmitting(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <HoverCard openDelay={1000} closeDelay={50}>
        <HoverCardTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="rounded-full">
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
          </DialogTrigger>
        </HoverCardTrigger>
        <HoverCardContent
          className="dark text-xs font-normal w-fit h-fit py-1 px-2 -translate-y-1.5"
          side="right"
        >
          Add task
        </HoverCardContent>
      </HoverCard>
      <DialogContent className="dark">
        <DialogHeader className="text-white">
          <DialogTitle>Add Task</DialogTitle>
        </DialogHeader>
        <fetcher.Form
          method="post"
          className="flex flex-col gap-8 items-start"
          onSubmit={() => setSubmitting(true)}
          action="/action/tasks"
        >
          <FieldGroup className="text-white">
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input id="title" autoComplete="off" required name="title" />
              {/* <FieldDescription>
                              This appears on invoices and emails.
                            </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="description">
                Description (optional)
              </FieldLabel>
              <Input id="description" autoComplete="off" name="description" />
              {/* <FieldError>Choose another username.</FieldError> */}
            </Field>
          </FieldGroup>
          <DialogFooter className="flex flex-row justify-end w-full">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="self-end"
              disabled={fetcher.state !== "idle"}
            >
              Add Task
              {fetcher.state !== "idle" && <Spinner data-icon="inline-start" />}
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}

type taskType = typeof task.$inferInsert;
function TasksCompleted({ tasks }: { tasks: taskType[] }) {
  const [open, setOpen] = useState(false); // Tasks completed collapsible state

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full">
      <CollapsibleTrigger className="flex flex-row justify-between items-center w-full text-neutral-300">
        Tasks completed
        <span>{open ? chevronUp : chevronDown}</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex flex-col gap-2 mt-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskCard task={task} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

type user = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined;
};

function Header({ user }: { user: user }) {
  return (
    <header className="w-full flex flex-row justify-between items-center bg-black h-12 px-3">
      <Link to="/">
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
      </Link>
      <AvatarDropdown user={user} />
    </header>
  );
}

export function AvatarDropdown({ user }: { user: user }) {
  let navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage
              src={user.image || undefined}
              alt="User profile picture"
            />
            <AvatarFallback>
              {user.name.substring(0, 1).toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32 dark">
        <DropdownMenuGroup>
          <DropdownMenuItem>{user.name}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            onClick={async () =>
              await authClient.signOut({
                fetchOptions: { onSuccess: () => navigate("/") },
              })
            }
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

function TaskCard({ task }: { task: taskType }) {
  const [checked, setChecked] = useState(task.completedAt != null);
  const [deleting, setDeleting] = useState(false);
  let submit = useSubmit();

  // const navigation = useNavigation();
  // console.log(`Task ${task.title} navigation state:`, navigation.state);
  // console.log(`Task ${task.title} formAction: `, navigation.);

  return (
    // @ts-expect-error I think it expects types from radix ui but i used base ui (from shadcn)
    <Item size="xs" className="group">
      <ItemMedia variant="image">
        <Checkbox
          className="size-5"
          onCheckedChange={(checkedState) => {
            setChecked(!checked);
            console.log("Task ", task.title, " set to ", checkedState);
            submit(
              {
                id: task.id,
                completed: checkedState,
              },
              {
                method: "PATCH",
                action: `/action/tasks`,
                preventScrollReset: true,
                navigate: false,
              },
            );
          }}
          checked={checked}

        />
      </ItemMedia>
      <ItemContent>
        <ItemTitle className={clsx(checked && 'line-through', deleting && 'opacity-50 italic')}>
          {task.title}
        </ItemTitle>
        {task.description && (
          <ItemDescription className={clsx(deleting && 'opacity-50 italic')}>{task.description}</ItemDescription>
        )}
      </ItemContent>
      <ItemActions>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon-xs"
              disabled={deleting}
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
                onClick={() => console.log("editing task ", task.title)}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                variant="destructive"
                onClick={() => {
                  console.log("deleted task ", task.title);
                  submit(
                    { id: task.id },
                    {
                      method: "DELETE",
                      action: `/action/tasks`,
                      preventScrollReset: true,
                      navigate: false,
                    },
                  );
                  setDeleting(true);
                }}
                disabled={deleting}
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
                {deleting && <Spinner data-icon="inline-start" />}
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

const checkCircle = (
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
      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
    />
  </svg>
);
