import { MainPage } from "@pages/main";
import { SolidTextPage } from "@pages/solidText";

interface RouteInfo {
  path: string;
  title: string;
  pageElement: any;
}


const routes: RouteInfo[] = [
  {path: "/", title: 'Interactive Artwork', pageElement: MainPage},
  {path: "/solid-text", title: 'Drag Donut', pageElement: SolidTextPage},
  // {path: "/crowd", title: "Crowd Simulation", component: CrowdPage}
];

export class Route extends HTMLElement {
  private _path: string = "/";

  static get observedAttributes() {
    return ["data-path"];
  }

  connectedCallback() {
    const path = window.location.pathname;
    const route = routes.find((route) => route.path === path);
    if (!route) return;

    document.title = route.title;
    const pageElement = new route.pageElement();
    this.append(pageElement);
  }

  constructor() {
    super();

    window.addEventListener("popstate", () => {
      this._path = window.location.pathname;
      this.setAttribute("data-path", this._path);
    });
  }
}

customElements.define("route-wrap", Route);

