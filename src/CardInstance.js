import React, {Component} from 'react';
import { Button } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import logo from './logo.svg';
import './App.css';

class CardInstance extends Component{

	constructor(props){
		super(props);

		this.state = {
			id: this.props.card.id,
			title: this.props.card.title,
			text: this.props.card.text
		}
	}

	render(){

		return(
			<div>
			 <Card id={this.state.id} style={{marginTop: 9, marginRight: 10,  width: 220, borderColor: "black"}}>
	          <CardImg src="https://www.w3schools.com/bootstrap4/img_avatar3.png" alt="Card Image" />
	          <CardBody>
	            <CardTitle><b>{this.state.title}</b></CardTitle>
	            <CardText>{this.state.text}</CardText>
	            <Button>Delete</Button>
	            <Button style={{ marginLeft: 10 }}>Edit</Button>
	          </CardBody>
	         </Card>
			</div>
		);
	}
}

export default CardInstance;