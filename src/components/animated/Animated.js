import React from 'react';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import isString from 'lodash/isString';

import { AnimatedWord } from './components';
import styles from './style';
import { useActiveAnimation } from './hooks';

// type Props = {
//   children: HTMLElement,
//   classes: Object,
//   animateWord: Boolean,
//   animation: String,
//   timeout: Number,
// };

const Animated = ({
  children,
  classes,
  animateWord,
  animation,
  timeout,
}) => {
  const [activeAnimation, setActiveAnimation] = useActiveAnimation(timeout);

  return isString(children) ? (
    children
      .split(' ')
      .map((word, index) => (
        <AnimatedWord
          word={word}
          key={`${word}-${index}`}
          animateWord={animateWord}
          timeout={timeout}
          animation={classes[animation]}
        />
      ))
  ) : (
    <span
      role={'presentation'}
      onMouseEnter={() => setActiveAnimation(true)}
      className={classNames(
        activeAnimation && classes[animation],
        classes.item
      )}>
      {children}
    </span>
  );
};

Animated.defaultProps = {
  animateWord: false,
  animation: 'heartBeat',
  timeout: 600,
};

export default withStyles(styles)(Animated);
