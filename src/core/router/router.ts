import { JElement } from '@core/element';

export interface RouteInfo {
  path: string;
  title: string;
  page: typeof JElement<object>;
}

interface RouterProps {
  routes: RouteInfo[];
}

interface RouterState {
  path: string;
}

export class Router extends JElement<RouterState> {
  private readonly props: RouterProps;

  constructor(props: RouterProps) {
    super({ path: '/' });
    this.props = props;
  }

  createElements() {
    const path = window.location.pathname;
    const route = this.props.routes.find((route) => route.path === path);
    if (route === undefined) {
      return;
    }

    document.title = route.title;
    this.append(new route.page({}));
  }

  private _onPopState() {
    this.setState({ path: window.location.pathname });
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
