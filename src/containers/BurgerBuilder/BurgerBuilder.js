import React, { Component } from 'react';
import axios from '../../axios-orders';

import Aux from '../../auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../auxiliary/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.2
}

class BurgerBuilder extends Component {

  state = {
    ingredients: null,
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://react-my-burger-55dc3.firebaseio.com/ingredients.json')
        .then(response => {
          this.setState({ingredients: response.data})
        })
        .catch(error => {
          this.setState({error: true});
        })
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

  purchasingHandler = () => {
    this.setState({
      purchasing: true
    })
  }

  purchaseCancleHandler = () => {
    this.setState({
      purchasing: false
    })
  }

  purchaseContinueHandler = () => {
    // alert('You have continued order!');
    this.setState({ loading: true })

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Nicole Lee',
        address: {
          street: 'Test St',
          zipCode: '12345',
          country: 'USA'
        },
        email: 'test@test.com'
      },
      delivery: 'fastest'
    }

    axios.post('/orders.json', order)
        .then(response =>
          this.setState({ loading: false, purchasing: false})
        )
        .catch(error =>
          this.setState({ loading: false, purchasing: false})
        );
  }

  render(){

    const disableInfo = {
      ...this.state.ingredients
    };
    for(let key in disableInfo){
      disableInfo[key] = disableInfo[key] <= 0
    }

    let orderSummary = null;

    let burger = this.state.error ? <p>Burger can't be loaded!</p> : <Spinner />

    if(this.state.ingredients){
      burger = (
        <Aux>
          <Burger
          ingredients={this.state.ingredients}/>
          <BuildControls
          ingredientsadded={this.addIngredientHandler}
          ingredientsremoved={this.removeIngredientHandler}
          disabled={disableInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          purchasing={this.purchasingHandler}/>
        </Aux>
      );
      orderSummary =   <OrderSummery
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        orderCancel={this.purchaseCancleHandler}
        orderContinue={this.purchaseContinueHandler}/>
    }

    if(this.state.loading){
      orderSummary = <Spinner />
    }

    return(
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancleHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
};

export default withErrorHandler(BurgerBuilder, axios);
