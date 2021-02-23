import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditInvoice extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeInvoiceNumber = this.onChangeInvoiceNumber.bind(this);
    this.onChangePaymentDate = this.onChangePaymentDate.bind(this);
    this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);
    this.onChangeTotalPaid = this.onChangeTotalPaid.bind(this);
    this.onChangeDatePaid = this.onChangeDatePaid.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      invoiceNumber: 0,
      paymentDate: new Date(),
      customerName: "",
      amount: 0,
      totalPaid: 0,
      datePaid: new Date(),
      users: []
  }
  }

  componentDidMount() {
    axios.get('https://invoice-backend1.herokuapp.com/invoices/'+this.props.match.params.id) 
      .then(response => {
        this.setState({
          username: response.data.username,
          invoiceNumber: response.data.invoiceNumber,
          paymentDate: new Date(response.data.paymentDate),
          customerName: response.data.customerName,
          amount: response.data.amount,
          totalPaid: new Date(response.data.totalPaid)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('https://invoice-backend1.herokuapp.com/users/')
      .then(response => {
        this.setState({ users: response.data.map(user => user.username) });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeUsername(e) {
    this.setState({
        username: e.target.value
    });
  }

  onChangeInvoiceNumber(e) {
      this.setState({
          invoiceNumber: e.target.value
      });
  }

  onChangePaymentDate(date) {
      this.setState({
          paymentDate: date
      });
  }

  onChangeCustomerName(e) {
      this.setState({
          customerName: e.target.value
      });
  }

  onChangeAmount(e) {
      this.setState({
          amount: e.target.value
      });
  }

  onChangeTotalPaid(e) {
      this.setState({
          totalPaid: e.target.value
      });
  }

  onChangeDatePaid(date) {
      this.setState({
          datePaid: date
      });
  }

  onSubmit(e) {
    e.preventDefault();

    const invoice = {
      username: this.state.username,
      invoiceNumber: this.state.invoiceNumber,
      paymentDate: this.state.paymentDate,
      customerName: this.state.customerName,
      amount: this.state.amount,
      totalPaid: this.state.totalPaid,
      datePaid: this.state.datePaid,
    };

    console.log(invoice);

    axios.post('https://invoice-backend1.herokuapp.com/invoices/update/'+this.props.match.params.id, invoice)
      .then(res => console.log(res.data));
    
    window.location = '/';
  }

  render() {
    return (
      <div>
       
        <h3>Edit Invoice Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
                <label>Customer Name: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.customerName}
                    onChange={this.onChangeCustomerName}
                    />
              </div>
              <div className="form-group"> 
                <label>Invoice Number: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.invoiceNumber}
                    onChange={this.onChangeInvoiceNumber}
                    />
              </div>
              <div className="form-group"> 
                <label>Amount: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.amount}
                    onChange={this.onChangeAmount}
                    />
              </div>
              <div className="form-group"> 
                <label>Total Paid: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.totalPaid}
                    onChange={this.onChangeTotalPaid}
                    />
              </div>
              <div className="form-group">
                <label>Payment Date: </label>
                <div>
                  <DatePicker
                    selected={this.state.paymentDate}
                    onChange={this.onChangePaymentDate}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Date Paid: </label>
                <div>
                  <DatePicker
                    selected={this.state.datePaid}
                    onChange={this.onChangeDatePaid}
                  />
                </div>
              </div>

          <div className="form-group">
            <input type="submit" value="Edit Invoice Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}