import { RadioInput } from '@pages/solidText/component/RadioInput';
import { ColorShaderType } from '@pages/solidText/utils/colorShader';

interface RadioWrapProps {
  selectedColorShaderType: ColorShaderType;
  onChange: (colorShaderType: ColorShaderType) => void;
}

export class RadioWrap extends HTMLElement {
  private readonly _selectedColorType: ColorShaderType = 'grey';
  private readonly _onChange: (colorShaderType: ColorShaderType) => void;

  constructor({ selectedColorShaderType, onChange }: RadioWrapProps) {
    super();
    this._selectedColorType = selectedColorShaderType;
    this._onChange = onChange;
    this.setAttribute('data-selected-color-type', this._selectedColorType);
  }

  create() {
    const greyRadioInput = new RadioInput({
      label: 'grey',
      onChange: () => {
        this._onChange('grey');
      },
      checked: this._selectedColorType === 'grey',
    });

    const rainbowRadioInput = new RadioInput({
      label: 'rainbow',
      onChange: () => {
        this._onChange('rainbow');
      },
      checked: this._selectedColorType === 'rainbow',
    });

    const redGradationRadioInput = new RadioInput({
      label: 'red-gradation',
      onChange: () => {
        this._onChange('red-gradation');
      },
      checked: this._selectedColorType === 'red-gradation',
    });

    const changeRainbowRadioInput = new RadioInput({
      label: 'change-rainbow',
      onChange: () => {
        this._onChange('change-rainbow');
      },
      checked: this._selectedColorType === 'change-rainbow',
    });

    this.append(greyRadioInput);
    this.append(rainbowRadioInput);
    this.append(redGradationRadioInput);
    this.append(changeRainbowRadioInput);
  }

  delete() {
    this.innerHTML = '';
  }

  static get observedAttributes() {
    return ['data-selected-color-type'];
  }

  attributeChangedCallback() {
    this.delete();
    this.create();
  }
}

customElements.define('radio-wrap', RadioWrap);
