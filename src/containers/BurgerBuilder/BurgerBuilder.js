import React, { Component } from 'react';

import Aux from '../../auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.2
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchaseable: false
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = updatedCount;

    const oldPrice = this.state.totalPrice;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = oldPrice + priceAddition;

    this.setState({
      ingredients: updatedIngredients, totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIngredients);
  }


  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];

    if(oldCount <= 0){
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;

    const oldPrice = this.state.totalPrice;
    const priceDeduction = INGREDIENT_PRICES[type];
    const newPrice = oldPrice - priceDeduction;

    this.setState({
      ingredients: updatedIngredients, totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIngredients);
  }

  updatePurchaseState (ingredients) {
    const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey];
        })
        .reduce((cur, el) => {
          return cur + el
        },0);

    this.setState({
      purchaseable: sum > 0
    })
  }

  render(){

    const disableInfo = {
      ...this.state.ingredients
    };
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0
    }

    return(
      <Aux>
        <Modal>
          <OrderSummery ingredients={this.state.ingredients}/>
        </Modal>
        <Burger
          ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientsadded={this.addIngredientHandler}
          ingredientsremoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}/>
      </Aux>
    );
  }
};

export default BurgerBuilder;
