class Component {
  target: Element;

  constructor(target: Element) {
    this.target = target;

    this.mount();
  }

  template(): string | void {}

  didMount() {}

  render() {
    const template = this.template();
    if (!template) return;
    this.target.innerHTML = template;
  }

  mount() {
    this.render();
    this.didMount();
  }
}

export default Component;
