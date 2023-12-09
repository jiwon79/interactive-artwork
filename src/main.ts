import { type RouteInfo, Router } from "@core/router/router";
import { MainPage } from "@pages/main";
import { SolidTextPage } from "@pages/solidText";

const routes: RouteInfo[] = [
  {path: "/", title: 'Interactive Artwork', page: MainPage},
  {path: "/solid-text", title: 'Drag Donut', page: SolidTextPage},
  // {path: "/crowd", title: "Crowd Simulation", component: CrowdPage}
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')!
  app.append(new Router({routes: routes}));
})
