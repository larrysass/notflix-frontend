import React from 'react';
import './App.css';
import Row from './Row.js'
import FavoriteRow from './FavoriteRow.js'
import netflix_logo from './assets/netflix_logo.png'
import blur_edges from './assets/blur_edges_flipped.jpeg'
import brawlText from './assets/brawlText.png'
import BottomScrollListener from 'react-bottom-scroll-listener'
import NetflixRow from './NetflixRow';
import SearchRow from './SearchRow'

class MainPage extends React.Component {

    state= {
        currentUser: {} ,
        favorites: []  ,
        searchedItems: [] ,
        searching: false
    }

    componentDidMount(){
        fetch('http://localhost:3000/profile',{
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
        })
        .then(res => res.json())
        .then(data => {  
          this.setState({
            currentUser: data.user ,
            favorites: data.favorites
        })} 
        )
        // .then(fetch(`http://localhost:3000/users/1`)
        // .then(res => res.json().then( faves=> this.setState({
        //   favorites: faves
        // })))
        // )
    }

    logOut = () => {
      localStorage.clear()
      this.props.history.push('/')
  }

  bottomScrolled = () => {
    console.log("the bottom")
  }

  handleSearch = (event) => {
   if(event.target.value.length < 1 ) {
     this.setState({searching: false})
     return
   }
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&language=en-US&page=1&include_adult=false&query=${event.target.value}`)
  .then(res => res.json()).then(searchResults => {
    if(searchResults.errors) {
    return
    }
  
    this.setState({
      searchedItems: searchResults.results, 
      searching: true
    })
  })
  }

  handleDelete = (data) => {
    fetch(`http://localhost:3000/favorites/${data.id}`, {
      method: 'DELETE'
    })
    let newFavorites = this.state.favorites.filter((movie) => {
        return movie.id !== data.id
      })
    this.setState({
      favorites: newFavorites
    })
  }

    refresh = () => {
      window.location.reload()
    }

    handleFeatureFave = () => {
      const array = this.state.favorites.filter(fave => fave.db_id == 398175);
      if(array.length > 0 ) {
        alert("That Title is Already in Your List!")
        return
      }
      alert("Brawl in Cell Block 99 Added To Your List!")
      fetch('http://localhost:3000/favorites', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
              {
                  user_id: this.state.currentUser.id ,
                  backdrop_path: "/ct2r3CqnA0KtMfib4AvfBU1W9M2.jpg" , 
                  name: "Brawl in Cell Block 99" , 
                  overview: "After working as a drug courier and getting into a brutal shootout with police, a former boxer finds himself at the mercy of his enemies as they force him to instigate violent acts that turn the prison he resides in into a battleground." ,
                  db_id: 398175
                    
              }
          )
        }).then(res=> res.json()).then(newFave=> {
          this.setState({
            favorites: [...this.state.favorites, newFave]
          })
        })
        
    }

    handleFave = (data) => {
      const array = this.state.favorites.filter(fave => fave.db_id == data.id);
      if(array.length > 0 ) {
        alert("This title is already in your list!")
        return
      }

      if (data.title) {
        var name = data.title
      }
      else {
        var name = data.name 
      }

    
      alert(`${name } added to your list!`)
      fetch('http://localhost:3000/favorites', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
              {
                  user_id: this.state.currentUser.id ,
                  backdrop_path: data.backdrop_path , 
                  name: name , 
                  overview: data.overview ,
                  db_id: data.id
                    
              }
          )
        }).then(res=> res.json()).then(newFave=> {
          this.setState({
            favorites: [...this.state.favorites, newFave]
          })
        })
    }

  render() {
     return (
      <BottomScrollListener onBottom={this.bottomScrolled}>
        {scrollRef => (
    <div ref={scrollRef} className="App">
      <div className="navBar">
      <img onClick={this.refresh} src={netflix_logo} height="72" width="142"/> 
      {/* <h1>Welcome,  {this.state.currentUser.username}!  </h1>  */}
      <button className="logoutButton" onClick={this.logOut}>Log out</button> 
      <input className="searchBar" placeholder="search movies" onChange={this.handleSearch}/>
      </div>
      
      {this.state.searching? <SearchRow handleFave={this.handleFave} favorites={this.state.searchedItems}/>:
      <div className="MainContainer">
      <div id="featuredMovie"> 
      <img id="featuredImg" src={blur_edges}/>
      <img  id="brawlText" src={brawlText}/>
      <button onClick={this.handleFeatureFave}id="featuredLike">+ My list</button>
      {/* <button id="featuredDetails">Details</button> */}

      </div>
      <NetflixRow handleFave={this.handleFave} />
      <Row  handleFave={this.handleFave} name={"Action Movies"}url={"https://api.themoviedb.org/3/discover/movie?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&with_genres=28"}/>

      <Row  handleFave={this.handleFave} name={"Animated Movies"}url={"https://api.themoviedb.org/3/discover/movie?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&with_genres=16"}/>
      <Row  handleFave={this.handleFave} name={"Comedies"}url={"https://api.themoviedb.org/3/discover/movie?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&with_genres=35"}/>
      <Row  handleFave={this.handleFave} name={"Documentaries"}url={"https://api.themoviedb.org/3/discover/movie?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&with_genres=99"}/>
      <Row  handleFave={this.handleFave} name={"Science Fiction"}url={"https://api.themoviedb.org/3/discover/movie?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&with_genres=878"}/>
      <Row  handleFave={this.handleFave} name={"Horror"}url={"https://api.themoviedb.org/3/discover/movie?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&with_genres=27"}/>
      <Row  handleFave={this.handleFave} name={"Western"}url={"https://api.themoviedb.org/3/discover/movie?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&with_genres=37"}/>
      <Row  handleFave={this.handleFave} name={"Fantasy"}url={"https://api.themoviedb.org/3/discover/movie?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&with_genres=14"}/>
      
      <Row  handleFave={this.handleFave} name={"Thrillers"}url={"https://api.themoviedb.org/3/discover/movie?api_key=1bcc3b19b2c530d9e8273d3f3ddd2136&with_genres=53"}/>
    
      {this.state.favorites.length > 0?  <div><FavoriteRow 
      handleFave={this.handleFave}
      handleDelete={this.handleDelete}
      favorites={this.state.favorites} />
    
      </div>
      :null}
      </div>
      }
    </div>
        )}
    </BottomScrollListener>
  );
}
}

export default MainPage
