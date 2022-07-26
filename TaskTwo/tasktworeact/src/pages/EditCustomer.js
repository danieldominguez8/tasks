import React, { useEffect } from 'react';
import axios from "axios";

const EditCustomer = () => {

    async function setCurrentCustomerId() {
        let html = window.location.search.substring(1);
        let htmlId = html.split('=')[1];
        const res = await axios.get("http://localhost:5001/api/customers/" + htmlId);
        document.getElementById("currentCustomerId").innerHTML = res.data.CustomerId;
        document.getElementById("newCustomerName").value = res.data.Name;
        document.getElementById("newCustomerAddress").value = res.data.Address;
        document.getElementById("newCustomerCity").value = res.data.City;
        document.getElementById("newCustomerState").value = res.data.State;
        document.getElementById("newCustomerZip").value = res.data.Zip;
    }
    useEffect(() => {
        setCurrentCustomerId()
    }, [])

    async function deleteCustomer() {
        var currentCustomerId = document.getElementById("currentCustomerId").innerHTML;
        await axios.delete("http://localhost:5001/api/customers/" + currentCustomerId)
            .then(function (response) {
                alert("Customer ID: " + currentCustomerId + " has been deleted")
                console.log(response);
                window.location = '/';
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function updateCustomer() {
        var currentCustomerId = document.getElementById("currentCustomerId").innerHTML;
        var newCustomerName = document.getElementById("newCustomerName").value;
        var newCustomerAddress = document.getElementById("newCustomerAddress").value;
        var newCustomerCity = document.getElementById("newCustomerCity").value;
        var newCustomerState = document.getElementById("newCustomerState").value;
        var newCustomerZip = document.getElementById("newCustomerZip").value;
        if (newCustomerName.length === 0 || newCustomerAddress.length === 0 || newCustomerCity.length === 0 || newCustomerState.length === 0 || newCustomerZip.length === 0) {
            alert("Please Fill All Required Fields");
            return false;
        }
        var customer = { CustomerId: currentCustomerId, Name: newCustomerName, Address: newCustomerAddress, City: newCustomerCity, State: newCustomerState, Zip: newCustomerZip };
        await axios.put("http://localhost:5001/api/customers/" + currentCustomerId, customer)
            .then(function (response) {
                alert("Customer ID: " + currentCustomerId + " has been updated")
                console.log(response);
                window.location = '/';
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div>
            <h2>Edit User</h2>
            <table id="customerTable" className="center">
                <tbody>
                    <tr >
                        <th>ID</th>
                        <td style={{ textAlign: 'center' }} id="currentCustomerId"></td>
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
                                <option value="">Select a state..................</option>
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
                <input type="button" value="Update" onClick={() => updateCustomer()} />
                <input type="button" value="Delete" onClick={() => deleteCustomer()} />
            </div>

        </div >
    );
};

export default EditCustomer;