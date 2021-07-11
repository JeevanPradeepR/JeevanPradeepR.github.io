import React,{Component} from 'react'
import Header from './Header'
import Todo from './TodoV0'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
export default class MainApp extends Component{
    render(){
        return(<div>
        <Router>
        <Header/>
                <Switch>
                    <Route exact path="/todo/">
                        <Todo/>
                    </Route>
                    <Route exact path="/todo/hh">
                        <h1>Hello</h1>
                    </Route>
                </Switch>
             
            </Router>
        </div>)
    }
}