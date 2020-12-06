const styles = ({ typography }) => ({
  container: {
    padding: `${typography.pxToRem(32)} 0`,
  },
  grid: {
    marginTop: '2rem'
  },
  disabled: {
    opacity: '0.25',
    pointerEvents: 'none'
  }
});

export default styles;
