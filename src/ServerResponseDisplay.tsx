import * as React from "react";
import { InputSelection, ServerOutput} from "./Types";

interface State {}
interface Props {
  input: InputSelection;
  output: ServerOutput;
}

export class InfoForm extends React.PureComponent<Props, State> {
  render() {
    const {} = this.props;

    return <div className="main-form" />;
  }
}
