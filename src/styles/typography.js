const typography = typography => ({
  fontSize: 16,
  h1: {
    fontSize: 10,
    lineHeight: 1.1,
    fontWeight: 800,
  },
  h2: {
    fontSize: typography.pxToRem(56),
    lineHeight: 1.1,
    fontWeight: 500,
  },
  h3: {
    fontSize: typography.pxToRem(28),
    lineHeight: 1.1,
    fontWeight: 300,
  },
  body1: {
    fontSize: typography.pxToRem(16),
    lineHeight: 1.1,
    fontWeight: 300,
  },
  body2: {
    fontSize: typography.pxToRem(16),
    lineHeight: 1.1,
    fontWeight: 300,
  },
});

export default typography;
