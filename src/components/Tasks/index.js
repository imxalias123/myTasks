import './index.css'

const Tasks = props => {
  const {tasksList, tagsList} = props
  const {input, option} = tasksList
  const findItem = tagsList.find(each => each.optionId === option)

  return (
    <li className="eachTask-container ">
      <p className="task-p">{input}</p>

      <p className="box-text  box">{findItem.displayText}</p>
    </li>
  )
}
export default Tasks
