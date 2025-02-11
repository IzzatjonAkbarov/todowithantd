import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import { data } from "react-router-dom";

export const DataUserContext = createContext({});

const DataUserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState([]);
  useEffect(() => {
    axios
      .get("https://67a74d5e203008941f673347.mockapi.io/userdata")
      .then((data) => setUserInfo(data.data));
  }, []);

  const initialState = {
    data: userInfo,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "sorted":
        let newdata = {
          ...state,
          data: state.data.filter((user) => user.status === action.payload),
        };
        console.log(state.data);

        return newdata;

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DataUserContext value={{ state, dispatch }}>{children}</DataUserContext>
  );
};

export default DataUserContextProvider;
