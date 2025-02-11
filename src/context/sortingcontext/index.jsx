import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";

export const DataUserContext = createContext({});

const DataUserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    axios
      .get("https://67a74d5e203008941f673347.mockapi.io/userdata")
      .then((response) => setUserInfo(response.data))
      .catch((error) => console.error(error));
  }, []);

  const initialState = {
    data: [],
    filteredData: [],
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_DATA":
        return {
          ...state,
          data: action.payload,
          filteredData: action.payload,
        };

      case "FILTER":
        return {
          ...state,
          filteredData:
            action.payload.toLowerCase() === "all"
              ? state.data
              : state.data.filter(
                  (user) =>
                    user.status.toLowerCase() === action.payload.toLowerCase()
                ),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // 🔹 Update state when userInfo is fetched
  useEffect(() => {
    dispatch({ type: "SET_DATA", payload: userInfo });
  }, [userInfo]);

  return (
    <DataUserContext.Provider value={{ state, dispatch }}>
      {children}
    </DataUserContext.Provider>
  );
};

export default DataUserContextProvider;
