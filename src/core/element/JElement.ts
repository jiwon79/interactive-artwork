import { PropertyOptions } from './decorators';

const DATA_PREFIX = 'data-';

export class JElement extends HTMLElement {
  // NOTE: property 초기화 시 생성자가 모두 호출 되기 전 createElements의 호출을 막기 위해 추가
  protected _isConnected: boolean = false;
  protected static propertyMap: Map<PropertyKey, PropertyOptions> = new Map();

  protected constructor() {
    super();
  }

  static get observedAttributes() {
    return Array.from(this.propertyMap.values()).reduce((names, value) => {
      if (value.isObservable) {
        names.push(DATA_PREFIX + String(value.name).toLowerCase());
      }
      return names;
    }, [] as string[]);
  }

  connectedCallback() {
    this._isConnected = true;
    this.createElements();
  }

  disconnectedCallback() {}

  attributeChangedCallback() {
    if (!this._isConnected) {
      return;
    }
    this.clearElements();
    this.createElements();
  }

  protected clearElements() {
    this.innerHTML = '';
  }

  protected createElements() {}

  static createProperty(name: PropertyKey, options: PropertyOptions) {
    this.propertyMap.set(name, options);

    const key = Symbol.for(String(name));
    const { get, set } = Object.getOwnPropertyDescriptor(
      this.prototype,
      name,
    ) ?? {
      get(this: JElement) {
        return this[key as unknown as keyof typeof this];
      },
      set(this: JElement, newValue: unknown) {
        (this as unknown as Record<string | symbol, unknown>)[key] = newValue;
      },
    };

    Object.defineProperty(this.prototype, name, {
      get() {
        return get?.call(this);
      },
      set(this: JElement, newValue: unknown) {
        const oldValue = get?.call(this);
        set!.call(this, newValue);
        this.updateProperty(name, oldValue, newValue);
      },
      configurable: true,
      enumerable: true,
    });
  }

  updateProperty(name: PropertyKey, oldValue: unknown, newValue: unknown) {
    console.log(name, ':', oldValue, '>', newValue);
    const options = this.getPropertyOptions(name);
    if (options?.name) {
      this.setAttribute(DATA_PREFIX + String(options.name), String(newValue));
    }
  }

  getPropertyOptions(name: PropertyKey) {
    return (this.constructor as typeof JElement).propertyMap.get(name);
  }
}
