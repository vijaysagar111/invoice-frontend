import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar.component";
const Invoice = props => {
    const initialState = {
        items: [
          {
            name: 'Car',
            quantity: 1,
            unit_cost: props.invoice.totalPaid
          }
        ],
        date: props.invoice.datePaid,
        to: props.invoice.customerName,
        currency: 'INR',
        number: props.invoice.invoiceNumber,
        tax: 12,
        tax_title: 'CGST+IGST',
        logo: 'http://invoiced.com/img/logo-invoice.png',
        fields: {
          tax: '%'
        },
        loading: false,
        payment_terms: "Auto-Billed - Do Not Pay",
        notes: "Thanks for being an awesome customer!",
          terms: "No need to submit payment. You will be auto-billed for this invoice.",
        };
    
    function onGenerate(){
        console.log(initialState)
        axios.post('https://invoice-backend1.herokuapp.com/invoices/generate', initialState)
            .then(res => alert(res.data));
  
      }
    return (<tr>
        <td>{props.invoice.username}</td>
        <td>{props.invoice.customerName}</td>
        <td>{props.invoice.invoiceNumber}</td>
        <td>{props.invoice.amount}</td>
        <td>{props.invoice.totalPaid}</td>
        <td>{props.invoice.paymentDate.substring(0,10)}</td>
        <td>{props.invoice.datePaid.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.invoice._id}>edit</Link> | <a href="#" onClick={() => { props.deleteInvoice(props.invoice._id) }}>delete</a> 
            | <a onClick={onGenerate} href = "https://invoice-backend1.herokuapp.com/pdfs" style={{color:"blue", cursor:"pointer"}} download>Generate</a>
        </td>
    </tr>)
}

export default class InvoiceList extends Component {
    constructor(props) {
        super(props);
        
        this.deleteInvoice = this.deleteInvoice.bind(this);
        this.state = {
            invoices: []
        };
    }

    componentDidMount() {
        axios.get("https://invoice-backend1.herokuapp.com/invoices/")
            .then(response => {
                this.setState({
                    invoices: response.data
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    deleteInvoice(id) {
        axios.delete("https://invoice-backend1.herokuapp.com/invoices/" + id)
            .then(response => {console.log(response.data)});

        this.setState({
            invoices: this.state.invoices.filter(el => el._id !== id)
        })
    }

    invoiceList() {
        return this.state.invoices.map(currentinvoice => {
            return <Invoice invoice = {currentinvoice} deleteInvoice = {this.deleteInvoice} key = {currentinvoice._id}/>;
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <h3>Logged Invoices</h3>
                <table className = "table"style={{fontSize:'20px'}} >
                    <thead className = "thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Customer Name</th>
                            <th>Invoice Number</th>
                            <th>Amount</th>
                            <th>Total Paid</th>
                            <th>Payment Date</th>
                            <th>Date Paid</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.invoiceList()
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}