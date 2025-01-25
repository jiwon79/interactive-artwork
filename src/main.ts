import { type RouteInfo, Router } from '@core/router/router';
import { MainPage } from '@pages/main/MainPage';
import { SolidTextPage } from '@pages/solidText';
import { WaveGridPage } from './pages/wave-grid/WaveGridPage';

const routes: RouteInfo[] = [
  { path: '/', title: 'Interactive Artwork', page: MainPage },
  { path: '/solid-text', title: 'Drag Donut', page: SolidTextPage },
  { path: '/wave-grid', title: 'Wave Grid', page: WaveGridPage },
];

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app')!;
  app.append(new Router({ routes: routes }));
});
