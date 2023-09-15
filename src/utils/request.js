import axios from "axios";
import { BASE_URL } from "./constant";
import { getToken } from "./common";
import {Alert} from 'react-native';

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
        // if(cb){
        //   return cb(null,response.data)
        // }
        return response.data;
      }).catch((err) => {  
        // if(cb){
        //   return cb(err,null);
        // }
        Alert.alert("Error",err?.message || err)
         return  false; 
        });
}