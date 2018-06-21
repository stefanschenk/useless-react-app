import React from "react";

export default function SelectedQuotes(props) {
  const { foods } = props;

  const quoteDivs = foods.map((food, idx) => (
    <div className="QuoteSearch-quoteblock" key={idx} onClick={() => props.onFoodClick(idx)}>
      <p className="QuoteSearch-quote">&#8220;{food.quote}&#8221;</p>
      <p className="App-left">
        <span className="QuoteSearch-communicator">&mdash;&nbsp;{food.communicator},&nbsp;</span>
        <span className="QuoteSearch-source">{food.source}</span>
      </p>
    </div>
  ));

  const removeNoQuotesSelectedStyle = quoteDivs.length === 0 ? {} : { visibility: "hidden" };

  return (
    <div id="quotes-selected">
      <h3>Selected quotes</h3>
      <p style={removeNoQuotesSelectedStyle}>No quotes selected yet...</p>
      <div className="ui selectable structured large">
        {quoteDivs}
      </div>
    </div>
  );
}
