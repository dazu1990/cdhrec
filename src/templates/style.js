const styles = ({ typography,palette }) => ({
  container: {
    minHeight: '100vh',
    overflow: 'hidden',
    paddingTop: '1rem'
    
  },
  codeBlock:{
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    color: 'white',
    background: 'gray',
    padding: '10px'
  },
  padBuffer:{
    padding: '0 10px',
    '@media (max-width: 768px)': {
      padding: '10px 0'
    }
  },
  invisible:{
    opacity: 0,
    margin: 0,
    padding: 0,
    height: 0,
    width: 0
    
  },
  manacost: {
    fontSize: '1rem',
  },
  MuiCardHeaderContent:{
    background: 'red'
  },
  bumpLeft: {
    marginLeft: 'auto'
  },
  cardList: {
    position: 'relative',
    overflow: 'auto',
    minHeight: '4rem',
    maxHeight: '300px',
    background: 'rgb(225,225,225)',
    padding: '0px',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',

  },
  cardListItem: {
    background: 'rgb(240,240,240)',
    borderBottom: 'solid 1px rgb(210,210,210)'
  },
  deckSectionTitle: {
    width: '100%',
    marginBottom: '0px'
    // fontSize: '1.25rem'
  }
});

export default styles;
