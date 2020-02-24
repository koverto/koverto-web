import { Dispatch, SetStateAction, Reducer, useReducer } from "react"

export const useStateFromLocalStorage = <T>(
  key: string,
  initialValue: T = null
): [T, Dispatch<SetStateAction<T>>] => {
  const reducer: Reducer<T, SetStateAction<T>> = (previousValue, action) => {
    const newValue = action instanceof Function ? action(previousValue) : action
    localStorage.setItem(key, JSON.stringify(newValue))
    return newValue
  }

  const storedValue: T = JSON.parse(localStorage.getItem(key))
  return useReducer(reducer, storedValue === null ? initialValue : storedValue)
}
