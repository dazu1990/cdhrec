const styles = ({ typography,palette }) => ({
    container: {
      padding: `${typography.pxToRem(32)} 0`,
    },
    xmlParent: {
      display: 'flex'
    },
    grid: {
      marginTop: '2rem',
    },
    toolbar:{
      padding: 10,
      paddingBottom: 0
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
      background: 'black',
      zIndex: '99999'
    },
    colorBarInner: {
      height: '0.35rem',
      position: 'relative',
      left: '0px',
      background: 'black',
      transform: 'scale(1.1)'
    },
    colorBarInnerDesktop:{
      bottom: '-0.65rem'
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
      height: 'auto',
      display: 'flex',
      justifyContent: 'center',
  
    },
    mobileSpacerFlex: {
      display: 'flex',
      margin: '0.5rem 0',
    },
    loadmoreBtn: {
      backgroundColor:  'black',
      color: 'white',
      padding: '1rem 2rem',
      '&:hover':{
        color: 'black'
      }
    },
    btn: {
      lineHeight: '1rem',
      'margin-top': "10px",
      width: "95%"
    },
    menucollapse:{
      marginBottom: '1rem',
      display: 'none',
      '@media (max-width: 768px)': {
        display: 'inherit'
      }
    },
    deckInput: {
      background: palette.component.background,
      color: palette.text.primary,
      width: '95%'
    },
    deckTitle: {
      margin: "10px 0px",
      width: "95%"
    },
    reminderText:  {
      marginTop: '20px',
    },
    cardSelect: {
      width: '350px',
      margin: '10px',
    },
    uploadTitle: {
      fontSize: '3rem',
      fontWeight: '900',
      fontFamily: 'Playfair Display SC',
      textAlign: 'center',
      marginBottom: '30px',
      '@media (max-width: 768px)': {
        fontSize: '2.5rem',
      }
    },
    mobileMenu:{
      top: 0,
      left: '0px',
      position: 'fixed',
      background: 'white',
      width: '100%',
      zIndex: '9',
      transition: 'all 250ms',
      transform: 'translateY(-12rem)',
      '&.expanded':{
        '@media (max-width: 768px)': {
          paddingTop: '1rem',
          transform: 'translateY(4rem)',
        }
      },
      '&.scrollDown':{
        transform: 'translateY(5rem)',
        '@media (max-width: 768px)': {
          transform: 'translateY(-7.5rem)',
        }
      }
    }
  });
  
  export default styles;
  