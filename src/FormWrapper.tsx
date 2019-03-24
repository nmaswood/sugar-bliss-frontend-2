import * as React from "react";
import axios from "axios";
import { InfoForm } from "./InfoForm";
import { ServerOutput, ServerInfo, ServerInput, InputSelection } from "./Types";
interface Props {}

interface State {
  loading: Boolean;
  error?: string;
  serverInfo?: ServerInfo;
  serverInput?: ServerInput;
  serverOutput?: ServerOutput;
}

const URL = "http://localhost:8000";

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

export class FormWrapper extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  async componentDidMount() {
    const apiURL = `${URL}/data`;
    const {
      data: { data }
    } = await axios.get(apiURL);
    this.setState({
      loading: false,
      serverInfo: data
    });
  }

  onSubmit = async (input: InputSelection) => {
    const serverInput: ServerInput = toServerInput(input);
    try {
      const { data } = await axios.post(`${URL}/submit`, serverInput);
      const serverOutput = data as ServerOutput;
      debugger;
      this.setState({ serverInput, serverOutput, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    const { loading, serverInfo } = this.state;
    const { onSubmit } = this;
    if (loading) {
      return (
        <div>
          <div>Loading...</div>
        </div>
      );
    }

    return (
      <div>
        <InfoForm serverInfo={serverInfo!} onSubmit={onSubmit} />
      </div>
    );
  }
}
