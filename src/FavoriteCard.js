import React from "react"


class FavoriteCard extends React.Component {

    componentDidMount(){
    }
    handleClick = () => {
        this.props.showDetails(this.props.data)
    }

    handleDelete = () => {
        this.props.handleDelete(this.props.data)
    
    }
    handleEnter = () => {
        this.setState({
            hover: true
        })
        // fetch(`https://api.themoviedb.org/3/movie/${this.props.data.id}/videos?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136`)
        // .then(res => res.json()).then(videoData => {
        //     const url = ``
        // })
        
    }

    handleLeave = () => {
        this.setState({
            hover: false
        })
    }
    render() {

  
        

    return (
     <div className="movieCard">
       
        <img className="MovieImg" src={`https://image.tmdb.org/t/p/w400/${this.props.data.backdrop_path}` }/>

        <div className="overlay"> 
        <p className="overlay movieCardTitle">{this.props.data.name}</p>
        <button onClick={this.handleDelete}  id="favoriteButton">Remove</button>
        {/* <button onClick={this.handleClick}  id="detailsButton">╲╱</button> */}
        </div>

    </div>
    )
    }

}


export default FavoriteCard