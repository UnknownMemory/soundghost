import React, { Component } from 'react';
import SearchBar from './components/search_bar/search_bar';
import SongsList from './components/songs_list/songs_list';
import MusicPlayer from './components/music_player/music_player';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      currentSongID: 0,
      currentSongArtwork: false,
      currentSongUser: false,
      currentUserAvatar: false,
      currentSongTitle: false
    }
    this.getSearchData = this.getSearchData.bind(this);
    this.getCurrentSong = this.getCurrentSong.bind(this);
  }

  getSearchData(search){
    fetch(`https://cors-anywhere.herokuapp.com/https://api-v2.soundcloud.com/search/tracks?q=${search}&sc_a_id=fc452777-f331-4acc-a48b-659cb69718b9&variant_ids=&facet=genre&user_id=707627-191502-502853-114326&client_id=fPcvSVYVoQDmIlkJL33irYQTFmkkuvW8&limit=25`)
    .then((response) => response.json())
    .then((r)=>{
      this.setState({
        data: r.collection
      })
    })
  }

  getCurrentSong(songID, songArtwork, songUser, userAvatar, songTitle){
    this.setState({
      currentSongID: songID,
      currentSongArtwork: songArtwork,
      currentSongUser: songUser,
      currentSongTitle: songTitle,
      currentUserAvatar: userAvatar
    })
  }

  componentDidMount(){
    fetch(`https://cors-anywhere.herokuapp.com/https://api-v2.soundcloud.com/search/tracks?q=&sc_a_id=fc452777-f331-4acc-a48b-659cb69718b9&variant_ids=&facet=genre&user_id=707627-191502-502853-114326&client_id=LScyTbJVDLRaeLkwReztU0QTGmyWhbin&limit=25`)
    .then((response) => response.json())
    .then((r)=>{
      this.setState({
        data: r.collection
      })
    })
  }

  render() {
    return (
      <div className="App">
        <SearchBar searchData={this.getSearchData} />
        <SongsList searchResult={this.state.data} currentSong={this.getCurrentSong}></SongsList>
        <MusicPlayer currentID={this.state.currentSongID} currentArtwork={this.state.currentSongArtwork} currentUser={this.state.currentSongUser} currentAvatar={this.state.currentUserAvatar} currentTitle={this.state.currentSongTitle}/>
      </div>
    );
  }
}

export default App;
