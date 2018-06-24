import React, { Component } from 'react';
import './App.css';
import SelectedQuotes from "./SelectedQuotes";
import QuoteSearch from "./QuoteSearch";
import ContactForm from "./ContactForm";

class App extends Component {
  state = {
    selectedQuotes: []
  };

  removeQuoteItem = itemIndex => {
    const filteredQuotes = this.state.selectedQuotes.filter(
      (item, idx) => itemIndex !== idx
    );
    this.setState({ selectedQuotes: filteredQuotes });
  };

  addQuote = quote => {
    const newQuotes = this.state.selectedQuotes.concat(quote);
    this.setState({ selectedQuotes: newQuotes });
  };

  render() {
    const { selectedQuotes } = this.state;

    return (
      <div className="App rowC">
        <div className="ui text container">
          <SelectedQuotes
            quotes={selectedQuotes}
            onQuoteClick={this.removeQuoteItem}
          />
          <QuoteSearch onQuoteClick={this.addQuote} />
        </div>
        <div className="ui text container">
          <ContactForm />
        </div>
      </div>
    );
  }
}

export default App;
