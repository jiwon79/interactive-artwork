export class CrowdPage extends HTMLElement {
  constructor() {
    super();
    this.create();
  }

  create() {
    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = 'Crowd Simulation';

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = 500;
    canvas.height = 500;

    this.append(title);
    this.append(canvas);
  }
}

customElements.define('crowd-page', CrowdPage);

// class CrowdPageXX extends Component<any> {
//   static ctx: CanvasRenderingContext2D;
//   static viewModel: CrowdViewModel;
//
//   template(): string | void {
//     return `
//     <main>
//         <p>Crowd Simulation</p>
//         <canvas id="canvas" width=500" height="500"/>
//     </main>
//     `;
//   }
//
//   didMount() {
//     const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
//     CrowdPageXX.ctx = canvas.getContext('2d')!;
//     CrowdPageXX.viewModel = new CrowdViewModel();
//     // this.draw(CrowdPage.ctx);
//   }
//
//   drawCurve(ctx: CanvasRenderingContext2D) {
//     let t = 0;
//     let prevPoint: Vector;
//     let point: Vector = new Vector([0, 0]);
//
//     ctx.strokeStyle = "green";
//     while (t < 1) {
//       prevPoint = point;
//       point = CrowdPageXX.viewModel.getPoint(t);
//
//       ctx.beginPath();
//       ctx.moveTo(prevPoint.x, prevPoint.y);
//       ctx.lineTo(point.x, point.y);
//       ctx.stroke();
//       t += 0.01;
//     }
//   }
//
//   draw(ctx: CanvasRenderingContext2D) {
//
//     let t = 0;
//
//     // setInterval(() => {
//     //   requestAnimationFrame(() => frame(t));
//     //   t += 0.01;
//     // }, 100);
//
//     const frame = (t: number) => {
//       ctx.clearRect(0, 0, 500, 500);
//       this.drawCurve(ctx);
//
//       let halfPoint = CrowdPage.viewModel.getPoint(t);
//       let halfSlope = CrowdPage.viewModel.getSlope(t);
//
//       ctx.beginPath();
//       ctx.moveTo(halfPoint.x, halfPoint.y);
//       ctx.lineTo(halfPoint.x + halfSlope.x, halfPoint.y + halfSlope.y);
//       ctx.stroke();
//
//       ctx.strokeStyle = "red";
//       ctx.beginPath();
//       ctx.moveTo(halfPoint.x, halfPoint.y);
//       ctx.lineTo(halfPoint.x - halfSlope.y, halfPoint.y + halfSlope.x);
//       ctx.stroke();
//     }
//
//   }
// }
//
// export default CrowdPageXX;
