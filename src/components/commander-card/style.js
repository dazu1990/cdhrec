const styles = ({ typography }) => ({
  container: {
    marginBottom: '2rem',
  },
  cardImg:{
    borderRadius: '12px',
  },
  cardPartners:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    '@media (max-width: 768px)': {
      marginTop: '25px',
      marginBottom: '10px',
      background: 'red'
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
    fontSize: '0.75rem'
  }
  

});

// export const test = styled.div`
//   background: red;
// `


export default styles;
