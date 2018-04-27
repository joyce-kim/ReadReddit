import React, { Component } from 'react';
import { 
	Container, 
	Row, 
	Col, 
	Button, 
	Navbar, 
	NavbarBrand, 
	Form, 
	Input, 
	InputGroup, 
	InputGroupAddon 
} from 'reactstrap';
import API from '../utils/API.js';
import Result from './Result.js';
import './Home.css';

class Home extends Component {

	state = {
		results: [],
		saved: [],
		inputValue: ''
	}

	// load top threads after first render
	componentDidMount() {
        API.loadHot()
        	.then(res => {
                this.setState({ results: res });
            })
            .catch(err => console.log(err));
	}

	// pass search API user inputted search
	loadSearch = searchTerm => {
		API.search(searchTerm)
            .then(res => {
                this.setState({ results: res });
            })
            .catch(err => console.log(err));
	}

	// save user search input in state
	updateInputValue = e => {
		this.setState({ inputValue: e.target.value });
	}

	// hit search API and empty searchbox on submit
	handleSubmit = e => {
		e.preventDefault();
		this.loadSearch(this.state.inputValue);
		this.setState({ inputValue: '' })
	}
	
	// click handler for each result/saved card
	handleClick = (id, func, e) => {
		if (func === 'Save') {
			let clicked = this.state.results.find(thread => thread.subreddit_id === id);
			let copy = this.state.saved
			copy.push(clicked);
			this.setState({ saved: copy });
		} else if (func === 'Delete') {
			let index = this.state.saved.findIndex(thread => thread.subreddit_id === id);
			let copy = this.state.saved
			copy.splice(index, 1);
			this.setState({ saved: copy });
		}
	}

	render() {
		// create cards for each thread in search results
		const renderResults = this.state.results.map(thread => 
			<Result id={thread.subreddit_id} headline={thread.title} url={thread.url} permalink={thread.permalink} 
				button='Save' onClick={this.handleClick}/>
		);
		
		// create cards for each thread that the user saved
		const renderSaved = this.state.saved.map(thread => 
			<Result id={thread.subreddit_id} headline={thread.title} url={thread.url} permalink={thread.permalink} 
				button='Delete' onClick={this.handleClick}/>)

		return (
			<Container fluid id="home-container">
				<Navbar color="light">
					<NavbarBrand href='/'>{this.state.test}</NavbarBrand>
					<InputGroup>
						<Input id="searchbox" type="text" value={this.state.inputValue} onChange={e => this.updateInputValue(e)} placeholder="search Reddit" />
						<InputGroupAddon addonType="append"><Button type="submit" onClick={e => this.handleSubmit(e)}>Search</Button></InputGroupAddon>
					</InputGroup>
				</Navbar>
				<Row>
					<Col>
						{renderResults}
					</Col>
					<Col>
						{renderSaved}
					</Col>
				</Row>
			</Container>
		)
	}
}

export default Home;