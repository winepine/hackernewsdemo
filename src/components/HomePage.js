import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './styles.css'
class HomePage extends Component {
    
    state={
        searchField:"",
        error:false,
        errorMessage:"Input Box Empty",
        results:[]
    }

    // Change In Search Input String
    onSearchChange = ev=>{
        this.setState({
            searchField:ev.target.value
        })
    }

    // Form Submit
    searchPosts = async ev=>{
        ev.preventDefault();
        // Empty String Check
        if(this.state.searchField===""){
            this.setState({
                error:true,
                errorMessage:"Input Box Empty"
            })
        }
        else{
            this.setState({
                error:true,
                errorMessage:"Loading Content..."
            })
            // Fetching
            const apiResponse = await fetch("http://hn.algolia.com/api/v1/search?query="+this.state.searchField);
            const jsonResponse = await apiResponse.json();
            this.setState({
                results:jsonResponse.hits
            });
            this.setState({
                error:false
            })
        }
    }

    render() {
        return (
            <div>
                <h1>Hacker News Demo</h1>

                {/* Form (Input, Button, Error) */}
                <form onSubmit={this.searchPosts} action="">
                    <input className="searchField" onChange={this.onSearchChange} value={this.state.searchField}
                     type="text" />
                     <button className="btn-search" type="submit">Search</button>
                     {/* Prompt Condition If search input is empty */}
                     {this.state.error?<h3>{this.state.errorMessage}</h3>:null}
                </form>
                
                {/* Rendering Posts If Available */}
                <div className="posts">
                    {this.state.results.map(postEntry=>{
                        return(
                            <div className="post" id={postEntry.objectID}>
                                <div>
                                    <Link className="post-link" to={`/posts/${postEntry.objectID}`}>
                                        {postEntry.title}</Link>                                    
                                    <p>Posted On: {postEntry.created_at.substr(0,10)}</p>
                                    <p>Post Author: {postEntry.author}</p>
                                </div>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
        );
    }
}

export default HomePage;