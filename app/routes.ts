import { type RouteConfig, route, index, prefix } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("tasks", "routes/tasks.tsx"),
  route("signup", "routes/signup.tsx"),
  route("login", "routes/login.tsx"),
  ...prefix("api", [
    ...prefix("auth", [
      route("*", "routes/auth-catcher.ts"),
    ])
  ])
] satisfies RouteConfig;
