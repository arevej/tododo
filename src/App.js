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
`;

const Header = styled.h1`
  text-align: center;
  letter-spacing: 10px;
  font-size: 50px;
  margin: 50px 0;
`;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  margin-top: 50px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

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
`;

const ItemInput = styled.input.attrs({
  type: 'text',
})`
  font-size: 27px;
  color: #111;
  border: none;
  background: transparent;
  outline: none;
`;
const ItemButton = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid #111;
  border-radius: 18px;
  margin-right: 20px;
  background: ${props => (props.isDone ? '#111' : '#fff')};
`;

let idCounter = 0;

class App extends Component {
  state = {
    typingItem: null,
    activeItemIdx: null,
    todoList: [
      { id: idCounter++, text: 'Apple', isDone: false },
      { id: idCounter++, text: 'Juice', isDone: false },
      { id: idCounter++, text: 'Rolling pin', isDone: false },
      { id: idCounter++, text: 'Extension cord', isDone: false },
      { id: idCounter++, text: 'Bread', isDone: false },
    ],
  };

  inputs = {};

  handleTaskPerfomance = (id, event) => {
    const newTodoList = this.state.todoList.map(item => {
      if (id === item.id) {
        return { ...item, isDone: !item.isDone };
      }
      return item;
    });

    this.setState({ todoList: newTodoList });
  };

  handleChangeItem = (id, event) => {
    const newTodoList = this.state.todoList.map(item => {
      if (id === item.id) {
        return { ...item, text: event.target.value };
      }
      return item;
    });

    this.setState({ todoList: newTodoList });
  };

  handleEmptyItems = id => {
    const newTodoList = this.state.todoList.filter(item => {
      if (id === item.id) {
        return item.text !== '';
      }
      return true;
    });
    this.setState({
      todoList: newTodoList,
    });
  };

  createNewItem = (index, event) => {
    if (event.key === 'Enter') {
      const before = this.state.todoList.slice(0, index + 1);
      const after = this.state.todoList.slice(index + 1);
      const item = {
        id: idCounter++,
        text: '',
        isDone: false,
      };
      const newTodoList = [...before, item, ...after];
      this.setState({ todoList: newTodoList }, () => {
        const element = this.inputs[item.id];
        element.focus();
      });
    }
  };

  render() {
    return (
      <Wrapper>
        <Header>TODODO</Header>
        <ListWrapper>
          <List>
            {this.state.todoList.map((item, index) => (
              <ListItem key={item.id}>
                <ItemButton
                  isDone={item.isDone}
                  onClick={() => this.handleTaskPerfomance(item.id)}
                />
                <ItemInput
                  innerRef={element => (this.inputs[item.id] = element)}
                  value={item.text}
                  onKeyPress={event => this.createNewItem(index, event)}
                  onChange={event => this.handleChangeItem(item.id, event)}
                  onBlur={() => this.handleEmptyItems(item.id)}
                />
              </ListItem>
            ))}
          </List>
        </ListWrapper>
      </Wrapper>
    );
  }
}

export default App;
