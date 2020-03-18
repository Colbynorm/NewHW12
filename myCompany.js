//Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

//Create Connection
var connection = mysql.createConnection({
    host: "localhost",
    port:3306,
    user:"root",
    password:"root",
    database: "my_companyDB"
});

//Connect to the mysql server and database
connection.connect(function(err) {
    if (err) throw err;
    start();
});

//Function that prompts user
function start() {
    inquirer.prompt({
        name: "something",
        type: "list",
        message: "Would you like to [ADD], [VIEW], [UPDATE], or [DELETE]",
        choices: ["ADD department", "ADD roles", "ADD employee",
                  "VIEW department", "VIEW roles", "VIEW employees", "VIEW employee by manager",
                  "UPDATE employee role", "UPDATE roles", "UPDATE employee manager",
                  "DELETE department", "DELETE role", "DELETE employee", "EXIT"]
    })
    //Based on the users answer, call one of these functions
    .then(function(answer) {
        if (answer.something === "ADD department") {
            addDepartment();
        }
        else if (answer.something === "ADD roles") {
            addRoles();
        }
        else if (answer.something === "ADD employee") {
            addEmployee();
        }
        else if (answer.something === "VIEW department") {
            viewDepartment();
        }
        else if (answer.something === "VIEW roles") {
            viewRoles();
        }
        else if (answer.something === "VIEW employees") {
            viewEmployees();
        }
        else if (answer.something === "VIEW employee by manager") {
            viewEmployeesByManager();
        }
        else if (answer.something === "UPDATE employee role") {
            updateEmployeeRole();
        }
        else if (answer.something === "UPDATE roles") {
            updateRoles();
        }
        else if (answer.something === "UPDATE employee manager") {
            updateEmployeeManager();
        }
        else if (answer.something === "DELETE department") {
            deleteDepartment();
        }
        else if (answer.something === "DELETE role") {
            deleteRole();
        }
        else if (answer.something === "DELETE employee") {
            deleteEmployee();
        }
        else {
            connection.end();
        }
    });
}

//function to add new department
function addDepartment() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What department would you like to add?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return false;
                }
                return true;
            }
        }
    ])
    //when finished prompting, insert into the DB
    .then(function(answer) {
        connection.query(
            "INSERT INTO department SET ?",
            {
                name: answer.item
            },
            function(err) {
                if (err) throw err;
                console.log("You added a new Department")
                start();
            }
        );
    });
}

// Function to add new role
function addRoles() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What role would you like to add?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return false;
                }
                return true;
            }
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "dept_id",
            type: "input",
            message: "What is the department id?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])

    //when finished prompting, insert into the DB
    .then(function(answer) {
        connection.query(
            "INSERT INTO role SET ?",
            {
                title: answer.item,
                salary: answer.salary,
                dept_id: answer.dept_id
            },
            function(err) {
                if (err) throw err;
                console.log("You added a new Role")
                start();
            }
        );
    });
}

//Function to add new employee
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the First Name of the employee you would like to add?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the Last Name of the employee?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "roleId",
            type: "input",
            message: "What is the Role ID of the employee?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "managerId",
            type: "input",
            message: "What is the employee's Manager ID?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    //when finished prompting, insert into the DB
    .then(function(answer) {
        connection.query(
            "INSERT INTO employee SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: answer.roleId,
                manager_id: answer.managerId
            },
            function(err) {
                if (err) throw err;
                console.log("You added a new Employee")
                start();
            }
        );
    });
}

//Function to view Department
function viewDepartment() {
    connection.query(
        "SELECT * FROM department",
        function(err, res) {
            if (err) throw err;
            console.table(res)
            start();
        }
    );
}
//Function to view Roles
function viewRoles() {
    connection.query(
        "SELECT role.id, role.title, role.salary, department.name AS department FROM role LEFT JOIN department ON role.dept_id = department.id",
        function(err, res) {
            if (err) throw err;
            console.table(res)
            start();
        }
    );
    
}
//Function to view Employees
function viewEmployees() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What employees would you like to see?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
}
//Function to view Employees by Manager
function viewEmployeesByManager() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Employees by Manager.", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    //when finished prompting, insert into the DB
    .then(function(answer) {
        connection.query(
            "INSERT INTO my_Company SET ?",
            {
                employeesByManager_name: answer.item
            },
            function(err) {
                if (err) throw err;
                console.log("You are viewing employees by manager")
                start();
            }
        );
    });
}
//Function to Update Employee Roles
function updateEmployeeRole() {
    inquirer.prompt([
        {
            name: "role_id",
            type: "input",
            message: "What role would you like to change it to?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    //when finished prompting, insert into the DB
    .then(function(answer) {
        console.log(answer.employee_id)
        connection.query(
            "UPDATE employee SET ? WHERE id = " + answer.employee_id,
            [
                {
                    role_id: answer.role_id
                }
            ],
            function(err, res) {
                if (err) throw err;
                console.log(res)
                console.log("You updated a Role.")
                start();
            }
        );
    });
}
//Update Employee Manager
function updateEmployeeManager() {
    inquirer.prompt([
        {
            name: "updateManager",
            type: "input",
            message: "What manager would you like to update?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    //when finished prompting, insert into the DB
    .then(function(answer) {
        connection.query(
            "UPDATE INTO employee SET ? = " + answer.employee_id,
            {
                updateManager: answer.item
            },
            function(err) {
                if (err) throw err;
                console.log("You updated a manager.")
                start();
            }
        );
    });
}
//Function to delete Department
function deleteDepartment() {
    inquirer.prompt([
        {
            name: "deleteDepartment",
            type: "input",
            message: "What department would you like to delete?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    //when finished prompting, insert into the DB
    .then(function(answer) {
        connection.query(
            "DELETE FROM department SET ?",
            {
                deleteDepartment: answer.item
            },
            function(err) {
                if (err) throw err;
                console.log("You deleted a Department")
                start();
            }
        );
    });
}
//Function to delete a Role
function deleteRole() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "What role would you like to delete?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    //when finished prompting, insert into the DB
    .then(function(answer) {
        connection.query(
            "DELETE FROM employee SET ?",
            {
                deleteRole_name: answer.item
            },
            function(err) {
                if (err) throw err;
                console.log("You deleted a role")
                start();
            }
        );
    });
}
//Function to delete Employee
function deleteEmployee() {
    inquirer.prompt([
        {
            name: "deleteEmployee",
            type: "input",
            message: "What employee would you like to delete?", 

            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ])
    //when finished prompting, insert into the DB
    .then(function(answer) {
        connection.query(
            "DELETE FROM employee SET ?",
            {
                deleteEmployee: answer.item
            },
            function(err) {
                if (err) throw err;
                console.log("You deleted an employee")
                start();
            }
        );
    });
}