import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {

  const {getTotal,token,food_list,cartItems,url} = useContext(StoreContext)
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    postcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (e)=>{
    const name = e.target.name
    const value = e.target.value
    setData(data=>({...data,[name]:value}))
  }
  
  const placeOrder = async(e)=>{
    e.preventDefault();
    let orderItems = []
    food_list.map((item)=>{
      if (cartItems[item._id]>0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id]
        /**
         * itemInfo["quantity"] = cartItems[item._id] is adding a new property quantity to the itemInfo object,
         *  where the value of quantity is taken from the cartItems object using the item's _id as the key.
         */
        orderItems.push(itemInfo)
      }
    })
    console.log(orderItems)
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotal()+2
    }
    //send data to api
    
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url)
    } else{
      
      alert("Error")
    }
  }
  const navigate = useNavigate()

  useEffect(()=>{
    if (!token) {
        navigate("/cart")
    } else if (getTotal()===0) {
        navigate('/cart')
    }
  },[])

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input required type="text" name='firstName' value={data.firstName} onChange={onChangeHandler} placeholder='First Name' />
          <input required type="text" name='lastName' value={data.lastName} onChange={onChangeHandler} placeholder='Last Name' />
        </div>
        <input required type="email" name='email' value={data.email} onChange={onChangeHandler} placeholder='Email' />
        <input required type="text" name='street' value={data.street} onChange={onChangeHandler} placeholder='Street' />
        <div className="multi-fields">
          <input required type="text" name='city' value={data.city} onChange={onChangeHandler} placeholder='City' />
          <input required type="text" name='state' value={data.state} onChange={onChangeHandler} placeholder='State' />
        </div>
        <div className="multi-fields">
          <input required type="text" name='postcode' value={data.postcode} onChange={onChangeHandler} placeholder='Post Code' />
          <input required type="text" name='country' value={data.country} onChange={onChangeHandler} placeholder='Country' />
        </div>
        <input required type="text" name='phone' value={data.phone} onChange={onChangeHandler} placeholder='phone' />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
              <p>SubTotal</p>
              <p>${getTotal()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotal()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${getTotal()===0?0:getTotal()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder
