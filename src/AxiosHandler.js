import axios from 'axios';


export const baseURL=process.env.REACT_APP_BASEURL;
export const baseUIURL=process.env.REACT_APP_UI;
//export const baseURL='https://wmarcectprod01.marc.fr.ssg/API/';
export const axiosInstance =  axios.create({
    baseURL: baseURL,
    timeout: 30000 //10 seconds before request timeout
    
  });
  axiosInstance.defaults.headers.common['cache-control']=`no-cache, no-store`;
  axiosInstance.defaults.headers.common['Pragma']=`no-cache`; 




