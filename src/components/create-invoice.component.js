import React, {Component} from "react";
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateInvoice extends Component {
    constructor(props) {
        super(props);
        
        
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

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeInvoiceNumber = this.onChangeInvoiceNumber.bind(this);
        this.onChangePaymentDate = this.onChangePaymentDate.bind(this);
        this.onChangeCustomerName = this.onChangeCustomerName.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeTotalPaid = this.onChangeTotalPaid.bind(this);
        this.onChangeDatePaid = this.onChangeDatePaid.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    

    componentDidMount() {
      axios.get(`${process.env.REACT_APP_API_URL}/users/`)
        .then(response => {
          if(response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
              username: response.data[0].username
            });
          }
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

        axios.post(`${process.env.REACT_APP_API_URL}/invoices/add`, invoice)
          .then(res => console.log(res.data));

        window.location = "/navbar";
    }
    
    render() {
        return (      
        <div>
         
            <h3>Create New Invoice Log</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>

                <select ref="userInput"
                    required
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
                <input type="submit" value="Create Invoice Log" className="btn btn-primary" />
              </div>
            </form>
          </div>
          );
    }
}

