import * as React from "react";
import { ServerInfo, InputSelection, FoodQuantity } from "./Types";
import Autocomplete from "react-autocomplete";

interface State {
  input: InputSelection;
}

interface Props {
  serverInfo: ServerInfo;
  onSubmit: (input: InputSelection) => void;
}

export class InfoForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    const {
      serverInfo: { foods, times, zipcodes }
    } = this.props;

    const foodQuantities = foods.map(obj => ({
      ...obj,
      quantity: 0
    }));

    this.state = {
      input: {
        time: times[0],
        date: new Date(),
        zipcode: zipcodes[0],
        foods: foodQuantities
      }
    };
  }
  renderFoodInput = (food: FoodQuantity, idx: number) => {
    const { quantity, display } = food;

    return (
      <div className="control is-medium" key={idx}>
        <label className="label">{display}</label>
        <div className="control is-medium">
          <input
            type="number"
            min="0"
            max="1000"
            placeholder="0"
            value={quantity === 0 ? "" : quantity.toString()}
            onChange={e => {
              const value = parseInt(e.target.value) || 0;
              const input = { ...this.state.input };
              input.foods = input.foods.slice();
              input.foods[idx].quantity = value;
              this.setState({ input });
            }}
          />
        </div>
      </div>
    );
  };

  renderFoods = () => {
    return this.state.input.foods.map(this.renderFoodInput);
  };

  render() {
    const { renderFoods } = this;
    const { times, zipcodes } = this.props.serverInfo;
    const { input } = this.state;
    const { zipcode, date } = input;
    const { onSubmit } = this.props;

    return (
      <div className="main-form">
        <div className="field is-grouped">
          <div className="control is-medium">
            <label className="label">Zipcode</label>
            <Autocomplete
              items={zipcodes}
              menuStyle={{ zIndex: 2, position: "fixed", cursor: "pointer" }}
              getItemValue={zipcode => zipcode}
              shouldItemRender={(item, value) =>
                item.indexOf(value.toLowerCase()) > -1
              }
              onChange={e => {
                const input = { ...this.state.input };
                input.zipcode = e.target.value;
                this.setState({ input });
              }}
              onSelect={e => {
                const input = { ...this.state.input };
                input.zipcode = e;
                this.setState({ input });
              }}
              renderItem={(item, isHighlighted) => (
                <div
                  style={{ background: isHighlighted ? "lightgray" : "white" }}
                >
                  {item}
                </div>
              )}
              value={zipcode}
            />
          </div>

          <div className="control is-medium">
            <label className="label">Time</label>
            <div className="control is-medium">
              <input
                className="input"
                type="date"
                value={date.toISOString().split("T")[0]}
                onChange={e => {
                  const input = { ...this.state.input };
                  input.date = new Date(e.target.value);
                  this.setState({ input });
                }}
              />
            </div>
          </div>

          <div className="control is-medium">
            <label className="label">Time Range</label>
            <div className="select">
              <select>
                {times.map((time, idx: number) => (
                  <option key={idx}>{time}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="field is-grouped">{renderFoods()}</div>
        <div className="final-submit-button field is-grouped is-grouped-centered">
          <p className="control is-medium">
            <a
              className="button is-primary is-medium"
              onClick={() => onSubmit(input)}
            >
              Submit
            </a>
          </p>
        </div>
      </div>
    );
  }
}
