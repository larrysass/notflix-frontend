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

    render() {

    return (
        <div className="movieCard">
            <img className="MovieImg" src={`https://image.tmdb.org/t/p/w400/${this.props.data.backdrop_path}` }/>
            <div className="overlay"> 
                <p className="overlay movieCardTitle">{this.props.data.name}</p>
                <button onClick={this.handleDelete}  id="favoriteButton">Remove</button>
                <button onClick={this.handleClick}  id="detailsButton"> Details</button>
            </div>
        </div>
    )}
}
export default FavoriteCard