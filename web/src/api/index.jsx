import axios from 'axios';
import { useContext } from 'react';
import { GlobalContexts } from "../component/reducer/context";

const HandleApi = async (method, url, data, withCredentials) => {
  let { state } = useContext(GlobalContexts);
  // ${state.baseUrl}
  try {
    let response = await axios[method](`http://localhost:3001${url}`, data, { withCredentials })

    console.log("response :", response.data);
    return response.data
    // dispatch({ type: dispatchType, payload: response.data });
}
catch (e) {
  console.log("error in api ", e)
  return e
}
}
export default HandleApi