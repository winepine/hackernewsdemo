import React, { Component } from 'react';

class Post extends Component {
    state={
        loaded:false,
        data:{},
        notFound:false
    }
    // Getting Item On Component Mount
    async componentDidMount(){
        try{
            const apiResponse = await fetch("http://hn.algolia.com/api/v1/items/"+this.props.match.params.id);
            const jsonResponse = await apiResponse.json();
            this.setState({
                data:jsonResponse,
                loaded:true
            })
            console.log(this.state.data)
        }
        catch(err){
            this.setState({
                loaded:true,
                notFound:true
            })
        }
    }
    render() {
        if(!this.state.loaded){
            return(
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        }
        /* After Fetching API Response */
        return (
            <div>
                {!this.state.notFound?
                <div>
                    <h1>{this.state.data.title}</h1>
                    <h3>Points: {this.state.data.points}</h3>
                </div>:
                <div>
                    <h2>404 NOT FOUND</h2>
                </div>
                }
            </div>
        );
    }
}

export default Post;