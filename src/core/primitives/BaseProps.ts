export type BaseProps = BaseAttributes & BaseEvents;

export interface BaseAttributes {
  id?: string;
  className?: string;
  innerText?: string;
}

export interface BaseEvents {
  onClick?: (event: MouseEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
}

const extractBaseAttributes = (props: BaseProps) => {
  const { id, className, innerText } = props;
  return { id, className, innerText };
};

const extractBaseEvents = (props: BaseProps) => {
  const { onClick, onMouseDown, onMouseUp, onMouseMove } = props;
  return { onClick, onMouseDown, onMouseUp, onMouseMove };
};

export const initBaseAttribute = (element: HTMLElement, props: BaseProps) => {
  const attributes = extractBaseAttributes(props);
  const { id, className, innerText } = attributes;

  id && element.setAttribute('id', id);
  className && element.classList.add(className);
  innerText && (element.innerText = innerText);
};

export const addBaseEventsListener = (
  element: HTMLElement,
  props: BaseProps,
) => {
  const events = extractBaseEvents(props);
  const { onClick, onMouseDown, onMouseUp, onMouseMove } = events;
  onClick && element.addEventListener('click', onClick);
  onMouseDown && element.addEventListener('mousedown', onMouseDown);
  onMouseUp && element.addEventListener('mouseup', onMouseUp);
  onMouseMove && element.addEventListener('mousemove', onMouseMove);
};

export const removeBaseEventsListener = (
  element: HTMLElement,
  props: BaseProps,
) => {
  const events = extractBaseEvents(props);
  const { onClick, onMouseDown, onMouseUp, onMouseMove } = events;
  onClick && element.removeEventListener('click', onClick);
  onMouseDown && element.removeEventListener('mousedown', onMouseDown);
  onMouseUp && element.removeEventListener('mouseup', onMouseUp);
  onMouseMove && element.removeEventListener('mousemove', onMouseMove);
};
