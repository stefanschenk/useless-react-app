import React from "react";
import Client from "./Client";

const MATCHING_ITEM_LIMIT = 25;

class QuoteSearch extends React.Component {
  state = {
    foods: [],
    beforeFilter: [],
    showRemoveIcon: false,
    searchValue: "",
    filterCommunicator: "",
    filterQuote: ""
  };

  componentDidMount() {
    Client.search("", foods => {
      this.setState({
        foods: foods.slice(0, MATCHING_ITEM_LIMIT)
      });

      this.setState({
        beforeFilter: this.state.foods
      })
    });
  }

  handleFilterQuote = e => {
    const value = e.target.value.toLowerCase();

    this.setState(() => ({ filterQuote: value }));

    if (this.state.beforeFilter.length === 0) {
      console.log("beforeFilter can't be empty!")
    }

    if (value === "") {
      this.setState({
        foods: this.state.beforeFilter.filter(food => food.quote.toLowerCase().indexOf("") >= 0)
          .filter(food => food.communicator.toLowerCase().indexOf(this.state.filterCommunicator) >= 0),
        filterQuote: "",
        showRemoveIcon: false
      });
    } else {
      this.setState({
        showRemoveIcon: true
      });

      this.setState({
        foods: this.state.beforeFilter.filter(food => food.quote.toLowerCase().indexOf(value) >= 0)
          .filter(food => food.communicator.toLowerCase().indexOf(this.state.filterCommunicator) >= 0)
      });
    }
  };

  handleFilterCommunicator = e => {
    const value = e.target.value.toLowerCase();

    this.setState(() => ({ filterCommunicator: value }));

    if (this.state.beforeFilter.length === 0) {
      console.log("beforeFilter can't be empty!")
    }

    if (value === "") {
      this.setState({
        foods: this.state.beforeFilter.filter(food => food.quote.toLowerCase().indexOf(this.state.filterQuote) >= 0)
          .filter(food => food.communicator.toLowerCase().indexOf("") >= 0),
        filterCommunicator: ""
      });
    } else {
      this.setState({
        foods: this.state.beforeFilter.filter(food => food.quote.toLowerCase().indexOf(this.state.filterQuote) >= 0)
          .filter(food => food.communicator.toLowerCase().indexOf(value) >= 0)
      });
    }
  };

  handleFilterQuoteCancel = () => {
    this.setState({
      foods: this.state.beforeFilter.filter(food => food.quote.toLowerCase().indexOf("") >= 0)
        .filter(food => food.communicator.toLowerCase().indexOf(this.state.filterCommunicator) >= 0),
      showRemoveIcon: false,
      filterQuote: ""
    });
  };

  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };
    const bold = { fontWeight: "bold" };

    const quoteDivs = foods.map((food, idx) => (
      <div className="QuoteSearch-quoteblock" key={idx} onClick={() => this.props.onFoodClick(food)}>
        <p className="QuoteSearch-quote">&#8220;{food.quote}&#8221;</p>
        <p className="App-left">
          <span className="QuoteSearch-communicator">&mdash;&nbsp;{food.communicator},&nbsp;</span>
          <span className="QuoteSearch-source">{food.source}</span>
        </p>
      </div>
    ));

    return (
      <div id="food-search">
        <span className="ui fluid search">
          <div className="ui icon input">
            <input
              className="prompt"
              type="text"
              placeholder="Filter quotes..."
              value={this.state.filterQuote}
              onChange={this.handleFilterQuote}
            />
            <i className="search icon" />
          </div>
          <i
            className="remove icon"
            onClick={this.handleFilterQuoteCancel}
            style={removeIconStyle}
          />
        </span>
        <span style={bold}>
          Said by:&nbsp;
        </span>
        <span className="ui fluid search">
          <div className="ui icon input">
            <input
              className="prompt"
              type="text"
              placeholder="Start typing a name..."
              value={this.state.filterCommunicator}
              onChange={this.handleFilterCommunicator}
            />
            <i className="filter icon" />
          </div>
        </span>
        <div className="ui selectable structured large">
          {quoteDivs}
        </div>
      </div>
    );
  }
}

export default QuoteSearch;
