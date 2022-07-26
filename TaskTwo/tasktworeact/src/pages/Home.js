import styles from '../App.css';
import React from 'react';

import CustomerTable from '../components/CustomerTable';
const $ = require("jquery");
$.Datatable = require("datatables.net")

const Home = () => {

    return (
        <div>

            <CustomerTable />
        </div>
    );
};

export default Home;