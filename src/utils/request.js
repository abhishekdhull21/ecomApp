import axios from "axios";
import { BASE_URL } from "./constant";
import { getToken } from "./common";


export default request = async (endPoint,{data ={},headers = {},method ="POST"}={},cb)=>{
  const token = await getToken();
  if(token){
    headers["Authorization"] = "Bearer " + token;
  }
    return axios({
      url: BASE_URL + endPoint,
      method,
      headers,
      data,
      }).then((response) => {
        if(cb){
          return cb(null,response.data)
        }
        return response.data;
      }).catch((err) => {  
        if(cb){
          return cb(err,null);
        }
         return  err; 
        });
}