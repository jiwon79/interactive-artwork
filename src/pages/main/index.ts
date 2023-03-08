import "./style.scss"
import Component from "../../model/component";
import {navigate} from "../../router";

class MainPage extends Component {
  template(): string {
    return `
      <div class="main">
        <a href="/">main</a>
        <a href="/solid-text">solid text</a>
      </div>
    `;
  }

  setEvent() {
    const $main = this.target.querySelector(".main")!;
    $main.addEventListener("click", (e: Event) => {
      const element = e.target as HTMLElement;
      const targetElement = element.closest("a");
      if (!(targetElement instanceof HTMLAnchorElement)) return;

      e.preventDefault();
      const baseUrl = window.location.origin;
      const href = targetElement.href.replace(baseUrl, "");

      navigate(href);
    });
  }
}

export default MainPage;
