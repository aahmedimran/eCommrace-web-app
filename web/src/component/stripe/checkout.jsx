import React from 'react'
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useState, useContext } from 'react';
import { GlobalContexts } from '../reducer/context';
import { GrAddCircle } from 'react-icons/gr'
import { BiMinusCircle } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'





const Checkout = () => {
  let { state, dispatch } = useContext(GlobalContexts);
  const [checkoutVal, setcheckoutVal] = useState(false)


  const total = state.cart.reduce((acc, curr) => acc + Number(curr.price) * curr.count, 0);







  const increment = (item) => {
    console.log("item", item)

    const updateValue = state.cart.map(obj => {
      if (obj._id === item._id) {
        return { ...obj, count: obj.count + 1 }
      }
      return obj

    })
    dispatch({
      type: "addToCart",
      payload: updateValue,
    });
    console.log(updateValue, 'updateValue');
  };

  const Decrement = (item) => {

    if (item.count === 1) {
      return;
    }
    const updateValues = state.cart.map(obj => {
      if (obj._id === item._id) {
        return { ...obj, count: obj.count - 1 }

      }
      console.log(obj, 'obj');

      return obj

    })
    dispatch({
      type: "addToCart",
      payload: updateValues,
    });
    console.log(updateValues, 'updateValue');

  }





  return (
    <>
      <div className='main-div'>
        <header className='header' >
          <Link to="/"><AiOutlineArrowLeft size={45} /></Link>
          <h1>Continue shoppingjbbbbbbbbbbbbbbbbbbb</h1>
        </header>
        <div>
          {state?.cart?.map((prod) => (
            <div key={prod._id}  >

              <div className='main-contanier'>
                <div><img width={200} src={prod.file} alt='' className='image-main' /></div>
                <div>
                  <div className='name-discri-contanier'>
                    <div>Name : {prod.name}</div>
                    <div>Discription : {prod.discription}</div>
                  </div>
                  <div className='price-qty-contanier'>
                    <div>Rs : {prod.price}</div>
                  </div>
                </div>
                <div className='btn-update'>
                  <button className='btn-updatemain' onClick={() => increment(prod)}><GrAddCircle /></button>
                  <option>{prod.count}</option>
                  <button className='btn-updatemain' onClick={() => Decrement(prod)}><BiMinusCircle /></button>
                </div>

                <div> <button className='del-btn'

                  onClick={() => {
                    dispatch({
                      type: "removeToCart",
                      payload: prod
                    })
                  }}><MdDelete /></button></div>
              </div>
              
              <button disapaled={state.length === 0} onClick={()=>{setcheckoutVal(false)}} >Back</button>
              <button disapaled={state.length === 0} onClick={()=>{setcheckoutVal(true)}} > Pay</button>

            </div>

          )

          )}
        </div>
        <div>Sub total{total}</div>
        <div>{total}</div>
      </div >
    </>
  )
}

export default Checkout





