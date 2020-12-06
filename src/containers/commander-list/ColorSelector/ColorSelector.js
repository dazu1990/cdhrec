import React, {useState, useEffect}  from 'react';
import 'mana-font';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
// import Favorite from '@material-ui/icons/Favorite';
// import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import styles from './style';


type Props = {
  classes: Object,
  data: Object
};

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

    if(event.target.value === "C"){
      tempFilter = checkedState.C === true  ? ["C"] : [];
    }else{
      if(newFilter.includes(event.target.value)){
        let removeMe = newFilter.indexOf(event.target.value);
        tempFilter.splice(removeMe,1);
      }else{
        tempFilter.push(event.target.value);
      }

      if(newFilter.includes("C")){
        let removeMe = newFilter.indexOf("C");
        tempFilter.splice(removeMe,1);
      }

    }
    setNewFilter(tempFilter)
    // set colorFilter state in CommanderList
    data.setColorFilter(newFilter.join(""))
  };

  // useEffect(() => {
  //   console.log('colorFilter INSIDE', newFilter)
  //   data.setColorFilter(newFilter)
  // }, [newFilter]);

  return (
    <FormGroup row>

    <FormControlLabel
        control={
            <Checkbox 
              disabled={checkedState.W || checkedState.U || checkedState.B || checkedState.R || checkedState.G } 
              icon={ <i className={`ms ms-c ms-cost`}></i> } 
              checkedIcon={ <i className={`ms ms-c`}></i> } 
              name="C"
              value="C"
              color="primary"
              onChange={handleChange}
            />
        }
        label="Colorless"
        labelPlacement="bottom"
      />
      {/* { checkedState.C == false &&( */}
        <FormControlLabel
          control={
            <Checkbox
              disabled={checkedState.C} 
              icon={<i className={`ms ms-w ms-cost`}></i>} 
              checkedIcon={<i className={`ms ms-w`}></i>} 
              name="W" 
              value="W"
              color="primary"
              onChange={handleChange}
            />
          }
          label="White"
          labelPlacement="bottom"
        />
        <FormControlLabel
          control={
            <Checkbox
              disabled={checkedState.C} 
              icon={<i className={`ms ms-u ms-cost`}></i>} 
              checkedIcon={<i className={`ms ms-u`}></i>} 
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
              icon={<i className={`ms ms-b ms-cost`}></i>} 
              checkedIcon={<i className={`ms ms-b`}></i>} 
              name="B"
              value="B"
              onChange={handleChange}
            />}
          label="Black"
          labelPlacement="bottom"
        />
        <FormControlLabel
          control={
            <Checkbox 
              disabled={checkedState.C} 
              icon={<i className={`ms ms-r ms-cost`}></i>} 
              checkedIcon={<i className={`ms ms-r`}></i>} 
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
            <Checkbox 
              disabled={checkedState.C} 
              icon={<i className={`ms ms-g ms-cost`}></i>}
              checkedIcon={<i className={`ms ms-g`}></i>} 
              name="G" 
              value="G"
              onChange={handleChange}
            />
          }
          label="Green"
          labelPlacement="bottom"
        />
      {/* )} */}
    </FormGroup>

  );
};

export default withStyles(styles)(ColorSelector);
