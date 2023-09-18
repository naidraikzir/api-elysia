import { globSync } from "glob";
import { app } from ".";

const files = globSync(`${import.meta.dir}/modules/**/index.ts`);
const modules = []
for (let index = 0; index < files.length; index++) {
  const module = await import(files[index]);
  modules.push(module);
}
const resolved = await Promise.all(modules)

export const routes = (server: typeof app) => {
  for (let index = 0; index < resolved.length; index++) {
    server.use(resolved[index].default);
  }
};
