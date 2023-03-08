class Component {
  target: Element;

  constructor(target: Element) {
    this.target = target;

    this.mount();
    this.setEvent();
  }

  template(): string | void {}

  setEvent() {}

  mount() {
    this.render();
    this.didMount();
  }

  didMount() {}

  render() {
    const template = this.template();
    if (!template) return;
    this.target.innerHTML = template;
  }

}

export default Component;
