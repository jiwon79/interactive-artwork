import Component, {StateType} from "@model/component";

class SolidTextPage extends Component<StateType> {
  template(): string {
    return `
      <div>
        solid text
        <div class="buttons">
          <button class="key_button" id="up">up</button>
          <button class="key_button" id="down">down</button>
          <button class="key_button" id="left">left</button>
          <button class="key_button" id="right">right</button>
        </div>
        <div class="area_display">
          <table class="display"></table>
        </div>
        <div class="area"></div>
      </div>
    `;
  }
}

export default SolidTextPage;
