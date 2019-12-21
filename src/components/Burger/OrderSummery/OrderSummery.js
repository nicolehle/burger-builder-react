import React from 'react';

import Aux from '../../../auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummery = (props) => {

  const ingredientsList = Object.keys(props.ingredients)
        .map(igKey => {
          return (
            <li key={igKey}>
            <span>{igKey.toUpperCase()}</span>: {props.ingredients[igKey]}
            </li>
          )
        })

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        {ingredientsList}
      </ul>
      <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button
        clicked={props.orderCancel}
        btnType="Danger">Cancel</Button>
      <Button
        clicked={props.orderContinue}
        btnType="Success">Order</Button>
    </Aux>
  )
};

export default orderSummery;
