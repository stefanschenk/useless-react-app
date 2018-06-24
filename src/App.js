import React, { Component } from 'react';
import './App.css';
import SelectedQuotes from "./SelectedQuotes";
import QuoteSearch from "./QuoteSearch";
import ContactForm from "./ContactForm";

class App extends Component {
  state = {
    selectedFoods: []
  };

  removeFoodItem = itemIndex => {
    const filteredFoods = this.state.selectedFoods.filter(
      (item, idx) => itemIndex !== idx
    );
    this.setState({ selectedFoods: filteredFoods });
  };

  addFood = food => {
    const newFoods = this.state.selectedFoods.concat(food);
    this.setState({ selectedFoods: newFoods });
  };

  render() {
    const { selectedFoods } = this.state;

    return (
      <div className="App rowC">
        <div className="ui text container">
          <SelectedQuotes
            foods={selectedFoods}
            onFoodClick={this.removeFoodItem}
          />
          <QuoteSearch onFoodClick={this.addFood} />
        </div>
        <div className="ui text container">
          {/*onFoodClick={this.addFood}*/}
          {/*<ContactList />*/}
          <ContactForm />
          {/*<Content inputDatas={inputDatas}/>*/}
          {/*<SelectedQuotes*/}
            {/*foods={selectedFoods}*/}
            {/*onFoodClick={this.removeFoodItem}*/}
          {/*/>*/}
        </div>
      </div>
    );
  }
}

export default App;
