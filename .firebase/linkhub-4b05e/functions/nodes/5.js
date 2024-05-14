import * as server from '../entries/pages/_username_/bio/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_username_/bio/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/[username]/bio/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.UeZ2ITmf.js","_app/immutable/chunks/scheduler.D-G8aooA.js","_app/immutable/chunks/index.DCB8CW87.js","_app/immutable/chunks/stores.CupLh097.js","_app/immutable/chunks/entry.Be71lHBN.js","_app/immutable/chunks/index.MOhgHwdo.js","_app/immutable/chunks/control.CYgJF_JY.js"];
export const stylesheets = [];
export const fonts = [];
