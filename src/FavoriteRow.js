import React from 'react'
import FavoriteCard from './FavoriteCard.js'
import MovieDetails from './MovieDetails.js'

class FavoriteRow extends React.Component {
    state = {
        movies: [] ,
        details: false ,
        movieToBeDetailed: {}
    }

    componentDidMount() {
     this.setState({
         movies: this.props.favorites
     })
    }
    closeDetails = () => {
        this.setState({details:false})
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

 

    render() {
        

 

        const movies = this.props.favorites.map(movie => {
            return <FavoriteCard 
            handleDelete={this.props.handleDelete}
            showDetails={this.showDetails}
            data={movie}/>
        })


        return (
            <div> 
            <h1 className="movieTitle">My list</h1>
            <div className="movieRow">
            {movies}
            {/* <button onClick={this.moreMovies}>More Movies</button>
            <button onClick={this.lessMovies}>Less Movies</button> */}
    
            </div>
            {this.state.details? <MovieDetails 
            handleFave={this.props.handleFave}
            closeDetails={this.closeDetails}
            data={this.state.movieToBeDetailed}/>:null}
            </div>

        )
    }



}

export default FavoriteRow