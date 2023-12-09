const STATE_KEY = 'data-state';
const REF_KEY = 'data-ref';

export abstract class JElement<S extends {}, R extends {}> extends HTMLElement {
  protected state: S;
  protected refs: R;

  protected constructor(initialState: S, initialRefs: R) {
    super();
    this.state = initialState;
    this.refs = initialRefs;
  }

  protected setState(state: Partial<S>) {
    this.state = { ...this.state, ...state };
    this.setAttribute(STATE_KEY, JSON.stringify(this.state));
  }

  protected setRefs(refs: Partial<R>) {
    this.refs = { ...this.refs, refs };
    this.setAttribute(REF_KEY, JSON.stringify(this.refs));
  }

  static observedAttributes = [STATE_KEY];

  connectedCallback() {
    this.setAttribute(STATE_KEY, JSON.stringify(this.state));
    this.setAttribute(REF_KEY, JSON.stringify(this.refs));
  }

  attributeChangedCallback() {
    this.clearElements();
    this.createElements();
  }

  protected clearElements() {
    this.innerHTML = '';
  }

  abstract createElements(): void;
}
