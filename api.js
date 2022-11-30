import axios from "axios";

export default axios.create({
  baseURL: `https://api.imgflip.com/`,
  headers : {
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});

export const baseParams = {
  username: 'VladNatrusnyi',
  password: '26012003'
}
