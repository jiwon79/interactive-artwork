import { JElement } from '../JElement';

export interface PropertyOptions {
  name: PropertyKey;
  isObservable: boolean;
}

export function property(
  options?: Partial<PropertyOptions>,
): PropertyDecorator {
  return (target: object, property: PropertyKey) => {
    const hasOwnProperty = Object.hasOwnProperty.call(target, property);
    const defaultOptions: PropertyOptions = {
      name: options?.name ?? property,
      isObservable: options?.isObservable ?? true,
    };

    (target.constructor as typeof JElement).createProperty(
      property,
      defaultOptions,
    );

    return hasOwnProperty
      ? Object.getOwnPropertyDescriptor(target, property)
      : undefined;
  };
}
