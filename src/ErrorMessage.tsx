import * as React from "react";

interface Props {
  errors: string[];
}

interface State {}

export class ErrorMessage extends React.PureComponent<Props, State> {
  render() {
    const { errors } = this.props;

    return (
      <article className="message is-danger">
        {errors.map((message, idx) => (
          <div className="message-body" key={idx}>
            {message}
          </div>
        ))}
      </article>
    );
  }
}
