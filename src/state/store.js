import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import reducer from './reducer';

const composeEnhancers = composeWithDevTools({ name: 'Gatsby Starter' });

export default preloadedState => {
  return createStore(
    reducer,
    preloadedState,
    composeEnhancers(applyMiddleware())
  );
};


// const wpInfo = {
//   username: `frontend`,
//   password: `front_end2021`
// }

// axios.post('http://api.cdhrec.com/wp-json/jwt-auth/v1/token', wpInfo)
//     .then(response => {
//       console.log('response data',response.data)
//       localStorage.setItem('apiCdhRec', response.data);
//     });
