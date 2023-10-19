import axios from "axios";
import { BASE_URL } from "./constant";
import { getToken } from "./common";
import {Alert} from 'react-native';

export default request = async (endPoint,{data ={},headers = {},method ="POST"}={},showAlertOnError = false)=>{
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
        // showAlertOnError && Alert.alert("Error",err?.response?.data.message || err || "Something went wrong")
        //  return  false; 
        return Promise.reject(err?.response?.data || false);
        });
}