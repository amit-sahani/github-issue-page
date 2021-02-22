import React from 'react';
import exc from './static/exc.png';

class Sections extends React.Component{

   

    calculateTimeDifference=(time)=>{
        
        const date1 = new Date(time.slice(0,10)) 
        const date2 = new Date()
        const time_difference = date2.getTime() - date1.getTime();  
        const days_difference = time_difference / (1000 * 60 * 60 * 24);
        return parseInt(days_difference);
    }


    render(){

        const issue = this.props.issue;

        const labels = issue.labels.map((label, index)=><span key= {index} className="label">{label.name}</span>)
        const date1 = new Date(issue.created_at.slice(0,10)) 
        const date2 = new Date()
        const time_difference = date2.getTime() - date1.getTime();  
        const days_difference = time_difference / (1000 * 60 * 60 * 24);
        console.log(parseInt(days_difference))

        return (
                <div onClick={(e)=> console.log(e)} className="ui relaxed divided list">
                    <div className="item">
                        <img className="ui image" src={exc} />
                        <div className="content">
                        <div className="header">{issue.title}{labels}</div>
                        <div className="description" >#{issue.id}  Created {this.calculateTimeDifference(issue.created_at)} days ago
                                                     ( Updated {this.calculateTimeDifference(issue.updated_at)} days ago) 
                                                     by {issue.user.login}
                        </div>
                        </div>
                    </div>
                    <hr></hr>
                </div>
        )
    }

}

export default Sections;