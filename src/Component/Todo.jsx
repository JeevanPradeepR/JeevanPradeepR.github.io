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
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
export default class Todo extends Component{
    constructor(props){
        super(props)
     //   this.state={value:[],temp:'inprogress'}
     this.state={
         sno:'', date:'', time:'', topic:'', status:'',
         tempSno:'', tempDate:'', tempTime:'', tempTopic:'', tempStatus:'pending',
         element:[], disabled: true
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
      await  this.setState({topic:this.state.tempTopic})
      await  this.setState({date:this.state.tempDate})
       await this.setState({time:this.state.tempTime})
       await this.setState({status:this.state.tempStatus})
        localStorage.setItem(localStorage.length, 
        this.state.topic+"t@t"+this.state.date+"d@d"+this.state.time+"ti@ti"+this.state.status)
    this.display()
        }
        editRow =(edit)=>{

        }

    display = () =>{
        var  elements=[]
        for(var i =0;i<localStorage.length;i++){
           elements.push(localStorage.getItem(i))
        }
        this.setState({element:elements})
    }
        componentDidMount(){
           var text = 'hait@t2021-07-06d@d17:47ti@tiinprogress'
           var text1 = text.slice(0,text.lastIndexOf('t@t'))
           var text2 = text.slice(text.lastIndexOf('t@t')+3,text.lastIndexOf('d@d'))
           var text3 = text.slice(text.lastIndexOf('d@d')+3,text.lastIndexOf('ti@ti'))
           var text4 = text.slice(text.lastIndexOf('ti@ti')+5)
            console.log(text1 + text2 +text3+text4)
         this.display()
        }
    render(){
        return(<div>
        
           <TextField id="outlined-basic" label="estimated date" variant="outlined" />
           <TextField id="outlined-basic" label="Outlined" variant="outlined" />

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
        </Tabs>
<TableContainer component={Paper} style={{maxWidth:1200,margin:'0 auto'}}>
      <Table  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">Topic</TableCell>
            <TableCell align="center">Estimated Date</TableCell>
            <TableCell align="center">Estimated Time</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.element.map((li,i)=>  <TableRow>
            <TableCell align="right">{i}</TableCell>
         
              <TableCell align="right">
              <InputBase  inputProps={{ 'aria-label': 'naked' }}  disabled={this.state.disabled} value=
                  {String(this.state.element[i]).substring(0,String(this.state.element[i]).lastIndexOf("t@t"))} />
                  </TableCell>
              <TableCell align="right">{String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("t@t")+3,String(this.state.element[i]).lastIndexOf("d@d"))}</TableCell>
              <TableCell align="right">{String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("d@d")+3,String(this.state.element[i]).lastIndexOf("ti@ti"))}</TableCell>
              { String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("ti@ti")+5) == "pending"?
              <TableCell align="right" style={{color:'red'}}>
                Pending
                  </TableCell>  :null} 
                  { String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("ti@ti")+5) == "inprogress"?
              <TableCell align="right" style={{color:'#cccc00'}}>
                In-Progress
                  </TableCell>  :null} 
                  { String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("ti@ti")+5) == "done"?
              <TableCell align="right" style={{color:'green'}}>
                Done
                  </TableCell>  :null} 
                  <IconButton>
      <EditTwoToneIcon color="primary" onClick={ ()=>this.editRow(i)}/></IconButton>
      <IconButton><SaveTwoToneIcon style={{ color: 'green' }} /></IconButton>
            </TableRow>
        )}
        </TableBody>
      </Table>
    </TableContainer>


        </div>)
    }
}
