import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {

    constructor(props){
        super(props)

        this.state = {
            //Adding id to state
            id: this.props.match.params.id,
            firstName: '',
            lastName:'',
            emailId:''

        }
        //Binding event handlers to constructor - storing form data in the properties onChange
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);


    }
    //Defining event handlers - using setState to add value to property
    //storing form data in the properties onChange
    // event.target.value retrieves / access value of whatever input it was called on.
   
    changeFirstNameHandler = (event) => {
        this.setState({firstName: event.target.value});
    }

    changeLastNameHandler = (event) =>{
        this.setState({lastName: event.target.value});
    }
    changeEmailHandler = (event) =>{
        this.setState({emailId: event.target.value});
    }
    //Having user object to populate form for editing.
    //Using ComponentDidMount func to make rest API call to get object by ID
    componentDidMount(){
        //Adding condition to return if it's for adding user
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then ( (res)=> {
                let employee = res.data;
    
                this.setState ({
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    emailId: employee.emailId
                });
    
            } );
        }
        
    }

    //Saving User Details - Getting data from properties onclicking save btn
    saveEmployee(e){
        e.preventDefault();
        let employee = {firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId}
        console.log('employee =>' + JSON.stringify(employee));
        //Adding Condition to return createEmployee or updateEmployee dynamically based on url.
        if(this.state.id === '_add'){
        //Returning users list on successful response from Rest API  
        EmployeeService.createEmployee(employee).then(res =>{
            this.props.history.push('/employees');

        });}else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/employees');
            });
        }

    } 
    //On Cancel
    cancel(){
        this.props.history.push('/employees');
    }

     //Adding Condition to change page title dynamically
     getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add Employee</h3>
        }else{
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    
    render() {
        return (
            <div>
                <br />
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            {this.getTitle()}
                            <div className='card-body'>
                                <form>
                                    <div className='form-group'>
                                        <label>First Name: </label>
                                        <input placeholder='First Name' name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
                                    </div>

                                    <div className='form-group'>
                                        <label>Last Name: </label>
                                        <input placeholder='Last Name' name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>

                                    <div className = "form-group">
                                        <label> Email Id: </label>
                                            <input placeholder="Email Address" name="emailId" className="form-control" 
                                                   value={this.state.emailId} onChange={this.changeEmailHandler}/>
                                    </div>
                                    <br/>

                                    <button className='btn btn-success' onClick={this.saveEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                </form>       
                            </div>
                        </div>
                    </div>      
                </div> 
            </div>
        );
    }
}

export default CreateEmployeeComponent;