export default ([R, G, B], percent) => {
  // https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = Math.round((R < 255) ? R : 255)
  G = Math.round((G < 255) ? G : 255)
  B = Math.round((B < 255) ? B : 255)

  const RR = ((R.toString(16).length === 1) ? '0' + R.toString(16) : R.toString(16));
  const GG = ((G.toString(16).length === 1) ? '0' + G.toString(16) : G.toString(16));
  const BB = ((B.toString(16).length === 1) ? '0' + B.toString(16) : B.toString(16));

  return `#${RR+GG+BB}`
}