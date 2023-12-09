class VideoPlayer extends HTMLElement {
  num: number;

  constructor() {
    super();
    this.num = 0;

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 300px;
          height: 300px;
          border: 2px solid red;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: transparent;
        }

        #pause {
          display: none;
        }

        :host([playing]) #play {
          display: none;
        }

        :host([playing]) #pause {
          display: block;
        }
      </style>

      <button id="play" type="button">Play</button>
      <button id="pause" type="button">Pause</button>
      <button id="add" type="button">add</button>
      ${this.num}
    `;
  }

  connectedCallback() {
    const playButton = this.shadowRoot!.querySelector('#play')!;
    const pauseButton = this.shadowRoot!.querySelector('#pause')!;
    const addButton = this.shadowRoot!.querySelector('#add')!;

    addButton.addEventListener('click', () => {
      this.num += 1;
      console.log(this.num);
    });

    playButton.addEventListener('click', () => {
      this.playing = true;
    });

    pauseButton.addEventListener('click', () => {
      this.playing = false;
    });
  }

  static get observedAttributes() {
    return ['num'];
  }

  get playing() {
    return this.hasAttribute('playing');
  }

  set playing(isPlaying) {
    if (isPlaying) {
      this.setAttribute('playing', '');
    } else {
      this.removeAttribute('playing');
    }
  }
}
export default VideoPlayer;
