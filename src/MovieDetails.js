import React from 'react';
import YouTube from 'react-youtube';
import Row from './Row.js'

class MovieDetails extends React.Component {
    state = {
        url: ``
    }


    componentDidMount() {

        if(this.props.favorite === "hello"){
            var the_id = this.props.data.db_id
        }
        else {
            var the_id = this.props.data.id
        }
        
        console.log(the_id)

         fetch(`https://api.themoviedb.org/3/${this.props.mediaType}/${the_id}/videos?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136`)
        .then(res => res.json()).then(videoData => {
            console.log(videoData)
            if(!videoData.results || videoData.results.length < 1) {
                return
            }
            else {
            this.setState({
                url: videoData.results[0].key
            }) 
        }
        })
        
    }
    showMore = () => {
        this.props.showMore(this.props.data)
    }

    handleClick = () => {
        this.props.closeDetails()
    }

    handleFave = () => { 
        this.props.handleFave(this.props.data)
        
    }
render() {
    if(this.props.mediaType) {
        console.log("hello")
    }
    const opts = {
        height: '390',
        width: '640',
        playerVars: { // https://developers.google.com/youtube/player_parameters
          autoplay: 1, 
          controls: 0,
          allowfullscreen: 0
        }
      };
   

    return(
    <div className="movieDetails">
            <div id="movieInfo">
            {this.props.favorite === "hello"? null:<button id="exitMovieDetails" onClick={this.handleFave}> + My List</button>}
                <button id="exitMovieDetails" onClick={this.handleClick}> X Close</button>
                <h1>{this.props.data.title}</h1> <h1>{this.props.data.name}</h1>
                <p>{this.props.data.overview}</p>
                {this.props.mediaType === "movie"? 
                <button onClick={this.showMore} className="showMeMore">Show me movies like this</button> 
                :null}
            </div>
        <div id="trailerDiv">
            <YouTube
    
            videoId={this.state.url}
            opts={opts}
            onReady={this._onReady}
            />
         </div>

    </div>
    ) 
}



}


export default MovieDetails