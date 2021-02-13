import React, {useState, useEffect}  from 'react';
import 'mana-font';
import { withStyles } from '@material-ui/core/styles';
import { green, grey, blue, black, red } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import styles from './style';


type Props = {
  classes: Object,
  data: Object
};
const RedCheckbox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const BlueCheckbox = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


const ColorSelector = ({ classes, data }: Props) => {
  const [checkedState, setCheckedState] = useState({
    C: false,
    W: false,
    U: false,
    B: false,
    R: false,
    G: false,

  });

  const [newFilter, setNewFilter] = useState([]);

  const handleChange = (event) => {
    setCheckedState({ ...checkedState, [event.target.name]: event.target.checked });
    let tempFilter = newFilter;

  // add color to filter if it isn't already included
    if(newFilter.includes(event.target.value)){
      let removeMe = newFilter.indexOf(event.target.value);
      tempFilter.splice(removeMe,1);
    }else{
      tempFilter.push(event.target.value);
    }
    setNewFilter(tempFilter)
    // set colorFilter state in CommanderList
    data.setColorFilter(newFilter.join(""))

  };


  return (
    <FormGroup row className={classes.groupContainer}>
      
      <FormControlLabel
        control={
            <Checkbox 
              disabled={checkedState.W || checkedState.U || checkedState.B || checkedState.R || checkedState.G } 
              icon={ <i className={`ms ms-c ${classes.unchecked}`}></i> } 
              checkedIcon={ <i className={`ms ms-c ms-cost`}></i> } 
              name="C"
              value="C"
              color="primary"
              onChange={handleChange}
            />
        }
        label="Colorless"
        labelPlacement="bottom"
      />
      <FormControlLabel
        control={
          <Checkbox
            disabled={checkedState.C} 
            icon={<i className={`ms ms-w ${classes.unchecked}`}></i>} 
            checkedIcon={<i className={`ms ms-w ms-cost`}></i>} 
            name="W" 
            value="W"
            color='primary'
            onChange={handleChange}
          />
        }
        label="White"
        labelPlacement="bottom"
      />
      <FormControlLabel
        control={
          <BlueCheckbox
            disabled={checkedState.C} 
            icon={<i className={`ms ms-u ${classes.unchecked}`}></i>} 
            checkedIcon={<i className={`ms ms-u ms-cost`}></i>} 
            name="U" 
            value="U"
            onChange={handleChange}
          />
        }
        label="Blue"
        labelPlacement="bottom"
      />
      <FormControlLabel
        control={
          <Checkbox 
            disabled={checkedState.C} 
            icon={<i className={`ms ms-b ${classes.unchecked}`}></i>} 
            checkedIcon={<i className={`ms ms-b ms-cost`}></i>} 
            name="B"
            value="B"
            color="primary"
            onChange={handleChange}
          />}
        label="Black"
        labelPlacement="bottom"
      />
      <FormControlLabel
        control={
          <RedCheckbox 
            disabled={checkedState.C} 
            icon={<i className={`ms ms-r ${classes.unchecked}`}></i>} 
            checkedIcon={<i className={`ms ms-r ms-cost`}></i>} 
            name="R" 
            value="R"
            onChange={handleChange}
          />
        }
        label="Red"
        labelPlacement="bottom"
      />
      <FormControlLabel
        control={
          <GreenCheckbox 
            disabled={checkedState.C} 
            icon={<i className={`ms ms-g ${classes.unchecked}`}></i>}
            checkedIcon={<i className={`ms ms-g ms-cost`}></i>} 
            name="G" 
            value="G"
            onChange={handleChange}
          />
        }
        label="Green"
        labelPlacement="bottom"
      />

    </FormGroup>

  );
};

export default withStyles(styles)(ColorSelector);
