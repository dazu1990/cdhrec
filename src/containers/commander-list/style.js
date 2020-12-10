const styles = ({ typography,palette }) => ({
  container: {
    padding: `${typography.pxToRem(32)} 0`,
  },
  grid: {
    marginTop: '2rem'
  },
  goUp:{
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem'
  },
  goUpBtn:{
    background: `#ddd`
  },
  vertSpace:{
    margin: '2rem 0'
  }
});

export default styles;
