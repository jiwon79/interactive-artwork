import { JLabel } from '@core/primitives/JLabel';
import { JInput } from '@core/primitives/JInput';
import { JElement } from '@core/element';
import styles from './RadioInput.module.scss';

export interface RadioInputProps {
  label: string;
  onChange: () => void;
  checked: boolean;
}

export class RadioInput extends JElement {
  private readonly _props: RadioInputProps;

  constructor(props: RadioInputProps) {
    super();
    this._props = props;
    this.classList.add(styles.container);
  }

  protected createElements() {
    super.createElements();

    const inputElement = new JInput({
      id: `radio-${this._props.label}`,
      className: styles.radio,
      type: 'radio',
      onClick: () => {
        this._props.onChange();
      },
      checked: this._props.checked,
    });
    const labelElement = new JLabel({
      htmlFor: inputElement.id,
      innerText: this._props.label,
      className: styles.label,
    });

    this.append(inputElement);
    this.append(labelElement);
  }
}

customElements.define('radio-input', RadioInput);
