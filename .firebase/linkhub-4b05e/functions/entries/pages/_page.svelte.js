import { s as subscribe } from "../../chunks/utils.js";
import { c as create_ssr_component, e as escape } from "../../chunks/ssr.js";
import { u as userData } from "../../chunks/firebase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  $$unsubscribe_userData();
  return `${$$result.head += `<!-- HEAD_svelte-1psfjj1_START -->${$$result.title = `<title>Link.hub - a place for links</title>`, ""}<meta name="description" content="Demo project for Java and Web Devlopment"><!-- HEAD_svelte-1psfjj1_END -->`, ""} <main class="flex w-full min-h-screen"><div class="hero bg-base-200"><div class="hero-content text-center"><div class="w-full"><h1 class="text-7xl font-bold" data-svelte-h="svelte-k0qz0m">Link.hub</h1> <p class="py-6 text-2xl" data-svelte-h="svelte-180kniz">One link to share your entire portfolio</p> ${$userData?.username ? `<a href="${"/" + escape($userData.username, true) + "/edit"}" class="btn btn-primary">Edit Profile</a>` : `<a href="/login" class="btn btn-primary" data-svelte-h="svelte-izohf9">Get Started</a>`}</div></div></div></main>`;
});
export {
  Page as default
};
