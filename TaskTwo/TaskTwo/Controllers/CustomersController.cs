using System;
using System.Collections.Generic;
using System.Data.OleDb;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using TaskTwo.Models;

namespace TaskTwo.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CustomersController : ApiController
    {
        public List<CustomerModel> Get()
        {
            return LoadList() ;
        }
        public CustomerModel Get(int id)
        {
            return LoadList().Where(e => e.CustomerId == id).ToList()[0];
        }
        public void Post([FromBody] CustomerModel customer)
        {
            using (var conection = GetConnection())
            {
                var nonQuery = "INSERT INTO Customers (customerId, name, address, city, state, zip) " +
                    "VALUES(" + customer.CustomerId + ", '" + customer.Name + "', '" + customer.Address + "', '" + customer.City + "', '"
                     + customer.State + "','" + customer.Zip + "')";
                var command = new OleDbCommand(nonQuery, conection);
                try
                {
                    var reader = command.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    System.Diagnostics.Debug.WriteLine(e);
                }
            }
        }
        public void Put(int id, [FromBody] CustomerModel customer)
        {
            using (var conection = GetConnection())
            {
                var nonQuery = "UPDATE Customers SET Name='" + customer.Name + "', Address='" + customer.Address + "', City='" + customer.City + "', State='" + customer.State + "', Zip='" + customer.Zip + "' WHERE customerId=" + customer.CustomerId;
                var command = new OleDbCommand(nonQuery, conection);
                try
                {
                    var reader = command.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    System.Diagnostics.Debug.WriteLine(e);
                }
            }
        }
        public void Delete( int id)
        {
            using (var conection = GetConnection())
            {
                var nonQuery = "DELETE FROM Customers WHERE customerId = " + id;
                var command = new OleDbCommand(nonQuery, conection);
                try
                {
                    var reader = command.ExecuteNonQuery();
                }
                catch (Exception e)
                {
                    System.Diagnostics.Debug.WriteLine(e);
                }
            }
        }
        private List<CustomerModel> LoadList()
        {
            CustomerModel customer;
            List<CustomerModel> customerList = new List<CustomerModel>();
            using (OleDbConnection connection = GetConnection())
            {
                var query = "SELECT * From Customers ORDER BY CustomerId ASC";
                var command = new OleDbCommand(query, connection);
                var reader = command.ExecuteReader();
                while (reader.Read())
                {
                    customer = new CustomerModel
                    {
                        CustomerId = reader.GetInt32(0),
                        Name = reader.GetString(1),
                        Address = reader.GetString(2),
                        City = reader.GetString(3),
                        State = reader.GetString(4),
                        Zip = reader.GetString(5)
                    };
                    customerList.Add(customer);
                }
            }
            return customerList;
        }
        private static OleDbConnection GetConnection()
        {
            String connectionString = "Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" + HttpRuntime.AppDomainAppPath + "TaskTwoCustomersDb.mdb";
            OleDbConnection connection = new OleDbConnection(connectionString);
            try
            {
                connection.Open();
            } catch (Exception e)
            {
                System.Diagnostics.Debug.WriteLine(e);
            }

            return connection;
        }
    }
}