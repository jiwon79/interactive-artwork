import "./style.scss"
import { setupCounter } from '../../counter'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="#">solid text</a>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
