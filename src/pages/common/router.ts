import Component, {StateType} from "@src/core/model/component";
import MainPage from "@pages/main";
import SolidTextPage from "@pages/solidText";

import {HistoryChangeEvent} from "./navigate";

interface RouteInfo {
  path: string;
  title: string;
  component: any;
}


const routes: RouteInfo[] = [
  {path: "/", title: 'Interactive Artwork', component: MainPage},
  {path: "/solid-text", title: 'Drag Donut', component: SolidTextPage},
];

class Route extends Component<StateType> {
  render() {
    const path = window.location.pathname;
    const route = routes.find((route) => route.path === path);
    if (!route) return;

    document.title = route.title;
    new route.component(this.target);
  }

  setEvent() {
    window.addEventListener("popstate", () => {
      this.render();
    });

    window.addEventListener("historyChange", (event: HistoryChangeEvent) => {
      const {to, isReplace} = event.detail;

      if (isReplace || to === location.pathname) {
        history.replaceState(null, "", to);
      } else {
        history.pushState(null, "", to);
      }

      this.render();
    });
  }
}

export default Route;
