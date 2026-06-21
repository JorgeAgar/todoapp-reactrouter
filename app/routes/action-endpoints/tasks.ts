import { auth } from "~/lib/auth";
import { db } from "drizzle/src/index";
import { task } from "drizzle/src/db/schema";
import type { Route } from "../+types/tasks";
import { eq } from "drizzle-orm";

type task = typeof task.$inferInsert;

export async function action({ request }: Route.ActionArgs) {
  // console.log("llegó la action");
  const t1 = performance.now();
  const session = await auth.api.getSession({ headers: request.headers });
  const t2 = performance.now();
  console.log(`Session retrieval took ${t2 - t1} ms.`);
  // this is why this auth method isn't ideal for a todo
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

  try {
    await db.insert(task).values(newTask);
  } catch (error) {
    console.error("Error inserting task: ", error);
    throw new Response("Internal Server Error", { status: 500 });
  }

  return { success: true };
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
  } else if (request.method === "DELETE") {
    const formData = await request.formData();
    const taskId = formData.get("id") as string;

    await db.delete(task).where(eq(task.id, taskId));
    return null;
  }
  throw new Response("Method Not Allowed", { status: 405 });
}