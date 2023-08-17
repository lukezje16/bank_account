import "./index.css";
import { useEffect, useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  hasLoan: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        balance: action.payload,
        isActive: true,
      };

    case "deposit150":
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case "withdraw50":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "loan5000":
      if (state.hasLoan) {
        return { ...state };
      }
      return {
        ...state,
        loan: state.loan + action.payload,
        hasLoan: true,
      };
    case "payLoan":
      const loan = 5000;
      if (!state.hasLoan) return { ...state };
      return {
        ...state,
        loan: 0,
        balance: state.balance - loan,
        hasLoan: false,
      };
    case "closeAccount":
      return {
        ...initialState,
      };
    default:
      throw new Error("unknown");
  }
}

export default function App() {
  const [{ balance, loan, isActive, hasLoan }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {isActive ? balance : "X"}</p>
      <p>Loan: {isActive ? loan : "X"}</p>

      <p>
        <button
          onClick={() => {
            dispatch({ type: "openAccount", payload: 500 });
          }}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "deposit150", payload: 150 });
          }}
          disabled={false}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "withdraw50", payload: 50 });
          }}
          disabled={false}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "loan5000", payload: 5000 });
          }}
          disabled={hasLoan}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "payLoan" });
          }}
          disabled={!hasLoan}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: "closeAccount" });
          }}
          disabled={loan > 0 || balance !== 0 ? true : false}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
