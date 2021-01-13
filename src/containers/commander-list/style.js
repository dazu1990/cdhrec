const styles = ({ typography,palette }) => ({
  container: {
    padding: `${typography.pxToRem(32)} 0`,
  },
  grid: {
    marginTop: '2rem',
    // height: '90vh'
  },
  toolbar:{
    padding: 10,
    // backgroundColor: '#fafafa'
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
  colorBar: {
    height: '0.5rem',
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    background: 'black'
  },
  colorInner: {
    height: '100%'
  },
  color_W: {
    background: '#f0f2c0'
  },
  color_U: {
    background: '#b5cde3'
  },
  color_B: {
    background: '#aca29a'
  },
  color_R: {
    background: '#db8664'
  },
  color_G: {
    background: '#93b483'
  },
  color_C: {
    background: '#beb9b2'
  },
  loadmore:{
    // background: 'gray',
    height: 'auto',
    display: 'flex',
    justifyContent: 'center',

  },
  mobileSpacer: {
    margin: '0.5rem 0'
  },
  loadmoreBtn: {
    backgroundColor:  'black',
    color: 'white',
    padding: '1rem 2rem',
    '&:hover':{
      color: 'black'
    }
  }
});

export default styles;
