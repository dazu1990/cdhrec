import { transform } from 'lodash';

const styles = ({ palette, typography }) => ({
  menuContainer: {
    borderRadius: typography.pxToRem(4),
    display: 'inline-block',
  },
  navLink: {
    border: 'none',
    display: 'inline-block',
    padding: `${typography.pxToRem(8)} ${typography.pxToRem(8)}`,
    textDecoration: 'none',
    // fontFamily: 'Cardo',
    // fontWeight: '700',
    // textTransform: `uppercase`,
    color: palette.text.secondary,
    '&:hover':{
      borderBottom: `1px solid ${palette.text.secondary}`
      // color: palette.text.primary,
    }
  },
  navLinkActive: {
    borderBottom: `${typography.pxToRem(2)} solid ${palette.primary.main}`,
  },
});

export default styles;
