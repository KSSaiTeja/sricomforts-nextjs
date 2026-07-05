export const NotchDirection = {
  top: 0,
  right: 1,
  bottom: 2,
  left: 3,
} as const;

export type NotchDirectionValue =
  (typeof NotchDirection)[keyof typeof NotchDirection];

export type Notch = {
  direction: NotchDirectionValue;
  notchWidth: number;
  offset: number;
  position: number;
  radius: number;
  size: number;
};

export function createNotch(
  direction: NotchDirectionValue,
  overrides: Partial<Notch> = {},
): Notch {
  return {
    direction,
    notchWidth: 0.95,
    offset: 0,
    position: 0.5,
    radius: 40,
    size: 0.75,
    ...overrides,
  };
}
