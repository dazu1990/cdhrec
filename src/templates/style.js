const styles = ({ typography,palette }) => ({
  container: {
    minHeight: '90vh',
    overflow: 'hidden'
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
  }
});

export default styles;
