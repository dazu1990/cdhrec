const styles = ({ app, typography, palette }) => ({
  wrapper: {
    background: `${palette.primary.dark}`,
    padding: `${typography.pxToRem(8)} `,
    position: `fixed`,
    display: 'flex',
    justifyContent: 'center',
    width: `100%`,
    top: `0`,
    zIndex: `10`
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: `auto 0`,
    maxWidth: app.maxWidth,
    width: '100%',
  },
  logo: {
    border: 'none',
    float: 'left',
    transition: 'all .3s',
    textDecoration: 'none',
  },
  siteName: {
    fontFamily: 'Cardo',
    fontWeight: '700',
    fontSize: '2rem',
    // textTransform: `uppercase`,
    color: palette.text.secondary,
    textDecoration: 'none',
    marginLeft: '1rem',
  },
  navigation: {
    float: 'right',
    position: 'relative',
  },
});

export default styles;
