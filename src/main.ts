import { Route } from "@pages/common/router";

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')!
  const route = new Route();
  app.append(route);
})
