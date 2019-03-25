import * as React from "react";
import axios from "axios";
import { InfoForm } from "./InfoForm";
import { ErrorMessage } from "./ErrorMessage";
import { ServerResponseDisplay } from "./ServerResponseDisplay";
import { ServerOutput, ServerInfo, ServerInput, InputSelection } from "./Types";
interface Props {}

interface State {
  loading: Boolean;
  errors: string[];
  inputSelection?: InputSelection;
  serverInfo?: ServerInfo;
  serverInput?: InputSelection;
  serverOutput?: ServerOutput;
}

const URL = "http://localhost:8000";

function initInputSelection(serverInfo: ServerInfo): InputSelection {
  const { foods, times, zipcodes } = serverInfo;

  const foodQuantities = foods.map(obj => ({
    ...obj,
    quantity: 0
  }));

  return {
    time: times[0],
    date: new Date(),
    zipcode: zipcodes[0],
    foods: foodQuantities
  };
}

function toServerInput(inputSelection: InputSelection): ServerInput {
  const obj: Record<string, string> = {};
  const { foods, zipcode, date, time } = inputSelection;
  foods.forEach(food => {
    const { camel, quantity } = food;
    obj[camel] = quantity.toString();
  });
  obj.zipcode = zipcode;
  obj.dateTime = date.toISOString().split("T")[0];
  obj.time = time;
  return obj;
}

export class FormWrapper extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      errors: []
    };
  }

  async componentDidMount() {
    const apiURL = `${URL}/data`;
    const {
      data: { data }
    } = await axios.get(apiURL);

    const inputSelection = initInputSelection(data);

    this.setState({
      loading: false,
      serverInfo: data,
      inputSelection
    });
  }

  onSubmit = async (input: InputSelection) => {
    const serverInput: ServerInput = toServerInput(input);
    this.setState({ loading: true, errors: [] });
    try {
      const { data } = await axios.post(`${URL}/submit`, serverInput);
      if (data.errors && data.errors.length) {
        this.setState({
          loading: false,
          errors: data.errors
        });
        return;
      }
      const serverOutput = data as ServerOutput;
      this.setState({ serverInput: input, serverOutput, loading: false });
    } catch (error) {
      this.setState({ errors: [error], loading: false });
    }
  };

  render() {
    const {
      loading,
      serverInfo,
      errors,
      inputSelection,
      serverInput,
      serverOutput
    } = this.state;
    const { onSubmit } = this;
    if (loading) {
      return <div> Loading ... </div>;
    }

    return (
      <div>
        <InfoForm
          serverInfo={serverInfo!}
          onSubmit={onSubmit}
          inputSelection={inputSelection!}
          setParentState={this.setState.bind(this)}
        />
        {errors.length > 0 && <ErrorMessage errors={errors} />}
        {errors.length === 0 && serverOutput && (
          <ServerResponseDisplay input={serverInput!} output={serverOutput!} />
        )}
      </div>
    );
  }
}
