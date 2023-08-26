import Component from "@model/component";
import CrowdViewModel from "@pages/crowd/viewModel";
import Vector from "@utils/vector";

class CrowdPage extends Component<any> {
  static ctx: CanvasRenderingContext2D;
  static viewModel: CrowdViewModel;

  template(): string | void {
    return `
    <main>
        <p>Crowd Simulation</p>
        <canvas id="canvas" width=500" height="500"/>
    </main>
    `;
  }

  didMount() {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    CrowdPage.ctx = canvas.getContext('2d')!;
    CrowdPage.viewModel = new CrowdViewModel();
    this.draw(CrowdPage.ctx);
  }

  draw(ctx: CanvasRenderingContext2D) {
    console.log("draw");
    let t = 0;
    let prevPoint: Vector;
    let point: Vector = new Vector([0, 0]);

    ctx.strokeStyle = "green";
    while (t < 1) {
      prevPoint = point;
      point = CrowdPage.viewModel.getPoint(t);

      ctx.beginPath();
      ctx.moveTo(prevPoint.x, prevPoint.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();
      t += 0.01;
    }
  }
}

export default CrowdPage;
