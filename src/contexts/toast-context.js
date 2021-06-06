import { createContext, useContext, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

const ToastContext = createContext();

const reducerFunc = (prevState, action) => {
  switch (action.type) {
    case "SUCCESS": {
      return prevState.concat({
        ...action.payload,
        type: action.type,
        id: uuidv4(),
      });
    }

    case "INFO": {
      return prevState.concat({
        ...action.payload,
        type: action.type,
        id: uuidv4(),
      });
    }

    case "ERROR": {
      return prevState.concat({
        ...action.payload,
        type: action.type,
        id: uuidv4(),
      });
    }

    case "WARNING": {
      return prevState.concat({
        ...action.payload,
        type: action.type,
        id: uuidv4(),
      });
    }

    case "DELETE": {
      return prevState.filter((toast) => toast.id !== action.payload);
    }
    default:
      return prevState;
  }
};

export default function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, []);
  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
