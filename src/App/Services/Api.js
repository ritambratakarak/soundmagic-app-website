
import axios from 'axios'
var base_url = 'https://nodeserver.mydevfactory.com:1446/api/';
export const image_url = 'https://nodeserver.mydevfactory.com:1446/';
var condition = navigator.onLine ? 'online' : 'offline';


export const Network = (endpoint, method, body) => {


  return new Promise((resolve, reject) => {
    if (condition === 'online') {
      axios({
        method,
        url: `${base_url}${endpoint}`,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': body ? body.authToken : ""
        },
        data: body
      })
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          console.log("error========>", error);
          // Toast.show('Something went wrong. Please try again !')
          reject(error)
        });
    } else {
      alert("OFFLINE")
    }
  });
}