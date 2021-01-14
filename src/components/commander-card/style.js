const styles = ({ typography }) => ({
  container: {
    marginBottom: '2rem',
    position: 'relative'
  },
  cardImg:{
    borderRadius: '12px',
    // zIndex: '0',
    // top: '0px',
    // position: 'absolute'
  },
  cardBodyCopy:{
    fontSize: '0.7rem'
  },
  cardPartners:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '@media (max-width: 768px)': {
      marginTop: '25px',
      marginBottom: '10px',
    }

  },
  cardFront:{
    zIndex: 1,
    position: 'absolute !important',
    transform: 'translate(-10px, 10px)',
    borderRadius: '12px',
    '&:hover,&:focus':{
      zIndex: 1
    }
  },
  cardBack:{
    zIndex: 0,
    position: 'relative',
    transform: 'translate(10px, -23px)',
    borderRadius: '12px',
    '&:hover,&:focus':{
      zIndex: 1
    }
  },
  downloads:{
    // background: 'lightgrey',

  },
  downloadsLink:{
    margin: '0.25rem',
  },
  cardName:{
    margin: '1rem auto 0',
    fontSize: '0.75rem',
    textAlign: 'center'
  },
  cardBanner:{
    top: '0px',
    padding: '0.25rem',
    width: '100%',
    textDecoration: 'none',
    fontSize: '0.8rem',
    display: 'flex',
    justifyContent: 'center',
    background: 'grey',
    
    // zIndex: '2'

  }
  

});

// export const test = styled.div`
//   background: red;
// `


export default styles;
