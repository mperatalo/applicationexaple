import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as taskService from "../services/taskService.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
  return new Response(`Redirecting to ${path}.`, {
    status: 303,
    headers: {
      "Location": path,
    },
  });
};

const addTask = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await taskService.create(name);

  return redirectTo("/tasks");
};

const viewTasks = async (request) => {
  const data = {
    tasks: await taskService.findAllNonCompletedTasks(),
  };

  return new Response(await renderFile("tasks.eta", data), responseDetails);
};

const viewTask = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
  
    const data = {
      task: await taskService.findById(urlParts[2]),
      currentWorkEntry: await workEntryService.findCurrentWorkEntry(urlParts[2]),
    };
  
    return new Response(await renderFile("task.eta", data), responseDetails);
};

export { addTask, viewTasks, viewTask};