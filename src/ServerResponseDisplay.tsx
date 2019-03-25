import * as React from "react";
import { InputSelection, ServerOutput, CarrierPrice } from "./Types";
import ReactTable from "react-table";
import { ErrorMessage } from "./ErrorMessage";

interface State {}
interface Props {
  input: InputSelection;
  output: ServerOutput;
}

export class ServerResponseDisplay extends React.PureComponent<Props, State> {
  render() {
    const { output } = this.props;
    if (!output.valid) {
      return (
        <ErrorMessage errors={["Custom order is needed for this quantity"]} />
      );
    }

    const { basePrice, total, priceResult } = output;

    return (
      <div className="main-form">
        <p className="subtitle is-3">Total Final</p>
        <CarrierDictDisplay carrierPrices={total} />

        <p className="subtitle is-3">Base Prices</p>
        <CarrierDictDisplay carrierPrices={basePrice} />

        <p className="subtitle is-3">Calculated Prices</p>
        <PriceResultDisplay priceResult={priceResult} />
      </div>
    );
  }
}

interface CarrierDisplayProps {
  carrierPrices: CarrierPrice[];
}

class CarrierDictDisplay extends React.PureComponent<CarrierDisplayProps> {
  render() {
    const { carrierPrices } = this.props;

    const columns = [
      {
        Header: "Carrier",
        accessor: "carrier"
      },
      {
        Header: "Date",
        accessor: "date"
      },
      {
        Header: "Price",
        accessor: "price"
      },
      {
        Header: "Time",
        accessor: "time"
      }
    ];
    return (
      <ReactTable
        data={carrierPrices}
        columns={columns}
        defaultPageSize={4}
        showPagination={false}
      />
    );
  }
}

interface PriceResultDisplayProps {
  priceResult: {
    ld: number;
    usm: number;
    ldDict: Record<string, number>;
    usmDict: Record<string, number>;
  };
}

class PriceResultDisplay extends React.PureComponent<PriceResultDisplayProps> {
  render() {
    const {
      priceResult: { ld, usm, ldDict, usmDict }
    } = this.props;
    const ldDictArray = Object.entries(ldDict).map(([key, value]) => ({
      key,
      value
    }));
    const usmDictArray = Object.entries(usmDict).map(([key, value]) => ({
      key,
      value
    }));

    const columns = [
      {
        Header: "Item",
        accessor: "key"
      },
      {
        Header: "Price",
        accessor: "value"
      }
    ];
    return (
      <div>
        <p className="subtitle is-5" style={{ textAlign: "left" }}>
          Lightning Direct: ${ld}
        </p>
        <ReactTable
          data={ldDictArray}
          columns={columns}
          defaultPageSize={6}
          showPagination={false}
        />
        <p
          className="subtitle is-5"
          style={{ textAlign: "left", marginTop: "10px" }}
        >
          USM: ${usm}
        </p>
        <ReactTable
          data={usmDictArray}
          columns={columns}
          defaultPageSize={6}
          showPagination={false}
        />
      </div>
    );
  }
}
