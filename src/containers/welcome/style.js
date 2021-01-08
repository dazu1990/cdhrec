const styles = ({ typography }) => ({
    maintitle: {
    fontSize: '3rem',
    fontWeight: '900',
    fontFamily: 'Playfair Display SC'
  },
  tagline:{
      fontSize: '1.25rem'
  },
  icon:{
      width: '6rem',
      height: '6rem'
  },
  icon_inner:{
    width: '4rem',
    height: '4rem'
  },
  cardcopy:{
    padding: '0.75rem 0',
    '@media (max-width: 768px)': {
      textAlign: 'center'
    }
  }
});

export default styles;
