import * as React from "react";
import axios from "axios";
import { InfoForm } from "./Main";
import { ServerInfo, ServerInput, InputSelection } from "./Types";
interface Props {}

interface State {
  loading: Boolean;
  error?: string;
  serverInfo?: ServerInfo;
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
      await axios.post(`${URL}/submit`, serverInput);
      debugger;
    } catch (error) {
      console.log(error);
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
