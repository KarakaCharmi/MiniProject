import { createContext, useReducer, useContext } from "react";

// Create Context
const TransactionContext = createContext();

// Initial State
const initialState = {
  transactions: [],
};

// Reducer Function
const transactionReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return { transactions: [...state.transactions, action.payload] };
    case "REMOVE_TRANSACTION":
      return {
        transactions: state.transactions.filter(
          (tx) => tx.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

// Context Provider Component
export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  return (
    <TransactionContext.Provider
      value={{ transactions: state.transactions, dispatch }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

// Custom Hook for using the context
export const useTransactions = () => useContext(TransactionContext);
