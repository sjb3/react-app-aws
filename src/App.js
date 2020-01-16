import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faThumbsUp,
  faThumbsDown,
  faMoneyCheckAlt,
  faSearchDollar
} from "@fortawesome/free-solid-svg-icons";

export default class App extends Component {
  state = {
    isLoading: false,
    invoices: []
    // invoices: [
    //   {
    //     id: "100",
    //     Vendor: "CHANEL",
    //     Amount: "$10,000.00",
    //     Invoice: "1234",
    //     Date: "01/01/2020"
    //   },
    //   {
    //     id: "101",
    //     Vendor: "Guccy",
    //     Amount: "$20,000.00",
    //     Invoice: "1235",
    //     Date: "01/01/2020"
    //   },
    //   {
    //     id: "102",
    //     Vendor: "LV",
    //     Amount: "$1,000.00",
    //     Invoice: "1236",
    //     Date: "01/01/2020"
    //   },
    //   {
    //     id: "103",
    //     Vendor: "ACNE",
    //     Amount: "$20,000.00",
    //     Invoice: "1237",
    //     Date: "01/01/2020"
    //   }
    // ]
  };

  remove(id) {
    let updatedInvoices = [...this.state.invoices].filter(i => i.id !== id);
    this.setState({ invoices: updatedInvoices });
  }

  async componentDidMount() {
    const response = await fetch(
      "https://qbchqc9qt2.execute-api.us-west-2.amazonaws.com/Dev"
    );
    const body = await response.json();
    this.setState({ invoices: body, isLoading: false });
  }

  render() {
    const { isLoading } = this.state;
    const allInvoices = this.state.invoices;

    if (isLoading) {
      return <div>Loading ...</div>;
    }

    let invoices = allInvoices.map(invoice => (
      <tr key={invoice.id}>
        <td>{invoice.Vendor}</td>
        <td>{invoice.Amount}</td>
        <td>{invoice.Invoice}</td>
        <td>{invoice.Date}</td>
        <td>
          <Button
            className="btn btn-lg btn-success"
            onClick={() => this.remove(invoice.id)}
          >
            <FontAwesomeIcon icon={faThumbsUp} /> OK
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-danger"
            onClick={() => this.remove(invoice.id)}
          >
            <FontAwesomeIcon icon={faThumbsDown} /> not OK
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-info"
            onClick={() => this.remove(invoice.id)}
          >
            <FontAwesomeIcon icon={faMoneyCheckAlt} /> 50%
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-warning"
            onClick={() => this.remove(invoice.id)}
          >
            <FontAwesomeIcon icon={faSearchDollar} /> ??
          </Button>
        </td>
        <td>
          <Button
            className="btn btn-lg btn-info"
            onClick={() => this.remove(invoice.id)}
          >
            <FontAwesomeIcon icon={faImage} /> Image
          </Button>
        </td>
      </tr>
    ));

    return (
      <div className="container border border-secondary rounded center">
        <div className="row">
          <div className="col-12">
            <h4>Pending Invoices</h4>
          </div>
        </div>
        <div className="row">
          <div className=".col-xs-12 center text-center">
            <Table dark responsive striped bordered hover>
              <thead>
                <tr>
                  <th>Vendor</th>
                  <th>Amount</th>
                  <th>Invoice #</th>
                  <th>Date</th>
                  <th colSpan="4">Actions</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>
                {this.state.invoices.length === 0 ? (
                  <td colSpan="9">All caught up</td>
                ) : (
                  invoices
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}
