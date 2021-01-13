const styles = ({ app, breakpoints, typography }) => ({
  '@global': {
    html: {
      [breakpoints.up('xl')]: {
        fontSize: '0.833333vw !important',
        
        // background: 'linear-gradient(0deg, rgba(228,228,233,1) 3%, rgba(255,255,255,1) 39%, rgba(255,255,255,1) 100%)'
      },
    },
  },
  container: {
    minHeight: '100vh',
    marginTop: '5rem'
  },
  scrollFix: {
    marginRight: '-17px !important',
    marginBottom: '-17px !important',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: '0 auto',
    minHeight: '100%',
    padding: `${typography.pxToRem(16)} ${typography.pxToRem(48)}`,
    transition: 'filter .5s, opacity .5s',
    boxSizing: 'border-box',
  },
  content: {
    margin: 'auto',
    // maxWidth: app.maxWidth,
    width: '100%',
    // background: 'linear-gradient(0deg, rgba(228,228,233,1) 3%, rgba(255,255,255,1) 39%, rgba(255,255,255,1) 100%)'

  },
  background: {
    backgroundImage: ``,
    backgroundSize: 'cover',
    background: '#EEE',

    // background: 'linear-gradient(0deg, rgba(228,228,233,1) 3%, rgba(255,255,255,1) 39%, rgba(255,255,255,1) 100%)'
    // backgroundPosition: 
  },
});

export default styles;
