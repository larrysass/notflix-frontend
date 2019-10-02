import React from 'react'
import NetflixCard from "./NetflixCard.js"
import MovieDetails from "./MovieDetails.js"

class NetflixRow extends React.Component {

    state = {
        movies: [] ,
        details: false ,
        movieToBeDetailed: {}
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

    componentDidMount() { 
        fetch("https://api.themoviedb.org/3/discover/tv?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&with_networks=213")
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
        return <NetflixCard 
        handleFave={this.props.handleFave}
        showDetails={this.showDetails}
        data={movie}/>
    })


    return(
        <div className="netflixRowContainer"> 
        <h1 className="movieTitle"> Netflix Originals</h1>
        <div className="movieRow">
        {movies}


        </div>
        {this.state.details? <MovieDetails 
        mediaType="tv"
        handleFave={this.props.handleFave}
        closeDetails={this.closeDetails}
        data={this.state.movieToBeDetailed}/>:null}
        </div>
    )


    }
}

export default NetflixRow 