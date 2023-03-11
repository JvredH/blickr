import { useState } from "react";

const TagsAdd = () => {
  const [newTag, setNewTag] = useState('')
  const [errors, setErrors] = useState([])

  const onSubmit = e => {
    e.preventDefault()
  }

  return (
    <div>
      <form submit={onSubmit}>
        <input placeholder='Add a tag' type='text' required value={newTag} onChange={e => setNewTag(e.target.value)} minLength='3' maxLength='20'/>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default TagsAdd;
