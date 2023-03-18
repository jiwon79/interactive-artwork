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
  }

  setEvent() {}
  addEvent<T extends Event>(eventType: string, selector: string, callback: (e: T) => void) {
    const children: Element[] = Array.from(this.target.querySelectorAll(selector));

    const isTarget = (target: Element) => children.includes(target) || target.closest(selector)

    this.target.addEventListener(eventType, (event: Event): boolean => {
      if (!isTarget(event.target as HTMLElement)) return false
      callback(event as T)

      return true
    })
  }

  render() {
    const template = this.template();
    if (!template) return;
    this.target.innerHTML = template;
  }

}

export default Component;
