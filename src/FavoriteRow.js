import React from 'react'
import FavoriteCard from './FavoriteCard.js'
import MovieDetails from './MovieDetails.js'
import Row from './Row.js'

class FavoriteRow extends React.Component {
    state = {
        movies: [] ,
        details: false ,
        movieToBeDetailed: {} ,
        showMore: false, 
        showMoreData: {}
    }

    componentDidMount() {
     this.setState({
         movies: this.props.favorites
     })
    }
    closeDetails = () => {
        this.setState({
            details:false,
            showMore: false
        })
    }
    showDetails = (movie) => {
        if (this.state.details === false) {
        this.setState({
            details: true ,
            movieToBeDetailed: movie
        })
       
    }
    else {
        return
    }

    }

    showMore = (data) => {
        this.setState({
            showMore: true, 
            showMoreData: data
        })
        }

 

    render() {
        

 

        const movies = this.props.favorites.map(movie => {
            return <FavoriteCard 
            handleDelete={this.props.handleDelete}
            showDetails={this.showDetails}
            data={movie}/>
        })


        return (
            <div className="favoriteRow"> 
            <h1 className="movieTitle">My list</h1>
            <div className="movieRow">
            {movies}
            {/* <button onClick={this.moreMovies}>More Movies</button>
            <button onClick={this.lessMovies}>Less Movies</button> */}
    
            </div>
            {this.state.details? <MovieDetails 
            showMore={this.showMore}
            favorite="hello"
            mediaType="movie"
            handleFave={this.props.handleFave}
            closeDetails={this.closeDetails}
            data={this.state.movieToBeDetailed}/>:null}
            {this.state.showMore? 
        <Row 
        handleFave={this.props.handleFave} name={`Similar to "${this.state.showMoreData.name}"`} url={`https://api.themoviedb.org/3/movie/${this.state.showMoreData.db_id}/recommendations?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&language=en-US&page=1`}
        />:null}
            </div>

        )
    }



}

export default FavoriteRow