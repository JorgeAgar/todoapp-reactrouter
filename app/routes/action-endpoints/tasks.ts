import { auth } from "~/lib/auth";
import { db } from "drizzle/src/index";
import { task } from "drizzle/src/db/schema";
import type { Route } from "../+types/tasks";
import { eq } from "drizzle-orm";
import { redirect } from "react-router";

type task = typeof task.$inferInsert;

export async function action({ request }: Route.ActionArgs) {
  // console.log("llegó la action");
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) throw new Response("Unauthorized", { status: 401 });

  if (request.method === "POST") {
    const formData = await request.formData();
  // console.log("Form data: ", formData);

  const now = Date.now().toString();

  const newTask: task = {
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    userId: session.user.id,
    createdAt: now,
    updatedAt: now,
    completedAt: null,
    deadline: null,
    id: crypto.randomUUID(),
  };

  // console.log("Inserting new task: ", newTask);

  await db.insert(task).values(newTask);

  return null;
  } else if (request.method === "PATCH") {
    const formData = await request.formData();
    const taskId = formData.get("id") as string;
    const completed = formData.get("completed") === "true";
    const now = Date.now().toString();
    const completedAt = completed ? now : null;

    // console.log("Form data for PATCH: ", formData);

    await db.update(task)
      .set({ updatedAt: now, completedAt: completedAt })
      .where(eq(task.id, taskId));
    
    return null;
  }
  throw new Response("Method Not Allowed", { status: 405 });
}