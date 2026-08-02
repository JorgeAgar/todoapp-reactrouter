import type { Route } from "./+types/home";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
  ItemDescription,
} from "@/components/ui/item";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Todo — Get it done, quietly" },
    {
      name: "description",
      content: "A calm, keyboard-fast todo app. No clutter, no ceremony.",
    },
  ];
}

const preview = [
  { title: "Ship the landing page", description: "Final design" },
  { title: "Review PR #4", description: null },
  { title: "Water the plants", description: "The big one first" },
];

export default function Home() {
  return (
    <main className="dark min-h-svh w-full bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.07),transparent_60%)]" />

      <Nav />

      <section className="relative mx-auto flex max-w-6xl flex-col items-center gap-16 px-6 pt-20 pb-24 md:pt-28">
        <div className="flex max-w-2xl flex-col items-center gap-6 text-center">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-neutral-300">
            Free while in beta
          </span>
          <h1 className="text-5xl font-semibold tracking-tight text-balance md:text-6xl">
            Get it done,
            <span className="text-neutral-500"> quietly.</span>
          </h1>
          <p className="max-w-md text-pretty text-neutral-400 md:text-lg">
            A todo app that stays out of your way. Add a task, check it off,
            move on. That&apos;s the whole product.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/signup">Start for free</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/login">I already have an account</Link>
            </Button>
          </div>
        </div>

        <Card className="w-full max-w-xl shadow-2xl shadow-black">
          <CardHeader className="flex flex-row items-center content-center justify-between">
            <CardTitle>Your Tasks</CardTitle>
            <CardAction>
              <Button variant="ghost" size="icon-sm" className="rounded-full">
                {plus}
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {preview.map((task) => (
                <li key={task.title}>
                  {/* @ts-expect-error base ui / radix type mismatch, same as tasks.tsx */}
                  <Item size="xs">
                    <ItemMedia variant="image">
                      <Checkbox className="size-5" disabled />
                    </ItemMedia>
                    <ItemContent>
                      <ItemTitle>{task.title}</ItemTitle>
                      {task.description && (
                        <ItemDescription>{task.description}</ItemDescription>
                      )}
                    </ItemContent>
                  </Item>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="grid w-full max-w-4xl gap-10 border-t border-white/10 pt-14 sm:grid-cols-3">
          {[
            {
              title: "Nothing to learn",
              body: "One list, one button. You already know how to use it.",
            },
            {
              title: "Completed stays tucked away",
              body: "Finished tasks collapse out of sight until you want them.",
            },
            {
              title: "Yours alone",
              body: "Your account, your tasks. No teams, no feeds, no noise.",
            },
          ].map((f) => (
            <div key={f.title} className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">{f.title}</h3>
              <p className="text-sm text-neutral-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
      <Link to="/" className="text-sm font-medium tracking-tight">
        Todo
      </Link>
      <nav className="flex items-center gap-2">
        <Button asChild variant="ghost" size="sm">
          <Link to="/login">Log in</Link>
        </Button>
        <Button asChild size="sm">
          <Link to="/signup">Sign up</Link>
        </Button>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="relative mx-auto flex max-w-6xl items-center justify-between border-t border-white/10 px-6 py-8 text-sm text-neutral-500">
      <span>Todo</span>
      <Link to="/tasks" className="hover:text-neutral-300">
        Open the app →
      </Link>
    </footer>
  );
}

const plus = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);
