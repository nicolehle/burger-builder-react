import React, { Component } from 'react';

import Aux from '../../../auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {
  // This could be a functional component, doesn't have to be a class.
  componentDidUpdate() {
    console.log('[OrderSummery] updated');
  }

  render() {
    const ingredientsList = Object.keys(this.props.ingredients)
          .map(igKey => {
            return (
              <li key={igKey}>
              <span>{igKey.toUpperCase()}</span>: {this.props.ingredients[igKey]}
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
        <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to Checkout?</p>
        <Button
          clicked={this.props.orderCancel}
          btnType="Danger">CANCEL</Button>
        <Button
          clicked={this.props.orderContinue}
          btnType="Success">CONTINUE</Button>
      </Aux>
    )
  }
}

export default OrderSummery;
