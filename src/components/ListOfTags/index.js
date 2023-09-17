import './index.css'

const ListOfTags = props => {
  const {details, onClickTagButton} = props
  const {optionId, displayText, isTrue} = details

  const className = isTrue ? 'clicked' : 'not'

  const onClickTag = () => {
    onClickTagButton(optionId)
  }
  return (
    <li>
      <button type="button" className={className} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

export default ListOfTags
