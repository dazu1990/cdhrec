import React, {useState}  from 'react';
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

// const GreenCheckbox = withStyles({
//   root: {
//     color: green[400],
//     '&$checked': {
//       color: green[600],
//     },
//   },
//   checked: {},
// })((props) => <Checkbox color="default" {...props} />);

export default function ColorSelector() {
  const [state, setState] = useState({
    checkedC: true,
    checkedW: true,
    checkedU: true,
    checkedB: true,
    checkedR: true,
    checkedG: true,

  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <FormGroup row>

    <FormControlLabel
        control={
            <Checkbox 
                icon={ <i className={`ms ms-c ms-cost`}></i> } 
                checkedIcon={ <i className={`ms ms-c`}></i> } 
                name="checkedC"
                color="primary"
            />
        }
        label="Colorless"
      />
    <FormControlLabel
        control={
            <Checkbox 
                icon={<i className={`ms ms-w ms-cost`}></i>} 
                checkedIcon={<i className={`ms ms-w`}></i>} 
                name="checkedW" 
                color="primary"
            />}
        label="White"
      />
    <FormControlLabel
        control={<Checkbox icon={<i className={`ms ms-u ms-cost`}></i>} checkedIcon={<i className={`ms ms-u`}></i>} name="checkedU" />}
        label="Blue"
      />
    <FormControlLabel
        control={<Checkbox icon={<i className={`ms ms-b ms-cost`}></i>} checkedIcon={<i className={`ms ms-b`}></i>} name="checkedB" />}
        label="Black"
      />
    <FormControlLabel
        control={<Checkbox icon={<i className={`ms ms-r ms-cost`}></i>} checkedIcon={<i className={`ms ms-r`}></i>} name="checkedR" />}
        label="Red"
      />
    <FormControlLabel
        control={<Checkbox icon={<i className={`ms ms-g ms-cost`}></i>} checkedIcon={<i className={`ms ms-g`}></i>} name="checkedG" />}
        label="Green"
      />
    </FormGroup>
  );
}

// const manaSymbols = [
//     { value: 'c', key: 'KeyC', name: 'c' },
//     { value: 'w', key: 'KeyW', name: 'w' },
//     { value: 'u', key: 'KeyU', name: 'u' },
//     { value: 'b', key: 'KeyB', name: 'b' },
//     { value: 'r', key: 'KeyR', name: 'r' },
//     { value: 'g', key: 'KeyG', name: 'g' },
// ];

// const RadioButton = (props) => (
//     <label>
//         <i className={`ms ms-${props.value} ms-cost`}></i>
//         <input 
//             type="checkbox"
//             name="colors"
//             value={props.value}
//             onChange={props.onChange}
//         />
//     </label>
// );


// const _RadioClickHandler = (e, name, setColorFilter, colors ,setColors) => {
//     let colorsTemp = colors;
//     if(colorsTemp.includes(name)){
//         // console.log('includes')
//         const index = colors.indexOf(name);
//         colorsTemp.splice(index,1)
//     }else{
//         colorsTemp.push(name)
//     }
//     setColors(colorsTemp);
//     setColorFilter(name)

// }

// const handleSubmit = (event)=>{
//     // console.log('iehbfa',event)
//     event.preventDefault();
// }
// const ColorSelector = (Props) => {
//     const {setColorFilter} = Props;
//     const [colors,setColors] = useState([]);


    
//     return(
//         <form onSubmit={()=>handleSubmit()}>
//             {manaSymbols.map(item=>(
//                 <RadioButton 
//                     value={item.value} 
//                     key={item.key} 
//                     name={item.name} 
//                     onChange={e => {
//                         // console.log(item.value)
                       
//                         _RadioClickHandler(item.value, setColorFilter, colors ,setColors); 

                        
//                     } }  
//                 />
//                 )
//             )}
//         </form>
//     );
// };

// export default ColorSelector;
