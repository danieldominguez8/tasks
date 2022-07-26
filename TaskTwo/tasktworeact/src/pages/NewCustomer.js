
import React, { useEffect } from 'react';
import axios from "axios";
const $ = require("jquery");
$.Datatable = require("datatables.net");

async function setMinimum() {
    const res = await axios.get("http://localhost:5001/api/customers");
    let highestId = res.data[res.data.length - 1].CustomerId;
    var idInput = document.getElementById("newCustomerId");
    idInput.min = highestId + 1;
    idInput.value = highestId + 1;
}

function clearForm() {
    document.getElementById("newCustomerName").value = "";
    document.getElementById("newCustomerAddress").value = "";
    document.getElementById("newCustomerCity").value = "";
    document.getElementById("newCustomerState").value = "";
    document.getElementById("newCustomerZip").value = "";
    setMinimum();
}
async function submit() {
    var newCustomerId = document.getElementById("newCustomerId").value;
    var newCustomerName = document.getElementById("newCustomerName").value;
    var newCustomerAddress = document.getElementById("newCustomerAddress").value;
    var newCustomerCity = document.getElementById("newCustomerCity").value;
    var newCustomerState = document.getElementById("newCustomerState").value;
    var newCustomerZip = document.getElementById("newCustomerZip").value;
    if (newCustomerName.length === 0 || newCustomerAddress.length === 0 || newCustomerCity.length === 0 || newCustomerState.length === 0 || newCustomerZip.length === 0) {
        alert("Please Fill All Required Fields");
        return false;
    }
    var customer = { CustomerId: newCustomerId, Name: newCustomerName, Address: newCustomerAddress, City: newCustomerCity, State: newCustomerState, Zip: newCustomerZip };
    console.log(customer);
    await axios.post("http://localhost:5001/api/customers/", customer)
        .then(function (response) {
            alert("Customer " + newCustomerName + " has been added!");
            clearForm()
        })
        .catch(function (error) {
            console.log(error);
        });

}


const NewCustomer = () => {
    useEffect(() => {
        setMinimum()
    })
    return (
        <div >
            <h2>Create New Customer</h2>
            <table id="customerTable" className="center">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td><input type="number" min="0" id="newCustomerId" /></td>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <td><input type="text" id="newCustomerName" /></td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td><input type="text" id="newCustomerAddress" /></td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td><input type="text" id="newCustomerCity" /></td>
                    </tr>
                    <tr>
                        <th>State</th>
                        <td>
                            <select id="newCustomerState">
                                <option value="">Select a state</option>
                                <option value="AL">Alabama</option>
                                <option value="AK">Alaska</option>
                                <option value="AZ">Arizona</option>
                                <option value="AR">Arkansas</option>
                                <option value="CA">California</option>
                                <option value="CO">Colorado</option>
                                <option value="CT">Connecticut</option>
                                <option value="DE">Delaware</option>
                                <option value="DC">District of Columbia</option>
                                <option value="FL">Florida</option>
                                <option value="GA">Georgia</option>
                                <option value="HI">Hawaii</option>
                                <option value="ID">Idaho</option>
                                <option value="IL">Illinois</option>
                                <option value="IN">Indiana</option>
                                <option value="IA">Iowa</option>
                                <option value="KS">Kansas</option>
                                <option value="KY">Kentucky</option>
                                <option value="LA">Louisiana</option>
                                <option value="ME">Maine</option>
                                <option value="MD">Maryland</option>
                                <option value="MA">Massachusetts</option>
                                <option value="MI">Michigan</option>
                                <option value="MN">Minnesota</option>
                                <option value="MS">Mississippi</option>
                                <option value="MO">Missouri</option>
                                <option value="MT">Montana</option>
                                <option value="NE">Nebraska</option>
                                <option value="NV">Nevada</option>
                                <option value="NH">New Hampshire</option>
                                <option value="NJ">New Jersey</option>
                                <option value="NM">New Mexico</option>
                                <option value="NY">New York</option>
                                <option value="NC">North Carolina</option>
                                <option value="ND">North Dakota</option>
                                <option value="OH">Ohio</option>
                                <option value="OK">Oklahoma</option>
                                <option value="OR">Oregon</option>
                                <option value="PA">Pennsylvania</option>
                                <option value="RI">Rhode Island</option>
                                <option value="SC">South Carolina</option>
                                <option value="SD">South Dakota</option>
                                <option value="TN">Tennessee</option>
                                <option value="TX">Texas</option>
                                <option value="UT">Utah</option>
                                <option value="VT">Vermont</option>
                                <option value="VA">Virginia</option>
                                <option value="WA">Washington</option>
                                <option value="WV">West Virginia</option>
                                <option value="WI">Wisconsin</option>
                                <option value="WY">Wyoming</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>Zip</th>
                        <td><input type="text" id="newCustomerZip" /></td>
                    </tr>
                </tbody>
            </table>

            <div className="centerButton">
                <input type="button" value="Submit" onClick={() => submit()} />
            </div>
        </div>
    );
};

export default NewCustomer;