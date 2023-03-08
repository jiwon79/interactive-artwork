import MainPage from "./pages/main";
import Component from "./model/component";
import SolidTextPage from "./pages/solidText";

interface RouteInfo {
  path: string;
  component: any;
}

declare global {
  interface WindowEventMap {
    "historyChange": HistoryChangeEvent;
  }
}

interface HistoryChangeEvent extends Event {
  detail: {
    to: string;
    isReplace: boolean;
  }
}

const routes: RouteInfo[] = [
  {path: "/", component: MainPage},
  {path: "/solid-text", component: SolidTextPage},
];

class Route extends Component {
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

export const navigate = (to: String, isReplace: boolean = false) => {
  const historyChangeEvent = new CustomEvent("historyChange", {
    detail: {
      to,
      isReplace,
    },
  });

  dispatchEvent(historyChangeEvent);
};

