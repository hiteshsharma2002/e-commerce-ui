import axios from 'axios';
import React, { useEffect, useReducer, useState } from 'react'

const reducer = (state, action) =>
    
{
    switch (action.type) {
        case 'plus':
            return { count: state.count + 1 }
        
        case 'minus':
            return {  count: state.count > 0 ? state.count - 1 : 0 }
        
        default:
            throw new Error(`Unknown error occured:${action.type} `)
    }
}
    
const initialState={count:0}

export default function CartPract() {

    const [cart, setCart] = useState([]);

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/cart-details`, {
                    withCredentials: true
                })
                setCart(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetch();
    },[])

    const caltotal = cart.reduce((acc, curr) => {
        return acc + curr.price * 1;
    },0)

    return (
      
        

        <div>
            
            {cart.map((item) => (
                <div>
                    <h1>{item.product}</h1>
                    <h1>{item.price}</h1>

                    <button onClick={() => dispatch({ type: 'plus' })}>Increase</button>

                    <h1>{ state.count}</h1>

                    <button onClick={() => dispatch({ type: 'minus' })}>Decrease</button>

                    
                </div>
            ))}

<h4>Total: { caltotal}</h4>
          
    </div>
  )
}