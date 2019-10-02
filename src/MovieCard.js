import React from "react"


class MovieCard extends React.Component {

    state ={
        hover: false
    }

    componentDidMount(){
    }
    handleClick = () => {
        this.props.showDetails(this.props.data)
    }

    handleFave = () => {
        this.props.handleFave(this.props.data)
    
    }
    
    handleLeave = () => {
        this.setState({
            hover: false
        })
    }
    render() {

  
        

    return (
     <div className="movieCard" >
       
        <img className="movieImg" src={`https://image.tmdb.org/t/p/original/${this.props.data.backdrop_path}` }/>

        <div className="overlay"> 
        <p className="overlay movieCardTitle">{this.props.data.title}</p>
        <button onClick={this.handleFave}   id="favoriteButton">+ My List</button>
      
        <button onClick={this.handleClick}  id="detailsButton"> Details</button>
        </div>

    </div>
    )
    }

}


export default MovieCard