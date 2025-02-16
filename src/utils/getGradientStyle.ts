import { interpolateHSL } from "./interpolateHSL";

const createColor = (h: number, s: number, l: number) => ({ h, s, l });

export const getGradientStyle = (percentage: number): string => {
  // Create 3 color ranges based on the figma gradients:
  const incorrectStartColorLower = createColor(38, 90, 65); // #F6B868
  const incorrectEndColorLower = createColor(18, 85, 55); // #EE6B2D
  const incorrectStartColorUpper = createColor(20, 70, 75); // #F1B496
  const incorrectEndColorUpper = createColor(14, 70, 65); // #EA806A
  const correctStartColor = createColor(174, 70, 60); // #76E0C2
  const correctEndColor = createColor(190, 60, 55); // #59CADA

  let startColour, endColour;

  if (percentage < 1) {
    startColour = interpolateHSL(
      percentage,
      incorrectStartColorLower,
      incorrectStartColorUpper
    );
    endColour = interpolateHSL(
      percentage,
      incorrectEndColorLower,
      incorrectEndColorUpper
    );
  } else {
    startColour = `hsl(${correctStartColor.h}, ${correctStartColor.s}%, ${correctStartColor.l}%)`;
    endColour = `hsl(${correctEndColor.h}, ${correctEndColor.s}%, ${correctEndColor.l}%)`;
  }

  return `linear-gradient(to bottom, ${startColour}, ${endColour})`;
};
