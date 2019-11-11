import React from "react"


class NetflixCard extends React.Component {

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
        <img className="NetflixImg" src={`https://image.tmdb.org/t/p/original/${this.props.data.poster_path}` }/>
        <div className="overlay"> 
            <button onClick={this.handleFave} className="netflixFave"  id="favoriteButton">+ My List </button>
            <button onClick={this.handleClick} className="netflixDeets"  id="detailsButton">Details</button>
        </div>
    </div>
    )
    }}


export default NetflixCard