import React from 'react';
import Sections from './Sections';
import gitapi from '../api/Githubapi';
import './App.css';
import ReactPaginate from 'react-paginate';

class App extends React.Component{

    state =  {
        offset: 0,
        data: [],
        perPage: 7,
        currentPage: 0
  };

    fetchIssues = async () =>{
        try {
            const issues = await gitapi.get("/issues");
            
            const data = issues.data;
            const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
            const postData = slice.map((issue)=>{return <div key={issue.id} ><Sections issue={issue}/></div>})
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
               
                postData
            })

            // console.log(issues);
            // this.setState({issues:issues.data})
        } catch (error) {
            console.log(error)
        }
       
    }

    
 handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.fetchIssues()
    });

};

    componentDidMount(){
        this.fetchIssues();
    }

   

    render(){
        
        return (
            <div className="container main-content">
                {this.state.postData}
                <div>
                {this.state.postData}
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
            </div>
        )
    }
}

export default App;