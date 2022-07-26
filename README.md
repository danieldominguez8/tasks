# Development Environment Notes  
Tested and run on 2 Windows PC (Difficulty with ARM64 MacOS)  
32-bit Microsoft Office   
Visual Studio 2019  
How To Run Solutions  
## TaskOne  
git clone https://github.com/danieldominguez8/tasks.git  
start TaskOne/TaskOne.sln    
(Visual Studio) Run with IIS Express  
Browser will open on localhost:44344 and table may take time to load on first run.  
## TaskTwo  
start TaskTwo/TaskTwo.sln   
(Visual Studio) Run with IIS Express.  Window will open on localhost:5001 with api json of customers to confirm connection.  
cd TaskTwo/tasktworeact  
npm install   
npm start   
Browser will open on localhost:3000  
  
## TaskOne features:  
Search input filters any customers who have any related parameters  
Sorting Function is possible by all parameters  
“Add New Customer” link is included in the header of the table and will direct you towards page submission.  ID is set to be greater than the largest ID in order to maintain the database.   
Delete button will delete user directly from table
Edit button will take you to Edit Customer page. You are limited to maintaining the same ID of the customer.  
All fields must be filed to Edit or Add Customer  

## TaskTwo features:  
Search input filters any customers who have any related parameters  
Sorting Function is possible by all parameters  
“Create Customer” link is included in Navigation Bar.  ID is set to be greater than the largest ID in order to maintain the database.   
Edit button will take you to Edit Customer page.  You may delete or update customer through this page. You are limited to maintaining the same ID of the customer.  
All fields must be filed to Edit or Add Customer  
