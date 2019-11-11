import React from 'react'
import MovieCard from "./MovieCard.js"
import MovieDetails from "./MovieDetails.js"

class Row extends React.Component {

    state = {
        movies: [] ,
        details: false ,
        movieToBeDetailed: {}, 
        showMore: false, 
        showMoreData: {}
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
    this.setState({
        details:false,
        showMore: false
    })
}

showMore = (data) => {
this.setState({
    showMore: true, 
    showMoreData: data
})
}

    componentDidMount() { 
        fetch(this.props.url)
        .then(res => res.json()).then(fetchedMovies => {
            this.setState({
                movies: fetchedMovies.results
            })
        })

    }

    render() {
    let filteredMovies = this.state.movies.filter((movie) => {
        return movie.backdrop_path !== null 
    })

    const movies = filteredMovies.map(movie => {
        return <MovieCard 
        handleFave={this.props.handleFave}
        showDetails={this.showDetails}
        data={movie}/>
    })


    return(
        <div className="rowContainer"> 
            <h1 className="movieTitle"> {this.props.name}</h1>
            <div className="movieRow">
                {movies}
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
    )
    }}

export default Row 