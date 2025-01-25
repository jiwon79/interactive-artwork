import { type RouteInfo, Router } from '@core/router/router';
import { MainPage } from '@pages/main/MainPage';
import { SolidTextPage } from '@pages/solidText';
import { WindowBallPage } from './pages/window-ball/page/WindowBallPage';

const routes: RouteInfo[] = [
  { path: '/', title: 'Interactive Artwork', page: MainPage },
  { path: '/solid-text', title: 'Drag Donut', page: SolidTextPage },
  { path: '/window-ball', title: 'Window Ball', page: WindowBallPage },
  // {path: "/crowd", title: "Crowd Simulation", component: CrowdPage}
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')!;
  app.append(new Router({ routes: routes }));
});
