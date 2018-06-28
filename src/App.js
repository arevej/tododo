import React, { Component } from 'react';
import styled from 'styled-components';
import logo from './logo.svg';
import './App.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 795px;
  font-family: HelveticaNeue-Light;
  letter-spacing: 5px;
`

const Header = styled.h1`
  text-align: center;
  letter-spacing: 10px;
  font-size: 50px;
  margin: 50px 0;
`

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-top: 50px;
`

const List = styled.div`
  display: flex;
  flex-direction: column;
`

const ListItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  border: 1px solid transparent;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.5s;

  &:hover {
    background: rgba(189, 189, 189, 0.3);
  }
`

const ItemInput = styled.input.attrs({
  type: 'text'
})`
  font-size: 27px;
  color: #111;
  border: none;
  background: transparent;
  outline: none;
`
const ItemButton = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid #111;
  border-radius: 10px;
  margin-right: 20px;
  background: ${props=> props.isDone ?
    '#111':'#fff'};
`

class App extends Component {
  state={
    typingItem: null,
    activeItemIdx: null,
    todoList: [
      {text: "Apple", isDone: false},
      {text: "Juice", isDone: false},
      {text: "Rolling pin", isDone: false},
      {text: "Extension cord", isDone: false},
      {text: "Bread", isDone: false},
    ]
  }

  handleTaskPerfomance = (idx) => {
    const newTodoList = this.state.todoList.map((item, _index) => {
      if(_index=== idx) {
        return {text: item.text, isDone: !item.isDone}
      }else{
        return item
      }
    })

    this.setState({ todoList: newTodoList})
  }

  handleChangeItem = (idx) => (event) => {
    const newTodoList = this.state.todoList.map((item, _index) => {
      if(_index=== idx) {
        return {text: event.target.value, isDone: item.isDone}
      }else{
        return item
      }
    })

    this.setState({ todoList: newTodoList.filter(item => item.text !== '')})
  }

  render() {
    return (
      <Wrapper>
        <Header>
          TODODO
        </Header>
        <ListWrapper>
          <List>
            {this.state.todoList.map((item, idx) =>
              <ListItem key={idx}>
                <ItemButton isDone={item.isDone} onClick={() => this.handleTaskPerfomance(idx)}/>
                <ItemInput value={item.text} onChange={this.handleChangeItem(idx)}/>
              </ListItem>
            )}
          </List>
        </ListWrapper>
      </Wrapper>
    );
  }
}

export default App;
