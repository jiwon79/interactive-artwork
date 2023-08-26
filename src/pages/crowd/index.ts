import Component from "@model/component";

class CrowdPage extends Component<any> {
  template(): string | void {
    return `
    <main>
        <p>Crowd Simulation</p>
        <canvas id="canvas"/>
    </main>
    `;
  }
}

export default CrowdPage;
