import React from 'react'
import MovieCard from './MovieCard.js'
import MovieDetails from './MovieDetails.js'
import Row from './Row.js'

class SearchRow extends React.Component {
    state = {
        movies: [] ,
        details: false ,
        favorites: [] ,
        movieToBeDetailed: {} ,
        showMore: false, 
        showMoreData: {}
    }

    componentDidMount() {
     this.setState({
         movies: this.props.favorites
     })
    }

    showMore = (data) => {
        this.setState({
            showMore: true, 
            showMoreData: data
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
closeDetails = () => {
    this.setState({details:false})
}

    render() {
        if (this.props.favorites ===undefined  ) {
            var filteredMovies = this.state.favorites
        }
        else {

        var filteredMovies = this.props.favorites.filter((movie) => {
            return movie.backdrop_path !== null })
        }

        const movies = filteredMovies.map(movie => {
            return <MovieCard 
            handleFave={this.props.handleFave}
            showDetails={this.showDetails}
            data={movie}/>
        })


        return (
            <div className="searchRow"> 
            <div className="searchRowToMove">
            <h1> Search Results: </h1>
            <div className="movieRow">
            {movies}
            {/* <button onClick={this.moreMovies}>More Movies</button>
            <button onClick={this.lessMovies}>Less Movies</button> */}
    
            </div>
            {this.state.details? <MovieDetails 
            showMore={this.showMore}
            handleFave={this.props.handleFave}
            mediaType="movie"
            closeDetails={this.closeDetails}
            data={this.state.movieToBeDetailed}/>:null}
             {this.state.showMore? 
        <Row 
        handleFave={this.props.handleFave} name={`Similar to "${this.state.showMoreData.title}"`} url={`https://api.themoviedb.org/3/movie/${this.state.showMoreData.id}/recommendations?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&language=en-US&page=1`}
        />:null}
            </div>
            </div>

        )
    }



}

export default SearchRow