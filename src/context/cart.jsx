import { createContext, useReducer } from 'react'

export const CartContext = createContext()

const initialState = JSON.parse(window.localStorage.getItem('cart')) || []
const updateLocalStorage = (state) => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}
const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action

  switch (actionType) {
    case 'ADD_TO_CART': {
      const { id } = actionPayload
      const productInCartIndex = state.findIndex((item) => item.id === id)

      if (productInCartIndex >= 0) {
        const newCart = structuredClone(state)
        newCart[productInCartIndex].quantity += 1
        updateLocalStorage(newCart)
        return newCart
      }
      const newState = [
        ...state,
        {
          ...actionPayload,
          quantity: 1,
        },
      ]
      updateLocalStorage(newState)
      return newState
    }

    case 'REMOVE_FROM_CART': {
      const { id } = actionPayload
      const newCart = state.filter((item) => item.id !== id)
      updateLocalStorage(newCart)
      return newCart
    }

    case 'CLEAR_CART': {
      return []
    }
  }
  return state
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addToCart = (product) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product,
    })
  }

  const removeFromCart = (product) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: product,
    })
  }

  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
    })
  }

  return (
    <CartContext.Provider
      value={{ cart: state, addToCart, clearCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  )
}
