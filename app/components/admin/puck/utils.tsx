export function getSwatches(colors: any[]) {
  let swatches = [];
  for (var key in colors) {
    swatches.push(colors[key][6])
    colors[key].map((swatch) => {
      swatches.push(swatch);
    });
  }
  return swatches;
}

export function getThemeSwatches(colors: any[]) {
  let swatches = [];
  for (var key in colors) {
    swatches.push(colors[key][6])
    colors[key].map((swatch) => {
      swatches.push(swatch);
    });
  }
  return swatches;
}
