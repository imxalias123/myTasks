import './App.css'

import {Component} from 'react'
import {v4} from 'uuid'
import ListOfTags from './components/ListOfTags'

import Tasks from './components/Tasks'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
    isTrue: false,
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
    isTrue: false,
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
    isTrue: false,
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
    isTrue: false,
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
    isTrue: false,
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
    isTrue: false,
  },
]

class App extends Component {
  state = {
    input: '',
    option: tagsList[0].optionId,
    tasksList: [],
    initialTagsList: tagsList,
    selectedTag: '',
  }

  onChangeInput = event => {
    this.setState({input: event.target.value})
  }

  onChangeOptions = event => {
    this.setState({option: event.target.value})
  }

  onClickTagButton = buttonOptionId => {
    const {initialTagsList} = this.state

    const clickedItem = initialTagsList.find(
      each => each.optionId === buttonOptionId,
    )

    if (clickedItem.isTrue === false) {
      const filteredList = initialTagsList.map(each => {
        if (each.optionId === buttonOptionId) {
          return {...each, isTrue: true}
        }
        return {...each, isTrue: false}
      })
      console.log(filteredList)
      this.setState({
        initialTagsList: filteredList,
        selectedTag: buttonOptionId,
      })
    }
    if (clickedItem.isTrue) {
      const filteredList = initialTagsList.map(each => {
        if (each.optionId === buttonOptionId) {
          return {...each, isTrue: false}
        }
        return each
      })
      console.log(filteredList)
      this.setState({initialTagsList: filteredList, selectedTag: ''})
    }
  }

  onSubmitTask = event => {
    const {input, option} = this.state
    event.preventDefault()
    if (input.length !== 0) {
      const newTask = {
        input,
        option,
        id: v4(),
      }

      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        input: '',

        option: tagsList[0].optionId,
      }))
    } else {
      alert('Enter the task')
    }
  }

  renderCreateTask = () => {
    const {input, option} = this.state
    return (
      <div className="create-container">
        <h1 className="create-h1">Create a task!</h1>
        <form className="form" onSubmit={this.onSubmitTask}>
          <div className="wrap">
            <label className="label" htmlFor="task">
              Task
            </label>
            <input
              value={input}
              placeholder="Enter the task here"
              className="input"
              id="task"
              onChange={this.onChangeInput}
            />
          </div>
          <div className="wrap">
            <label className="label" htmlFor="task">
              Tags
            </label>
            <select
              id="tags"
              value={option}
              className="input"
              onChange={this.onChangeOptions}
            >
              {tagsList.map(each => (
                <option
                  value={each.optionId}
                  key={each.optionId}
                  className="options"
                >
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
          <div className="center">
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </div>
        </form>
      </div>
    )
  }

  renderTasksListContainer = () => {
    const {initialTagsList, tasksList, option, input, selectedTag} = this.state
    const filteredList = tasksList.filter(item =>
      item.option.includes(selectedTag),
    )
    console.log(selectedTag)
    const length = filteredList.length === 0

    return (
      <>
        <div className="tasks-container">
          <h1 className="tag-h1">Tags</h1>
          <ul className="unordered-list">
            {initialTagsList.map(each => (
              <ListOfTags
                key={each.optionId}
                details={each}
                onClickTagButton={this.onClickTagButton}
              />
            ))}
          </ul>
          <h1 className="task-list-h1">Tasks</h1>
          <ul className="taskItems">
            {length ? (
              <div className="list">
                <p className="no-task">No Tasks Added Yet</p>
              </div>
            ) : (
              filteredList.map(each => (
                <Tasks
                  key={each.optionId}
                  tasksList={each}
                  tagsList={tagsList}
                />
              ))
            )}
          </ul>
        </div>
      </>
    )
  }

  render() {
    const {initialTagsList, tasksList, selectedTag} = this.state
    const length = tasksList.length === 0
    return (
      <div className="container">
        {this.renderCreateTask()}
        {this.renderTasksListContainer()}
      </div>
    )
  }
}

export default App
