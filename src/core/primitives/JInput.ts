import {
  addBaseEventsListener,
  BaseProps,
  initBaseAttribute,
  removeBaseEventsListener,
} from './BaseProps';

type JInputType =
  | 'buton'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week';

interface JInputProp extends BaseProps {
  type?: JInputType;
  value?: string;
  placeholder?: string;
  checked?: boolean;
  min?: string;
  max?: string;
  onChange?: (event: Event) => void;
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  onInput?: (event: Event) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyDown?: (event: KeyboardEvent) => void;
}

export class JInput extends HTMLInputElement {
  private readonly _props: JInputProp;

  constructor(props: JInputProp = {}) {
    super();
    this._props = props;
    initBaseAttribute(this, this._props);
    props.type && (this.type = props.type);
    props.value && (this.value = props.value);
    props.placeholder && (this.placeholder = props.placeholder);
    props.checked && (this.checked = props.checked);
    props.min && (this.min = props.min);
    props.max && (this.max = props.max);
  }

  connectedCallback() {
    addBaseEventsListener(this, this._props);
    this._props.onChange &&
      this.addEventListener('change', this._props.onChange);
    this._props.onFocus && this.addEventListener('focus', this._props.onFocus);
    this._props.onBlur && this.addEventListener('blur', this._props.onBlur);
    this._props.onInput && this.addEventListener('input', this._props.onInput);
    this._props.onKeyUp && this.addEventListener('keyup', this._props.onKeyUp);
    this._props.onKeyDown &&
      this.addEventListener('keydown', this._props.onKeyDown);
  }

  disconnectedCallback() {
    removeBaseEventsListener(this, this._props);
    this._props.onChange &&
      this.removeEventListener('change', this._props.onChange);
    this._props.onFocus &&
      this.removeEventListener('focus', this._props.onFocus);
    this._props.onBlur && this.removeEventListener('blur', this._props.onBlur);
    this._props.onInput &&
      this.removeEventListener('input', this._props.onInput);
    this._props.onKeyUp &&
      this.removeEventListener('keyup', this._props.onKeyUp);
    this._props.onKeyDown &&
      this.removeEventListener('keydown', this._props.onKeyDown);
  }
}

customElements.define('j-input', JInput, { extends: 'input' });
