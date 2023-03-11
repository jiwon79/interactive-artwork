export interface StateType {}

class Component<S extends StateType> {
  target: Element;
  state: S;

  constructor(target: Element) {
    this.target = target;
    this.state = {} as S;

    this.setUp();
    this.mount();
    this.setEvent();
  }

  template(): string | void {}

  setUp() {}
  setEvent() {}

  mount() {
    this.render();
    this.didMount();
  }

  update() {
    this.render();
    this.didUpdate();
  }

  didMount() {}
  didUpdate() {}

  setState(newState: Partial<S>) {
    const nextState = { ...this.state, ...newState }
    if (JSON.stringify(this.state) === JSON.stringify(nextState)) return;

    this.state = nextState;
    this.update();
    this.setEvent();
  }

  render() {
    const template = this.template();
    if (!template) return;
    this.target.innerHTML = template;
  }

}

export default Component;
