import { RadioInput } from '@pages/solidText/component/RadioInput/RadioInput';
import { ColorShaderType } from '@pages/solidText/utils/colorShader';
import { JElement } from '@core/element';
import styles from './RadioWrap.module.scss';

interface RadioWrapProps {
  selectedColorShaderType: ColorShaderType;
  onChange: (colorShaderType: ColorShaderType) => void;
}

export class RadioWrap extends JElement {
  private readonly _props: RadioWrapProps;

  constructor(props: RadioWrapProps) {
    super();
    this._props = props;
    this.classList.add(styles.container);
  }

  protected createElements() {
    super.createElements();
    const greyRadioInput = new RadioInput({
      label: 'Grey',
      onChange: () => {
        this._props.onChange('grey');
      },
      checked: this._props.selectedColorShaderType === 'grey',
    });

    const rainbowRadioInput = new RadioInput({
      label: 'Rainbow',
      onChange: () => {
        this._props.onChange('rainbow');
      },
      checked: this._props.selectedColorShaderType === 'rainbow',
    });

    const redGradationRadioInput = new RadioInput({
      label: 'Red-Gradation',
      onChange: () => {
        this._props.onChange('red-gradation');
      },
      checked: this._props.selectedColorShaderType === 'red-gradation',
    });

    const changeRainbowRadioInput = new RadioInput({
      label: 'Changing-Rainbow',
      onChange: () => {
        this._props.onChange('change-rainbow');
      },
      checked: this._props.selectedColorShaderType === 'change-rainbow',
    });

    this.append(greyRadioInput);
    this.append(rainbowRadioInput);
    this.append(redGradationRadioInput);
    this.append(changeRainbowRadioInput);
  }
}

customElements.define('radio-wrap', RadioWrap);
