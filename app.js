import { serve } from "./deps.js";
import { configure } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as taskController from "./controllers/taskController.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return new Response(`Redirecting to /tasks.`, {
      status: 303,
      headers: {
        "Location": "/tasks",
      },
    });
  } else if (url.pathname === "/tasks" && request.method === "POST") {
    return await taskController.addTask(request);
  } else if (url.pathname === "/tasks" && request.method === "GET") {
    return await taskController.viewTasks(request);
  } else if (url.pathname.match("tasks/[0-9]+") && request.method === "GET") {
    return await taskController.viewTask(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

serve(handleRequest, { port: 7777 });