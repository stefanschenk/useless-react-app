import React from "react";
import Client from "./Client";

const MATCHING_ITEM_LIMIT = 25;

class FoodSearch extends React.Component {
  state = {
    foods: [],
    showRemoveIcon: false,
    searchValue: ""
  };

  handleSearchChange = e => {
    const value = e.target.value;

    this.setState({
      searchValue: value
    });

    if (value === "") {
      this.setState({
        foods: [],
        showRemoveIcon: false
      });
    } else {
      this.setState({
        showRemoveIcon: true
      });

      Client.search(value, foods => {
        this.setState({
          foods: foods.slice(0, MATCHING_ITEM_LIMIT)
        });
      });
    }
  };

  handleSearchCancel = () => {
    this.setState({
      foods: [],
      showRemoveIcon: false,
      searchValue: ""
    });
  };

  render() {
    const { showRemoveIcon, foods } = this.state;
    const removeIconStyle = showRemoveIcon ? {} : { visibility: "hidden" };

    const foodRows = foods.map((food, idx) => (
      <tr key={idx} onClick={() => this.props.onFoodClick(food)}>
        <td>{food.quote}</td>
        <td className="right aligned">{food.communicator}</td>
        <td className="right aligned">{food.source}</td>
      </tr>
    ));

    return (
      <div id="food-search">
        <table className="ui selectable structured large table">
          <thead>
            <tr>
              <th colSpan="5">
                <div className="ui fluid search">
                  <div className="ui icon input">
                    <input
                      className="prompt"
                      type="text"
                      placeholder="Filter quotes..."
                      value={this.state.searchValue}
                      onChange={this.handleSearchChange}
                    />
                    <i className="search icon" />
                  </div>
                  <i
                    className="remove icon"
                    onClick={this.handleSearchCancel}
                    style={removeIconStyle}
                  />
                </div>
              </th>
            </tr>
            <tr>
              <th className="eight wide">Quote</th>
              <th>Door</th>
              <th>Bron</th>
            </tr>
          </thead>
          <tbody>
            {foodRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FoodSearch;
