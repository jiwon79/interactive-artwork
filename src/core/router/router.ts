import { JElement, property } from '@core/element';

export interface RouteInfo {
  path: string;
  title: string;
  page: typeof JElement;
}

interface RouterProps {
  routes: RouteInfo[];
}

export class Router extends JElement {
  private readonly props: RouterProps;

  @property()
  private _path: string = window.location.pathname;

  constructor(props: RouterProps) {
    super();
    this.props = props;
  }

  createElements() {
    const route = this.props.routes.find((route) => route.path === this._path);
    if (route === undefined) {
      return;
    }

    document.title = route.title;
    this.append(new route.page());
  }

  private _onPopState() {
    this._path = window.location.pathname;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('popstate', this._onPopState);
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._onPopState);
  }
}

customElements.define('route-wrap', Router);
