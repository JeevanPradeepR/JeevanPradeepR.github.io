import React,{Component} from 'react'
import './header.css'
import are from './logos.png'
import {Link} from 'react-router-dom'
var a=false,b=false
export default class Header extends Component{
    clickTodo = () => {a=true,b=false}
    clickTodo1 = () => {b=true,a=false}
    render(){
        return(<div >
              
              <link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>



<div class="header css-input" style={{maxWidth:1200,margin:'0 auto', backgroundColor:'black'}}>
  <a href="#default" class="logo"><img src={are}/></a>
  <div class="header-right">
   <Link to="/todo/" class={a?null:"active"} onClick={this.clickTodo}> Home </Link>
            <Link to="/todo/hh"  class={b?null:"active"} onClick={this.clickTodo1}>ho</Link> 
 
    <a href="#contact">Contact</a>
    <a href="#about">About</a>
  </div>
</div>
        </div>)
    }
}