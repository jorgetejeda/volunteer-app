export const lightOrDarkColor = (color: string): string => {
  let r: number, g: number, b: number, hsp: number;

  if (color.match(/^rgb/)) {
    const rgbValues = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
    if (!rgbValues) {
      throw new Error('Invalid RGB color format');
    }

    r = parseInt(rgbValues[1], 10);
    g = parseInt(rgbValues[2], 10);
    b = parseInt(rgbValues[3], 10);
  } else if (color.match(/^#/)) {
    const hex = parseInt(color.slice(1), 16);
    r = (hex >> 16) & 255;
    g = (hex >> 8) & 255;
    b = hex & 255;
  } else {
    throw new Error('Invalid color format');
  }

  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );


  return hsp > 127.5 ? '#000' : '#fff';
}


