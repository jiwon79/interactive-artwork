export interface RadioInputProps {
  label: string;
  onChange: () => void;
  checked: boolean;
}

export class RadioInput extends HTMLElement {
  private _input: HTMLInputElement;
  private readonly _onChange: () => void;

  static get observedAttributes() {
    return ['checked'];
  }

  attributeChangedCallback(name: string, newValue: string) {
    if (name === 'data-checked') {
      this._input.checked = newValue === 'true';
    }
  }

  constructor({ label, onChange, checked }: RadioInputProps) {
    super();
    this._onChange = onChange;

    const input = document.createElement('input');
    input.type = 'radio';
    input.onclick = () => {
      this._onChange();
    };
    input.checked = checked;
    input.id = `radio-${label}`;
    this.setAttribute('data-checked', String(checked));
    this._input = input;

    const labelElement = document.createElement('label');
    labelElement.innerText = label;
    labelElement.htmlFor = input.id;

    this.append(input);
    this.append(labelElement);
  }
}

customElements.define('radio-input', RadioInput);
