export const getTextColor = (percentage: number): string => {
  if (percentage === 1) return "rgba(76, 173, 148, 1)";
  if (percentage > 0) return "rgb(228, 121, 88)";
  return "rgb(159, 147, 139)";
};
