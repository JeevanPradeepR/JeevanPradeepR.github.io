import React,{Component} from 'react'
//import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Button } from '@material-ui/core';
export default class Todo extends Component{
    constructor(props){
        super(props)
     //   this.state={value:[],temp:'inprogress'}
     this.state={
         sno:'', date:'', time:'', topic:'', status:'',
         tempSno:'', tempDate:'', tempTime:'', tempTopic:'', tempStatus:'pending',
         element:[], disabled: true,
         editTopic:'', editDate:'', editTime:'', editStatus:'', editIndex:'', editValue:'',
         saveTopic:'', saveDate:'', saveTime:'', saveStatus:'', saveIndex:'', saveValue:'', saveDateTime:'',
         dateLeft:'', createdDate:'', index:1
     }
    }
  
   handleChange= (e)=> {
       if(e.target.id==="topic"){
      this.setState({tempTopic:e.target.value})}
      if(e.target.id==="date"){
      this.setState({tempDate:e.target.value})}
      if(e.target.id==="time"){
      this.setState({tempTime:e.target.value})}
      if(e.target.id==="status"){
      this.setState({tempStatus:e.target.value})}
      
   }
    handleSave= async()=>{
      var thisDate = String(new Date())
      var d = thisDate.split(' ')
      var newDate =  d[0]+"\n"+d[2]+"/"+d[1]+"/"+d[3]+"\n"+d[4]
      await this.setState({createdDate: newDate})
      await  this.setState({topic:this.state.tempTopic})
      await  this.setState({date:this.state.tempDate})
       await this.setState({time:this.state.tempTime})
       await this.setState({status:this.state.tempStatus})
        localStorage.setItem(localStorage.length, 
        this.state.topic+"t@t"+this.state.date+"d@d"+this.state.time+"ti@ti"+this.state.status+"s@s"+this.state.createdDate)
       
    this.display()
        }
        editRow =(index,edit,date)=>{
          console.log( localStorage.length -index -1+" "+edit)
          this.setState({editIndex:localStorage.length -index -1})
          var text = edit
          var text1 = text.slice(0,text.lastIndexOf('t@t'))
          this.setState({editTopic:text1})
          var text2 = text.slice(text.lastIndexOf('t@t')+3,text.lastIndexOf('d@d'))
          this.setState({editDate:text2})
          var text3 = text.slice(text.lastIndexOf('d@d')+3,text.lastIndexOf('ti@ti'))
          this.setState({editTime:text3})
          var text4 = text.slice(text.lastIndexOf('ti@ti')+5,text.lastIndexOf('s@s'))
          this.setState({editStatus:text4})
          var text5 = text.slice(text.lastIndexOf('s@s')+3)   
          this.setState({saveDateTime:text5})   
           console.log(index+" "+text1 + text2 +text3+text4)
            this.setState({disabled:false})

        }
       handleEdit = (e) =>{
         if(e.target.id === "1"){
           this.setState({editTopic:e.target.value})
         }
         if(e.target.id === "2"){
          this.setState({editStatus:e.target.value})
        }
        if(e.target.id === "3"){
          this.setState({editDate:e.target.value})
        }
        if(e.target.id === "4"){
          this.setState({editTime:e.target.value})
        }
        
       }
       saveEdit = async() =>{
       
         await  this.setState({saveTopic:this.state.editTopic})
         await  this.setState({saveDate:this.state.editDate})
          await this.setState({saveTime:this.state.editTime})
          await this.setState({saveStatus:this.state.editStatus})
           localStorage.setItem(this.state.editIndex, 
           this.state.saveTopic+"t@t"+this.state.saveDate+"d@d"+this.state.saveTime+"ti@ti"+this.state.saveStatus+"s@s"+this.state.saveDateTime)
       this.display()
  this.setState({disabled:true})
       }
       cancelEdit = () => this.setState({disabled:true})


        rowChange =(e)=>{
          console.log('rowChange '+e.target.value)
        }

    display = () =>{
        var  elements=[]
        for(var i =0;i<localStorage.length;i++){
           elements.push(localStorage.getItem(i))
        }
        elements.reverse()
        this.setState({element:elements})
        console.log(this.state.element)
    }
    componentDidUpdate(){
      var time = new Date()
      console.log(time)
    }
        componentDidMount(){
         this.display()
        }
        callCheck =(date,status)=>{
          var estimated = new Date(date)
          var current = new Date()
          var e_date = estimated.getDate(); var e_month = estimated.getMonth(); var e_year = estimated.getFullYear();
          var c_date = current.getDate(); var c_month = current.getMonth(); var c_year = current.getFullYear();
           
if(status=="dones@s"){
  return  <p style={{color:"green"}}><b>Completed</b>
  </p>
}
else{
          if(e_date - c_date < 0 || e_month - c_month < 0 || e_year - c_year < 0 ){
            return <p style={{color:"red"}}><b>Overdue</b>
            <br/> <sup> {c_date-e_date} day {c_month-e_month} month {c_year-e_year} year </sup>
            </p>
          }else{
            var date = e_date - c_date; var month = e_month - c_month; var year =  e_year - c_year
            if(date==0 && month==0 && year==0){
              return <p style={{color:"orange"}}><b>Today</b></p>
            }
           return date+"day "+month+"month "+year+"year"
          }}
         }
         saveDiv=()=> {
          setTimeout(
           async () => await this.setState({ index: 2 }), 
            3000
          );
          this.setState({ index: 3 })
         }
    render(){
   
        return(<div id='pdf' style={{maxWidth:1000,margin:'0 auto',borderRadius:'12px'}}>
        {this.state.disabled?<div>
          {this.state.index==2 || this.state.index==1 ?<div>
         <a href="javascript:window.print();" type="button" onClick={this.saveDiv}>Print me</a> 

<label>topic</label>
<input type="text" value={this.state.tempTopic} onChange={this.handleChange} id="topic"></input>
<label>estimated date and time</label>
<input type="date"  value={this.state.tempDate} onChange={this.handleChange} id="date"></input>
<input type="time"  value={this.state.tempTime} onChange={this.handleChange} id="time"></input>
<label>status</label>
<select  name="cars" onChange={this.handleChange} id="status">
   
    <option value="pending" >Pending</option>
    <option value="inprogress">In-Progress</option>
    <option value="done">Done</option>
  </select>
&nbsp;<button onClick={this.handleSave}>add</button>
<br/>
<Tabs  aria-label="simple tabs example">
          <Tab label="Item One"  />
          <Tab label="Item Two"/>
          <Tab label="Item Three"/>
        </Tabs></div>:null }
<TableContainer component={Paper} style={{maxWidth:1200,margin:'0 auto',borderRadius:'12px'}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="left">Created on</TableCell>
            <TableCell align="left">Topic</TableCell>
            <TableCell align="left">Estimated Date</TableCell>
            <TableCell align="left">Estimated Time</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Date left</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.element.map((li,i)=>  <TableRow>
            <TableCell align="center">{i+1}</TableCell>
            <TableCell><sup> {String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("s@s")+3)}</sup></TableCell>
              <TableCell align="left">
                  {String(this.state.element[i]).substring(0,String(this.state.element[i]).lastIndexOf("t@t"))}
                  </TableCell>
              <TableCell align="left">
           {String( this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("t@t")+3,String(this.state.element[i]).lastIndexOf("d@d"))}
                </TableCell>
             
              <TableCell align="left">
            {String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("d@d")+3,String(this.state.element[i]).lastIndexOf("ti@ti"))}
              </TableCell>
             { String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("ti@ti")+5, String(this.state.element[i]).lastIndexOf("s@s")  ) == "pending"?
              <TableCell align="left" style={{color:'red'}}>
                Pending
                  </TableCell>  :null} 
                  { String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("ti@ti")+5,String(this.state.element[i]).lastIndexOf("s@s")) == "inprogress"?
              <TableCell align="left" style={{color:'#cccc00'}}>
                In-Progress
                  </TableCell>  :null} 
                  { String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("ti@ti")+5,String(this.state.element[i]).lastIndexOf("s@s")) == "done"?
              <TableCell align="left" style={{color:'green'}}>
                Done
                  </TableCell>  :null} 
             <TableCell align="left"> {this.callCheck(
               String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("t@t")+3,String(this.state.element[i]).lastIndexOf("d@d")),
               String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("ti@ti")+5,String(this.state.element[i]).lastIndexOf("s@s")+3)
             )} {this.state.dateLeft}</TableCell>
                  <IconButton>
      <EditTwoToneIcon color="primary" onClick={ ()=>this.editRow(i,li,
      String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("s@s")+3)
         )}/></IconButton>
            </TableRow>
        )}
       
        </TableBody>
      </Table>
    </TableContainer>
    </div> : <div>
      <br/><br/><br/>
    <b>  Edit Topic {this.state.editTopic} </b> <br/> <br/>
    <TextField id="1" label="Topic" variant="outlined" value={this.state.editTopic} onChange={this.handleEdit}/><br/><br/>
    <TextField id="22" label="Status" variant="outlined" value={this.state.editStatus} onChange={this.handleEdit} disabled/>  <br/>
   &nbsp;&nbsp;&nbsp;&nbsp;
  <input type="radio" id="2" name="age" value="pending"  onChange={this.handleEdit}/>
  <label for="age1">Pending</label> 
  <input type="radio" id="2" name="age"  value="inprogress"  onChange={this.handleEdit}/>
  <label for="age2">In-Progress</label>
  <input type="radio" id="2" name="age" value="done"  onChange={this.handleEdit}/>
  <label for="age3">Done</label><br/> <br/>
    <TextField id="3" label="Estimated date" variant="outlined" value={this.state.editDate} onChange={this.handleEdit} type="date" style={{maxWidth:400}}/>  <br/> <br/>
    <TextField id="4" label="Estimated time" variant="outlined" value={this.state.editTime} onChange={this.handleEdit} type="time" style={{maxWidth:1000}}/>  <br/> <br/>
  
    <Button onClick={this.saveEdit}>Save</Button>  &nbsp; &nbsp; &nbsp;
    <Button onClick={this.cancelEdit}>Cancel </Button>

</div>}

  

        </div>)
    }
}
