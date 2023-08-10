export type SVG_DIMENSIONS = Record<
  "logo" | "default",
  { width: number; height: number }
>;

export const svgDimensions: SVG_DIMENSIONS = {
  logo: {
    width: 28,
    height: 28,
  },
  default: {
    width: 24,
    height: 24,
  },
};

