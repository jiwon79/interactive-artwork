import MainPage from "./pages/main";
import Component from "./model/component";
import SolidTextPage from "./pages/solidText";

interface RouteInfo {
  path: string;
  component: any;
}

class Route extends Component {
  private routes: RouteInfo[] = [];

  setUp() {
    this.routes = [
      {path: "/", component: MainPage},
      {path: "/solid-text", component: SolidTextPage},
    ];
  }

  render() {
    const path = window.location.pathname;
    const route = this.routes.find((route) => route.path === path);
    if (!route) return;

    new route.component(this.target);
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

