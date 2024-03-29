import { handleActions } from 'redux-actions';

import { toggleMenu } from './actions';

import axios from 'axios'

// import localstorage-polyfill from 'localstorage-polyfill'

// import 'localstorage-polyfill'





const setApiCdhRec = () => {

  // this stores data to localStorage

  // let output = typeof window !== 'undefined' && localStorage ? localStorage.getItem('apiCdhRec') : {
  //   user_display_name: false,
  //   user_email: false,
  //   user_nicename: false,
  //   token: false
  // }

  const wpInfo = {
    username: `frontend`,
    password: `front_end2021`
  }

  axios.post('https://api.cdhrec.com/wp-json/jwt-auth/v1/token', wpInfo)
      .then(response => {
        // console.log('response data',response.data)
        if(typeof window !== 'undefined' && global.sessionStorage){
          global.sessionStorage.setItem('apiCdhRec', JSON.stringify(response.data));
        }else{
          
          console.log('no polyfill')
        }
      });

  // return output;

}



const apiCdhRec = setApiCdhRec();


const reducer = handleActions(
  {
    [toggleMenu]: (state, { payload }) => ({
      open: !state.open,
    }),
  },
  {
    open: false,
    // apiRef: {
    //   user_display_name: apiCdhRec.user_display_name,
    //   user_email: apiCdhRec.user_email,
    //   user_nicename: apiCdhRec.user_nicename,
    //   token: apiCdhRec.token
    // },

  } // initial state
);

export default reducer;
