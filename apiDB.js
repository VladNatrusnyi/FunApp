import axios from "axios";

export default axios.create({
  baseURL: `https://funapp-caaf5-default-rtdb.firebaseio.com/`,
  headers : {
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

