import React, { Component } from 'react';
import './search_bar.css'

class SearchBar extends Component {
  constructor(props){
      super(props);
      this.state= {
        value: '',
    };

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.searchData(this.state.value)
  }

  render(){
    return (
      <nav id="navbar-top" className="navbar navbar-light fixed-top justify-content-center">
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-12">
              <input type="text" className="form-control" placeholder="Search" value={this.state.value} onChange={this.handleChange} />
              <i id="search-icon" className="material-icons" onClick={this.handleSubmit}>search</i>
            </div>
          </div>
        </form>
      </nav>
    )
  }
}

export default SearchBar;
