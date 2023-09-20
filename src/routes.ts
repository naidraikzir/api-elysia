import { Elysia } from "elysia";
import { globSync } from "glob";
import { swagger } from "./plugins";

const files = globSync(`${import.meta.dir}/modules/*/index.ts`);
const modules = [];
for (let index = 0; index < files.length; index++) {
  const module = await import(files[index]);
  modules.push(module);
}
const resolved = await Promise.all(modules);

export const routes = new Elysia({ name: "routes" }).use((app) => {
  app.use(swagger);
  for (let index = 0; index < resolved.length; index++) {
    app.use(resolved[index].default);
  }
  return app;
});
