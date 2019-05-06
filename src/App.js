import React, {Component} from 'react';
import { Button, Row } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle} from 'reactstrap';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Navbar, NavbarBrand, NavItem } from 'reactstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Container, Col, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import CardInstance from './CardInstance';
import './App.css';


class App extends Component{
  
  constructor(){
    super()
    this.state = { dropOpen: false, lastCardId: 2, maxNumOfCardsPerPage: 10, 
      currentPage: 1, currentCardsPerPage: 1, totalNumberOfCards: 1,
      addTitle: "", addText: "", shouldComponentReRender: false, 
      isAddFormShown: false,

      cards: [
        {
          id: 1,
          title: "Title",
          text: "Description/Text",
          editMode: false,
          updatedTitle: "Title",
          updatedText: "Description/Text"
        }
      ]
    } 
    
    this.addCard = this.addCard.bind(this);
    this.cardsGenerator = this.cardsGenerator.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.changeMode = this.changeMode.bind(this);
    this.DropdownClick = this.DropdownClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.ReturnCards = this.ReturnCards.bind(this);
    this.ReturnDropdownNumber = this.ReturnDropdownNumber.bind(this);
    this.ReturnPagination = this.ReturnPagination.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateCardInformation = this.updateCardInformation.bind(this);

  }

  toggle() {
    this.setState(prevState => ({
      dropOpen: !prevState.dropOpen
    }));
    this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})
  }


  ReturnDropdownNumber(){
  
    let arr = []
    let self = this
  
    for (let i = 0; i < this.state.maxNumOfCardsPerPage; i++){
      arr.push(<DropdownItem id={i+1} onClick={self.DropdownClick}>{i+1}</DropdownItem>);
    }
  
    return arr
  }

  DropdownClick(e){
    
    let number = e.target.id
    this.setState({currentCardsPerPage: number})
    this.setState({currentPage: 1})
    this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})
  
  }

  shouldComponentUpdate(nextProps, nextState){
    
    if (this.state.shouldComponentReRender != nextState.shouldComponentReRender){
      return true
    }

    return false
  }

  ReturnCards(){
    
    let arr = []
    if (this.state.cards.length != 0 && (this.state.currentCardsPerPage*this.state.currentPage - this.state.currentCardsPerPage + 1) <= this.state.cards.length ) {
      arr = this.cardsGenerator(this.state.currentPage)
    }

    if (this.state.cards.length != 0 && (this.state.currentCardsPerPage*this.state.currentPage - this.state.currentCardsPerPage + 1) > this.state.cards.length ) {
      arr = this.cardsGenerator(this.state.currentPage - 1)
      this.setState({currentPage: this.state.currentPage - 1})
      this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})

    }
    
    return arr
  }  

  cardsGenerator(pageInput){

    let array = []
    let curPage = pageInput
    for (let i = this.state.currentCardsPerPage; i >=1 ; i--){ 
        array.push(<div>
         <Card id={this.state.cards[this.state.currentCardsPerPage*curPage - i].id} onDoubleClick={this.changeMode} 
         style={{marginTop: 9, marginRight: 10,  width: 220, borderColor: "black"}}         
         >
         <CardImg src="http://www.mazaday.com/wp-content/uploads/2017/09/Spiderman-3D-Wallpaper.jpg" alt="Card Image"/>
         {this.state.cards[this.state.currentCardsPerPage*curPage - i].editMode ? this.editView(this.state.cards[this.state.currentCardsPerPage*curPage - i].id) : this.defaultView(this.state.cards[this.state.currentCardsPerPage*curPage - i].id)}
        </Card>
        </div>
        )
        if ((this.state.currentCardsPerPage*curPage - i + 1) == this.state.cards.length){
          break
        }
      }

    return array

  }

  changeMode(e){

    for (let i=0; i < this.state.cards.length; i++){
      if (this.state.cards[i].id == e.currentTarget.id){
        this.state.cards[i].editMode = !this.state.cards[i].editMode
        break
      }
    }
    this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})
  }

  defaultView(id){
  
    let index = null
  
    for (let i=0; i<this.state.cards.length; i++){
      if (this.state.cards[i].id == id){
        index = i
        break
      }
    }

    return (
    <CardBody>
      <CardTitle><b>{this.state.cards[index].title}</b></CardTitle>
      <CardText>{this.state.cards[index].text}</CardText>
      <Button className="deleteButton" id={this.state.cards[index].id} onClick={this.handleDelete} style={{borderColor: "black", backgroundColor: '#C93C38'}}>Delete</Button>
    </CardBody>
    )
  
  }

  editView(id){
    let index = null
    
    for (let i=0; i<this.state.cards.length; i++){
      if (this.state.cards[i].id == id){
        index = i
        break
      }
    }
    
    return (
    <CardBody>
      <Row><CardTitle><Input id={this.state.cards[index].id} className="updatedTitle" type="text" onChange={this.handleUpdate} style={{borderColor:"black", width: 100}} defaultValue = {this.state.cards[index].title}/> <b></b></CardTitle>
        <Button id={this.state.cards[index].id} style={{backgroundColor: "green",borderColor: "black", marginLeft: 10, height:38}} onClick={this.updateCardInformation}>OK</Button>
        <Button id={this.state.cards[index].id} style={{borderColor: "black", marginLeft: 8, height:38}} onClick={this.changeMode}>X</Button>
      </Row>
      <CardText><Input id={this.state.cards[index].id} className="updatedText" type="text" onChange={this.handleUpdate} style={{marginLeft:-15, borderColor:"black", width: 100}} defaultValue = {this.state.cards[index].text}/></CardText>
      <Button className="deleteButton" id={this.state.cards[index].id} onClick={this.handleDelete} style={{borderColor: "black", backgroundColor: '#C93C38'}}>Delete</Button>
    </CardBody>
    )

  }

  handleUpdate(e){
    
    for (let i=0; i<this.state.cards.length; i++){
      if (this.state.cards[i].id == e.currentTarget.id){
        if (e.currentTarget.className == "updatedTitle form-control"){
         this.state.cards[i].updatedTitle = e.currentTarget.value
        }

        if (e.currentTarget.className == "updatedText form-control"){
          this.state.cards[i].updatedText = e.currentTarget.value
        }
        break
      }
    }

  }

  updateCardInformation(e){

    for (let i=0; i<this.state.cards.length; i++){
      if (this.state.cards[i].id == e.currentTarget.id){
        if (this.state.cards[i].updatedTitle == "" || this.state.cards[i].updatedText == ""){
          console.log("empt")
          alert("Cannot edit card with one of the fields being empty! :)\nPlease, fill out all fields!")
        }

        if (this.state.cards[i].updatedTitle != "" && this.state.cards[i].updatedText != ""){
          this.state.cards[i].editMode = false
          this.state.cards[i].title = this.state.cards[i].updatedTitle
          this.state.cards[i].text = this.state.cards[i].updatedText
          this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})
          break
        } 
         
      } 
    }
  }

  ReturnPagination(inputArray){
    
    let arr = []
    let array = []
    let numberOfPages = Math.ceil(this.state.totalNumberOfCards/this.state.currentCardsPerPage)

    for (let i = 1; i <= numberOfPages; i++){
      if (i != this.state.currentPage){
        arr.push(<PaginationItem disabled={false}><PaginationLink id={i} onClick={this.changeCurrentPage} href="#" style={{marginLeft: 1.4}}>{i}</PaginationLink></PaginationItem>)    
      } else {
        arr.push(<PaginationItem disabled={true}><PaginationLink id={i} onClick={this.changeCurrentPage} href="#" style= {{borderColor: "black", backgroundColor: "grey", color: "white", marginLeft: 1.4}}>{i}</PaginationLink></PaginationItem>)  
      }
      if (i%10 == 0 || i == numberOfPages){
        if (i <= 10){
          array.push(<Row className="Row1"><Pagination className="Pagination">{arr}</Pagination></Row>)  
        } else{
          array.push(<Row className="Row"><Pagination className="Pagination">{arr}</Pagination></Row>)
        }
        arr = []
      }

    }

    return array
  }

  changeCurrentPage(e){
    this.setState({currentPage: e.target.id})
    this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})
  }

  handleChange(e){
  
    if (e.target.className == "titleInput"){
      this.setState({addTitle: e.target.value})
    }

    if (e.target.className == "textInput"){
      this.setState({addText: e.target.value})
    }

  }

  handleDelete(e){
    
    let newCards = this.state.cards.filter((_item) => {
      return _item.id != e.target.id
    });

    this.setState({cards: newCards})
    this.setState({totalNumberOfCards: this.state.totalNumberOfCards - 1})
    this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})
  
  }

  addCard(){

    this.state.cards.push({id: this.state.lastCardId + 1, title: "Default Title",
      text: "Default Text/Description", editMode: false, updatedTitle: "Default Title",
      updatedText: "Default Text/Description"
      })
      this.setState({lastCardId: this.state.lastCardId + 1})
      this.setState({totalNumberOfCards: this.state.totalNumberOfCards + 1})
      this.setState({shouldComponentReRender: !this.state.shouldComponentReRender})

  }

  render(){  

    let self = this

    return (

      <div className="MainDiv">

        <Navbar className="NavBar" style={{backgroundColor:'#5181b8' }} light expand="md">
          <NavbarBrand className="NavBrand" style={{ color: "white" }}>KazDream</NavbarBrand>
        </Navbar>

        <Row className="justify-content-center mt-3">
          <Dropdown style={{marginRight: 15}} isOpen={self.state.dropOpen} toggle={self.toggle}>
            <DropdownToggle style={{borderColor: "black", backgroundColor: '#5181b8'}} caret>
              Cards per Page
            </DropdownToggle>
            <DropdownMenu>
             {self.ReturnDropdownNumber()}
            </DropdownMenu>
          </Dropdown>
          <Button style={{borderColor: "black", backgroundColor: "red"}} onClick={self.addCard}>
            Add Card
          </Button>
        </Row>

        <Row className="justify-content-center" style={{marginBottom: 10}}>
          {self.ReturnCards()}
        </Row>
        {self.ReturnPagination()}
      </div>
  
    );
  }
}

export default App;