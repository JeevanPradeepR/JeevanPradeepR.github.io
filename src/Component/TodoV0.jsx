import React,{Component} from 'react'
import './styles.css'
import './addButton.css'
export default class Todo extends Component{
    constructor(props){
     super(props)
         this.state={addTodo:'Add Todo', sno:'', date:'', time:'', topic:'', status:'',
         tempSno:'', tempDate:'', tempTime:'', tempTopic:'', tempStatus:'Open',
         element:[], disabled: true, validation:false,
         editTopic:'', editDate:'', editTime:'', editStatus:'', editIndex:'', editValue:'',
         saveTopic:'', saveDate:'', saveTime:'', saveStatus:'', saveIndex:'', saveValue:'', saveDateTime:'',
         dateLeft:'', createdDate:'', index:1, currentPage:1, TodosPerPage:5, TotalPage: localStorage.length/5,
         page:1
        }
    }
    rowsPerPage = () =>{
        return(<div>
            
                 <button selected onClick={()=>{this.setState({TodosPerPage:5}); this.setState({TotalPage:localStorage.length/5})}}>5</button>
                <button  onClick={()=>{this.setState({TodosPerPage:10}); this.setState({TotalPage:localStorage.length/10})}}>10</button>
                <button onClick={()=>{this.setState({TodosPerPage:15}); ; this.setState({TotalPage:localStorage.length/15})}}>15</button>
           
        </div>)
    }
 pagination = () =>{
     var buttons=[]
     for(let i=0;i<this.state.TotalPage;i++){
         buttons.push(<button onClick={()=>this.setState({page:i+1})}>{i+1}</button>)
     } return buttons
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
         if(this.state.tempTopic.trim().length<=0 || this.state.tempDate.trim().length<=0 ||
         this.state.tempTime.trim().length<=0 || this.state.tempStatus.trim().length<=0){
                setTimeout(
                    () =>   this.setState({validation:false}), 
                    2000
                  ); this.setState({validation:true})
         }else{
        setTimeout(
            () =>  this.setState({addTodo:'Add Todo'}), 
            1000
          );this.setState({addTodo:'Added'})
       var thisDate = String(new Date())
       var d = thisDate.split(' ')
       var newDate =  d[0]+" "+d[2]+"/"+d[1]+"/"+d[3]+" "+d[4]
       await this.setState({createdDate: newDate})
       await  this.setState({topic:this.state.tempTopic})
       await  this.setState({date:this.state.tempDate})
        await this.setState({time:this.state.tempTime})
        await this.setState({status:this.state.tempStatus})
         localStorage.setItem(localStorage.length, 
         this.state.topic+"t@t"+this.state.date+"d@d"+this.state.time+"ti@ti"+this.state.status+"s@s"+this.state.createdDate)
        
     this.display()}
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
    setTimes = (times) =>{
        var IndianTime = times.split(":")
        if(Number(IndianTime[0])>12){
            var timeOne = IndianTime[0]-12
            if(timeOne<10){
                return "0"+timeOne+":"+IndianTime[1]+" PM"
            }
            return timeOne+":"+IndianTime[1]+" PM"
        }else{
            return IndianTime[0]+":"+IndianTime[1]+" AM"
        }
    }
    table = () =>{
        const result=[]; 
        for(let i=(this.state.page-1)*this.state.TodosPerPage; i<(this.state.page*this.state.TodosPerPage);i++){
            if(i<localStorage.length){
            result.push( 
        <tr onClick={()=>console.log("checking "+(i+1)+" result "+localStorage.getItem(localStorage.length - i -1))}>
            <td>{i+1}</td>
            <td style={{maxWidth:10}}>{String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("s@s")+3).trim()}</td>
            <td  style={{maxWidth:10}}>{String(this.state.element[i]).substring(0,String(this.state.element[i]).lastIndexOf("t@t"))}</td>
            <td  style={{maxWidth:10}}>{String( this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("t@t")+3,String(this.state.element[i]).lastIndexOf("d@d"))}</td>
            <td  style={{maxWidth:10}}>{this.setTimes(String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("d@d")+3,String(this.state.element[i]).lastIndexOf("ti@ti")))}</td>
            {String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("ti@ti")+5, String(this.state.element[i]).lastIndexOf("s@s")  ) 
            == "Open"?<td style={{color:'red',maxWidth:10}}>Open</td>:
            String(this.state.element[i]).substring(String(this.state.element[i]).lastIndexOf("ti@ti")+5, String(this.state.element[i]).lastIndexOf("s@s")  ) 
            == "In-Progress"?<td style={{color:'#cccc00',maxWidth:10}}>In-Progress</td>: <td style={{color:'green',maxWidth:10}}>Done</td>}
           
        </tr>
 )}
        }return result
     
  
    }
    componentDidMount(){
        this.display()
    }
    render(){
        return(<div style={{maxWidth:1200,margin:'0 auto',borderRadius:'12px'}}>
    <br/>
<div class="container">
  <div class="row">
    <div class="col"  >
        <div class="input-group mb-3">
           <span class="css-input" id="basic-addon1"><b>Topic</b><i style={{color:'red',fontSize:'20px'}}>*</i></span>
            <input type="text" class="css-input"  aria-label="Username" aria-describedby="basic-addon1" style={{maxWidth:200}}
            value={this.state.tempTopic} onChange={this.handleChange} id="topic"/>
        </div>
    </div>
    <div class="col">
        <div class="input-group mb-3">
             <span class="css-input"  id="basic-addon1"><b>Expected Date</b><i style={{color:'red',fontSize:'20px'}}>*</i></span>
             <input type="date" class="css-input"  aria-label="Username" aria-describedby="basic-addon1" style={{maxWidth:142}}
              value={this.state.tempDate} onChange={this.handleChange} id="date"/>
        </div>
    </div>
    <div class="col">
        <div class="input-group mb-3">
             <span class="css-input"  id="basic-addon1"><b>Expected Time</b><i style={{color:'red',fontSize:'20px'}}>*</i></span>
            <input type="time" class="css-input" aria-label="Username" aria-describedby="basic-addon1" style={{maxWidth:150}}
             value={this.state.tempTime} onChange={this.handleChange} id="time"/>
        </div>
    </div>
    <div class="col">
         <div class="input-group mb-3" >
             <label class="css-input" for="inputGroupSelect01"><b>Status</b><i style={{color:'red',fontSize:'20px'}}>*</i></label>
             <select class="css-input"  id="inputGroupSelect01" style={{maxWidth:150}} onChange={this.handleChange} id="status">
                 <option selected value="Open" >Open</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Done">Done</option>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col" >
            <div class="input-group mb-3" >
                <span  class="css-input"><b>Comments</b></span>
                <textarea class="form-control" aria-label="With textarea" style={{maxWidth:800}} />
            </div>
        </div>
        <div className="col-3">
        <div class="button "  onClick={this.handleSave}>
            
  <i class="fa fa-check"></i>{this.state.addTodo}
</div>
        </div>
    </div>
  </div>
</div>


<div style={{margin:'0 auto', maxWidth:'1300px'}}>
{this.state.validation?<div class="alert alert-danger" role="alert">
  Mandatory fields are missing!
</div>:null}
    {this.state.addTodo==="Added"?<div className="alert alert-success" role="alert">
  Todo list successfully added!
</div>:null}
<marquee scrollamount="5">To edit/view click on row which you want to view</marquee>

<table id="customers" style={{fontFamily:'calibri'}}>
              
    <tr>
      <th scope="col">#</th>
      <th scope="col">Created At</th>
      <th scope="col">Topic</th>
      <th scope="col">Estimated Date</th>
      <th scope="col">Estimated Time</th>
      <th scope="col">Status</th>
    </tr>
 

  
{this.table()}

            </table>
{this.rowsPerPage()}
[{this.pagination()}]
</div>
        </div>)
    }
}