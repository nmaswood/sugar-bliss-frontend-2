import * as React from "react";
import axios from "axios";
import { InfoForm } from "./InfoForm";
import { ErrorMessage } from "./ErrorMessage";
import { ServerResponseDisplay } from "./ErrorMessage";
import { ServerOutput, ServerInfo, ServerInput, InputSelection } from "./Types";
interface Props {}

interface State {
  loading: Boolean;
  errors: string[];
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
      loading: true,
      errors: []
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
    this.setState({ loading: true });
    try {
      const { data } = await axios.post(`${URL}/submit`, serverInput);
      if (data.errors && data.errors.length) {
        this.setState({
          errors: data.errors,
          loading: false
        });
        return;
      }

      const serverOutput = data as ServerOutput;
      this.setState({ serverInput, serverOutput, loading: false });
    } catch (error) {
      this.setState({ errors: [error], loading: false });
    }
  };

  render() {
    const {
      loading,
      serverInfo,
      errors,
      serverInput,
      serverOutput
    } = this.state;
    const { onSubmit } = this;
    if (loading) {
      return <div> Loading ... </div>;
    }

    return (
      <div>
        <InfoForm serverInfo={serverInfo!} onSubmit={onSubmit} />
        {errors.length > 0 && <ErrorMessage errors={errors} />}
        {errors.length === 0 && serverOutput && (
          <ServerResponseDisplay input={serverInput} output={serverOutput} />
        )}
      </div>
    );
  }
}
