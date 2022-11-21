import "./App.css";
import AppRoutes from "./router";
import { useContext ,useEffect } from "react";
import {GlobalContexts} from './component/reducer/context'
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
function App() {

  let {  dispatch } = useContext(GlobalContexts);

  useEffect(() => {
    const getProfile = async () => {
      let baseUrl = "http://localhost:3001";
      try {
        let response = await 
       
        axios.get(`${baseUrl}/profile`, {
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("response : ", response.data);

          dispatch({ type: "USER_LOGIN", payload: response.data });
        } else {
          dispatch({ type: "USER_LOGOUT" });
        }
      } catch (e) {
        console.log("Error in api call: ", e);
        dispatch( {type : "USER_LOGOUT"});
      }
    }

getProfile();
  }, []);

 const stripePromise = loadStripe("pk_test_51M4ix5CGVbi0KyInSpGxlsNmnJhGy46209c8EDLaUJXe8LOOH96c2fS3IQPrSXmfBWvIdXWGUiMCXgOIeXKtQfET008duNCu8O")
  return (
    <>
<Elements stripe={stripePromise}>  
     <AppRoutes/>
     </Elements>  
    </>
  );
}

export default App;
