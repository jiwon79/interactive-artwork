import { MainPage } from "@pages/main";
import { SolidTextPage } from "@pages/solidText";
import { JElement } from "@core/element";

interface RouteInfo {
  path: string;
  title: string;
  page: any;
}


const routes: RouteInfo[] = [
  {path: "/", title: 'Interactive Artwork', page: MainPage},
  {path: "/solid-text", title: 'Drag Donut', page: SolidTextPage},
  // {path: "/crowd", title: "Crowd Simulation", component: CrowdPage}
];

interface RouteState {
  path: string;
}

export class Route extends JElement<RouteState, {}> {
  constructor() {
    super({path: '/'}, {})
  }

  protected createElements() {
    const path = window.location.pathname;
    const route = routes.find((route) => route.path === path);
    if (route === undefined) {
      return;
    }

    document.title = route.title;
    this.append(new route.page());
  }

  private _onPopState() {
    this.setState({path: window.location.pathname})
  }

  connectedCallback() {
    window.addEventListener('popstate', this._onPopState)
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onPopState)
  }
}

customElements.define("route-wrap", Route);

