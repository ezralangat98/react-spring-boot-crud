import logo from './logo.svg';
import './App.css';
import ListEmployeesComponent from './components/ListEmployeesComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponenet';
//import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';


function App() {
  return (
    // <div>
    //   <HeaderComponent/>
    //     <div className="container">
    //       <ListEmployeesComponent/>
    //     </div>
    //   <FooterComponent/>
    // </div>

// <div>
// <Router>
//       <HeaderComponent />
//         <div className="container">
//             <Routes> 
//                   <Route path = "/" element = {<ListEmployeesComponent/>}/>
//                   <Route path = "/employees" element = {<ListEmployeesComponent/>}/>
//                   <Route path = "/add-employee" element = {<CreateEmployeeComponent/>}/>      
//             </Routes>
//         </div>
//       <FooterComponent />
// </Router>
// </div>
  // );

  <div>
  <Router>
        <HeaderComponent />
          <div className="container">
              <Switch> 
                    <Route path = "/" exact component = {ListEmployeesComponent}></Route>
                    <Route path = "/employees" component = {ListEmployeesComponent}></Route>
                    <Route path = "/add-employee/:id" component = {CreateEmployeeComponent}></Route>
                    <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
                    
                    {/* <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}

              </Switch>
          </div>
        <FooterComponent />
  </Router>
</div>
  );
}

export default App;
