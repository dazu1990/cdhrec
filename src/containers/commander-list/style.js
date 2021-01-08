const styles = ({ typography,palette }) => ({
  container: {
    padding: `${typography.pxToRem(32)} 0`,
  },
  grid: {
    marginTop: '2rem',
    // height: '90vh'
  },
  goUp:{
    position: 'fixed',
    bottom: '1rem',
    left: '1rem',
  },
  goUpBtn:{
    background: `#ddd`
  },
  vertSpace:{
    margin: '2rem 0'
  },
  loadmore:{
    // background: 'gray',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',

  }
});

export default styles;
