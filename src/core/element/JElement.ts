const STATE_KEY = 'data-state';

export class JElement<S extends {}, R extends {}> extends HTMLElement {
  protected state: S = {} as S;
  protected refs: R = {} as R;

  get stateAndRefs(): S & R {
    return {...this.state, ...this.refs};
  }

  constructor() {
    super();
    this.setAttribute(STATE_KEY, JSON.stringify(this.stateAndRefs));
  }

  static get observedAttributes() {
    return [STATE_KEY];
  }

  protected setState(state: S) {
    this.state = state;
    this.setAttribute(STATE_KEY, JSON.stringify(this.stateAndRefs));
  }

  attributeChangedCallback() {
    this.clearElements();
    this.createElements();
  }

  protected clearElements() {
    this.innerHTML = '';
  }

  protected createElements() {};
}
