import { Route } from "@core/router/router";

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')!
  const route = new Route();
  app.append(route);
})
