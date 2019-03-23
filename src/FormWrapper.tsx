import * as React from "react";
import axios from "axios";
import { InfoForm } from "./Main";
import { FoodObject, ServerInfo } from "./types";

interface Props {}

interface State {
  loading: Boolean;
  serverInfo: ServerInfo;
}

const URL = "localhost:8000";

export class FormWrapper extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      serverInfo: null
    };
  }

  async componentDidMount() {
    const { data } = await axios.get(`${URL}/data`);
    this.setState({
      loading: false,
      serverInfo: data
    });
  }

  render() {
    return <div />;
  }
}
