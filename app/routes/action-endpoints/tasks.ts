import { auth } from "~/lib/auth";
import { db } from "drizzle/src/index";
import { task } from "drizzle/src/db/schema";
import type { Route } from "../+types/tasks";

export async function action({ request }: Route.ActionArgs) {
  // console.log("llegó la action");

  if (request.method === "POST") {
    const formData = await request.formData();
  // console.log("Form data: ", formData);

  type NewTask = typeof task.$inferInsert;

  const session = await auth.api.getSession({ headers: request.headers });
  if (!session) throw new Response("Unauthorized", { status: 401 });

  const now = Date.now().toString();

  const newTask: NewTask = {
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
  } else if (request.method === "DELETE") {

  }
  throw new Response("Method Not Allowed", { status: 405 });
}