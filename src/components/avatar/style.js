const styles = ({ typography }) => ({
  container: {
    borderRadius: '50%',
    overflow: 'hidden',
    // border: `${typography.pxToRem(2)} solid white`,
    height: typography.pxToRem(50),
    width: typography.pxToRem(50),
  },
  avatar: {
    width: '100%',
  },
});

export default styles;
