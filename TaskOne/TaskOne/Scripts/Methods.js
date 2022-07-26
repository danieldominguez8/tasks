function setMinimum() {
    var currentId = 1;
    $(document).ready(function () {
        $.ajax({
            type: 'GET',
            url: '/api/customers',
            mimeType: 'json',
            success: function (data) {
                $.each(data, function (i, data) {
                    currentId = data.CustomerId;
                });
                var idInput = document.getElementById("newCustomerId");
                idInput.min = currentId+1;
                idInput.value = currentId+1;
            },
            error: function () {
                alert('Fail!');
            }
        });
    });

}


function formatItem(item) {
    return item.Name + '-' + item.Address;
}

function find() {
    var customerId = $('#customerId').val();
    if (customerId != "") {
        $.getJSON("/api/customers" + '/' + customerId)
            .done(function (data) {
                $('#customerSearch').text(formatItem(data));
            })
            .fail(function (jqXHR, textStatus, err) {
                $('#customerSearch').text('User not found' + err);
            })
    } 
}
function clearForm() {
    document.getElementById("newCustomerName").value = "";
    document.getElementById("newCustomerAddress").value = "";
    document.getElementById("newCustomerCity").value = "";
    document.getElementById("newCustomerState").value = "";
    document.getElementById("newCustomerZip").value = "";
}

function submit() {
    var newCustomerId = $('#newCustomerId').val();
    var newCustomerName = $('#newCustomerName').val();
    var newCustomerAddress = $('#newCustomerAddress').val();
    var newCustomerCity = $('#newCustomerCity').val();
    var newCustomerState = $('#newCustomerState').val();
    var newCustomerZip = $('#newCustomerZip').val();
    if (newCustomerName.length === 0 || newCustomerAddress.length === 0 || newCustomerCity.length === 0 || newCustomerState.length === 0 || newCustomerZip.length === 0) {
        alert("Please Fill All Required Fields");
        return false;
    }
    var customer = { CustomerId: newCustomerId, Name: newCustomerName, Address: newCustomerAddress, City: newCustomerCity, State: newCustomerState, Zip: newCustomerZip };

    $.ajax({
        url: 'api/customers',
        type: 'POST',
        data: JSON.stringify(customer),
        contentType: 'application/json; charset=utf-8',
        async: true,
        success: function (msg) {
            alert(newCustomerName + " has been added.");
            setMinimum();
            clearForm();
        }
    });
}

function update(customerId) {
    var newCustomerId = customerId;
    var newCustomerName = $('#newCustomerName').val();
    var newCustomerAddress = $('#newCustomerAddress').val();
    var newCustomerCity = $('#newCustomerCity').val();
    var newCustomerState = $('#newCustomerState').val();
    var newCustomerZip = $('#newCustomerZip').val();
    if (newCustomerName.length === 0 || newCustomerAddress.length === 0 || newCustomerCity.length === 0 || newCustomerState.length === 0 || newCustomerZip.length === 0) {
        alert("Please Fill All Required Fields");
        return false;
    }
    var customer = { CustomerId: newCustomerId, Name: newCustomerName, Address: newCustomerAddress, City: newCustomerCity, State: newCustomerState, Zip: newCustomerZip };
    $.ajax({
        url: 'api/customers/' + customerId,
        type: 'PUT',
        data: JSON.stringify(customer),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (msg) {
            window.location.replace("/");
        }
    });
}

function deleteCustomer(customerId) {
    $.ajax({
        url: 'api/customers/' + customerId,
        type: 'DELETE',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        async: true,
        success: function (msg) {
            alert("Customer ID: " +customerId + " has been deleted.");
            document.getElementById(customerId).style.display = "none";
        }
    });
}

