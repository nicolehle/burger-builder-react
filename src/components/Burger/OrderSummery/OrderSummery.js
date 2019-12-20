import React from 'react';

import Aux from '../../../auxiliary/Auxiliary';
const orderSummery = (props) => {

  const ingredientsList = Object.keys(props.ingredients)
        .map(igKey => {
          return (
            <li>
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
      <p>Continue to Checkout?</p>
    </Aux>
  )
};

export default orderSummery;
