import * as React from "react";
import { ServerInfo, InputSelection, FoodQuantity } from "./Types";
import Autocomplete from "react-autocomplete";

interface State {}

interface Props {
  inputSelection: InputSelection;
  serverInfo: ServerInfo;
  setParentState: any;
  onSubmit: (inputSelection: InputSelection) => void;
}

function isoDate(date: any) {
  if (!date || date.getDate() == NaN) {
    date = new Date();
  }

  return date.toISOString().split("T")[0];
}

export class InfoForm extends React.PureComponent<Props, State> {
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
              const inputSelection = { ...this.props.inputSelection };
              inputSelection.foods = inputSelection.foods.slice();
              inputSelection.foods[idx].quantity = value;
              this.props.setParentState({ inputSelection });
            }}
          />
        </div>
      </div>
    );
  };

  renderFoods = () => {
    return this.props.inputSelection.foods.map(this.renderFoodInput);
  };

  render() {
    const { renderFoods } = this;
    const { times, zipcodes } = this.props.serverInfo;
    const { onSubmit, inputSelection, setParentState } = this.props;
    const { zipcode, date, time } = inputSelection;

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
                const inputSelection = { ...this.props.inputSelection };
                inputSelection.zipcode = e.target.value;
                setParentState({ inputSelection });
              }}
              onSelect={e => {
                const inputSelection = { ...this.props.inputSelection };
                inputSelection.zipcode = e;
                setParentState({ inputSelection });
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
                value={isoDate(date)}
                onChange={e => {
                  const inputSelection = { ...this.props.inputSelection };
                  inputSelection.date = new Date(e.target.value);
                  this.props.setParentState({ inputSelection });
                }}
              />
            </div>
          </div>

          <div className="control is-medium">
            <label className="label">Time Range</label>
            <div className="select">
              <select
                value={time}
                onChange={e => {
                  const inputSelection = { ...this.props.inputSelection };
                  inputSelection.time = e.target.value;
                  this.props.setParentState({ inputSelection });
                }}
              >
                {times.map((time, idx: number) => (
                  <option key={idx} value={time}>
                    {time}
                  </option>
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
              onClick={() => onSubmit(inputSelection)}
            >
              Submit
            </a>
          </p>
        </div>
      </div>
    );
  }
}
