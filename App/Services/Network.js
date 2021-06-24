import NetInfo from '@react-native-community/netinfo';
import {base_url} from '../Utils/constants';
import axios from 'axios';
import Toast from 'react-native-root-toast';

export default Network = (endpoint, method, body) => {
  console.log(`${base_url}${endpoint}`);
  return new Promise((resolve, reject) => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        if (method == 'get') {
          axios({
            method,
            url: `${base_url}${endpoint}`,
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': body.authtoken ? body.authtoken : null,
            },
            body: body,
          })
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              console.log(error);
              const Error = error.response.data;
              Toast.show(Error.response_message);
              reject(error);
            });
        } else {
          axios({
            method,
            url: `${base_url}${endpoint}`,
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': body.authtoken ? body.authtoken : null,
            },
            data: body,
          })
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              console.log(error.response.data);
              const Error = error.response.data;
              Toast.show(Error.response_message);
              reject(error);
            });
        }
      } else {
        reject('No connection');
        Toast.show('Please check your internet connection !', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      }
    });
  });
};
