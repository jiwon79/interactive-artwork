import { RadioInput } from '@pages/solidText/component/RadioInput';
import { ColorShaderType } from '@pages/solidText/utils/colorShader';
import { JElement } from '@core/element';

interface RadioWrapProps {
  selectedColorShaderType: ColorShaderType;
  onChange: (colorShaderType: ColorShaderType) => void;
}

export class RadioWrap extends JElement<{}> {
  private readonly _props: RadioWrapProps;

  constructor(props: RadioWrapProps) {
    super({});
    this._props = props;
  }

  protected createElements() {
    super.createElements();
    const greyRadioInput = new RadioInput({
      label: 'grey',
      onChange: () => {
        this._props.onChange('grey');
      },
      checked: this._props.selectedColorShaderType === 'grey',
    });

    const rainbowRadioInput = new RadioInput({
      label: 'rainbow',
      onChange: () => {
        this._props.onChange('rainbow');
      },
      checked: this._props.selectedColorShaderType === 'rainbow',
    });

    const redGradationRadioInput = new RadioInput({
      label: 'red-gradation',
      onChange: () => {
        this._props.onChange('red-gradation');
      },
      checked: this._props.selectedColorShaderType === 'red-gradation',
    });

    const changeRainbowRadioInput = new RadioInput({
      label: 'change-rainbow',
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
