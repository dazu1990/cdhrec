const styles = ({ typography }) => ({
  container: {
    borderRadius: '50%',
    overflow: 'hidden',
    // border: `${typography.pxToRem(2)} solid white`,
    height: typography.pxToRem(65),
    width: typography.pxToRem(65),
  },
  avatar: {
    width: '100%',
  },
});

export default styles;
