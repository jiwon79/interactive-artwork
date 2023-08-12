import Component, {StateType} from "@src/core/model/component";
import MainPage from "@pages/main";
import SolidTextPage from "@pages/solidText";

import {HistoryChangeEvent} from "./navigate";

interface RouteInfo {
  path: string;
  component: any;
}


const routes: RouteInfo[] = [
  {path: "/", component: MainPage},
  {path: "/solid-text", component: SolidTextPage},
];

class Route extends Component<StateType> {
  render() {
    const path = window.location.pathname;
    const route = routes.find((route) => route.path === path);
    if (!route) return;

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
