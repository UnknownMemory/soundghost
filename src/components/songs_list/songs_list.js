import React, { Component } from 'react';
import Song from '../song/song';
import './songs_list.css';

class SongsList extends Component {
  render(){
    const song = this.props.searchResult.map((data) => <Song artwork={data.artwork_url} user={data.user.username} avatar={data.user.avatar_url} title={data.title} currentS={this.props.currentSong} plays={data.playback_count} id={data.id} key={data.id}></Song>)
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <ul className="list-group">{song}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default SongsList;
