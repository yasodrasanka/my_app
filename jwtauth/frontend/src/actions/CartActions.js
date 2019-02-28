// CartActions.js

import axios from 'axios';
// import { GET_ERRORS , SET_CURRENT_USER } from './types';

// import setAuthToken from '../setAuthToken';
// import jwt_decode from 'jwt-decode';

export const updateOrder = (order, history) => dispatch => {
    axios.post('/order/update', order)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log('error');
            });
}

// export const loginUser = (user) => dispatch => {
//     axios.post('/api/users/login', user)
//             .then(res => {
//                 //console.log(res.data);
//                 const { token } = res.data;
//                 localStorage.setItem('jwtToken', token);
//                 setAuthToken(token);
//                 const decoded = jwt_decode(token);
//                 dispatch(setCurrentUser(decoded));
//             })
//             .catch(err => {
//                 dispatch({
//                     type: GET_ERRORS,
//                     payload: err.response.data
//                 });
//             });
// }




