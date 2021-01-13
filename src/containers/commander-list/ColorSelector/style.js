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
  },
  checked: {
    width: '1.3em',
    height: '1.3em',
    backgroundColor: 'white',
    borderRadius: '1em',
    fontSize: '0.95em',
    lineHeight: '1.35em'
  },
  groupContainer: {
    justifyContent: 'center'
  }
});

export default styles;

