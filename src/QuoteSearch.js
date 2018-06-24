import React from "react";
import Client from "./Client";

const MATCHING_ITEM_LIMIT = 25;

class QuoteSearch extends React.Component {
  state = {
    quotes: [],
    beforeFilter: [],
    showRemoveIcon: false,
    searchValue: "",
    filterCommunicator: "",
    filterQuote: ""
  };

  componentDidMount() {
    Client.search("", quotes => {
      this.setState({
        quotes: quotes.slice(0, MATCHING_ITEM_LIMIT)
      });

      this.setState({
        beforeFilter: this.state.quotes
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
        quotes: this.state.beforeFilter.filter(quote => quote.quote.toLowerCase().indexOf("") >= 0)
          .filter(quote => quote.communicator.toLowerCase().indexOf(this.state.filterCommunicator) >= 0),
        filterQuote: "",
        showRemoveIcon: false
      });
    } else {
      this.setState({
        showRemoveIcon: true
      });

      this.setState({
        quotes: this.state.beforeFilter.filter(quote => quote.quote.toLowerCase().indexOf(value) >= 0)
          .filter(quote => quote.communicator.toLowerCase().indexOf(this.state.filterCommunicator) >= 0)
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
        quotes: this.state.beforeFilter.filter(quote => quote.quote.toLowerCase().indexOf(this.state.filterQuote) >= 0)
          .filter(quote => quote.communicator.toLowerCase().indexOf("") >= 0),
        filterCommunicator: ""
      });
    } else {
      this.setState({
        quotes: this.state.beforeFilter.filter(quote => quote.quote.toLowerCase().indexOf(this.state.filterQuote) >= 0)
          .filter(quote => quote.communicator.toLowerCase().indexOf(value) >= 0)
      });
    }
  };

  handleFilterQuoteCancel = () => {
    this.setState({
      quotes: this.state.beforeFilter.filter(quote => quote.quote.toLowerCase().indexOf("") >= 0)
        .filter(quote => quote.communicator.toLowerCase().indexOf(this.state.filterCommunicator) >= 0),
      showRemoveIcon: false,
      filterQuote: ""
    });
  };

  render() {
    const { showRemoveIcon, quotes } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };
    const bold = { fontWeight: "bold" };

    const quoteDivs = quotes.map((quote, idx) => (
      <div className="QuoteSearch-quoteblock" key={idx} onClick={() => this.props.onQuoteClick(quote)}>
        <p className="QuoteSearch-quote">&#8220;{quote.quote}&#8221;</p>
        <p className="App-left">
          <span className="QuoteSearch-communicator">&mdash;&nbsp;{quote.communicator},&nbsp;</span>
          <span className="QuoteSearch-source">{quote.source}</span>
        </p>
      </div>
    ));

    return (
      <div id="quote-search">
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
