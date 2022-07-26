import React, { Component } from "react";
import axios from "axios";
import "datatables.net-dt/css/jquery.dataTables.min.css";
const $ = require("jquery");
$.Datatable = require("datatables.net")


class CustomerTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            loading: true
        };
    }

    async getCustomersData() {
        const res = await axios.get("http://localhost:5001/api/customers");
        this.setState({ loading: false, customers: res.data });
    }



    componentDidMount() {
        this.getCustomersData().then(() => this.sync());
    }


    sync() {
        this.$el = $(this.el);
        this.$el.DataTable({
            "bPaginate": false,
            "bLengthChange": false,
            "bInfo": false,

            data: this.state.customers,
            columns: [
                { title: "Customer ID", data: "CustomerId" },
                { title: "Name", data: "Name" },
                { title: "Address", data: "Address" },
                { title: "City", data: "City" },
                { title: "State", data: "State" },
                { title: "Zip", data: "Zip" },
                {
                    title: "Action", data: "CustomerId",
                    render: function (data) {
                        return "<button id='" + data + "'class='edit' >Edit</button>"
                    }
                }],
            'columnDefs': [{
                'targets': [6], /* column index */
                'orderable': false, /* true or false */
            }]
        });

        $('.edit').on('click', function () {
            window.location = '/edit?id=' + this.id;
        });

    }

    render() {
        return (
            <table
                className="display"
                width="100%"
                ref={(el) => (this.el = el)}
            ></table>
        );
    }
}

export default CustomerTable;

