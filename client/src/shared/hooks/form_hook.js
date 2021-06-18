import { useReducer, useCallback } from "react";
const fromReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      if (!state.inputs) formIsValid = false;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

export const useForm = (initialFormValidity, initialInputs) => {
  const [state, dispatch] = useReducer(fromReducer, {
    isValid: initialFormValidity || false,
    inputs: initialInputs || {},
  });

  const onInputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
  }, []);
  return [state, onInputHandler];
};
