const STATE_KEY = 'data-state';

export class JElement<S extends {}> extends HTMLElement {
  protected state: S;

  protected constructor(initialState: S) {
    super();
    this.state = initialState;
  }

  protected setState(state: Partial<S>) {
    this.state = { ...this.state, ...state };
    this.setAttribute(STATE_KEY, JSON.stringify(this.state));
  }

  static observedAttributes = [STATE_KEY];

  connectedCallback() {
    this.setAttribute(STATE_KEY, JSON.stringify(this.state));
  }

  disconnectedCallback() {}

  attributeChangedCallback() {
    this.clearElements();
    this.createElements();
  }

  protected clearElements() {
    this.innerHTML = '';
  }

  protected createElements() {}
}
