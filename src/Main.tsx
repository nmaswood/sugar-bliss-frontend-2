import * as React from "react";
import Autocomplete from "react-autocomplete";

interface State {
  value: string;
}
interface Props {
  timeOptions?: string[];
  dropdownOptions?: string[];
  orderOptions?: string[];
}

export class InfoForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { value: "" };
  }

  render() {
    return (
      <div className="field is-grouped">
        <div className="control">
          <label className="label">Zipcode</label>
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              pattern="[0-9]*"
            />
          </div>
        </div>

        <div className="control">
          <label className="label">Time</label>
          <div className="control">
            <input className="input" type="date" />
          </div>
        </div>

        <div className="control">
          <label className="label">Time Range</label>
          <div className="select">
            <select>
              <option>Select dropdown</option>
              <option>With options</option>
            </select>
          </div>
        </div>
        <Autocomplete
          items={[]}
          getItemValue={item => item}
          renderItem={item => <div key={item}>{item}</div>}
          value={"foo"}
        />
      </div>
    );
  }
}
