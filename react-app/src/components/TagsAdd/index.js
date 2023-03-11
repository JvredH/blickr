import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addPhotoTagThunk, getPhotoTagsThunk } from "../../store/tagsReducer";


const TagsAdd = ({photo}) => {
  const dispatch = useDispatch()
  const [newTag, setNewTag] = useState('')
  const [errors, setErrors] = useState([])
  const currentPhotoTags = useSelector(state => state.tags.onePhotoTags)
  const currentPhotoTagsArr = Object.values(currentPhotoTags)
  const actualTags = currentPhotoTagsArr.map(tag => tag.tag_name)
  let photoId = photo.id

  console.log('actualTags', actualTags)

  const handleSubmit = async e => {
    e.preventDefault()
    setErrors([])

    if (actualTags.includes(newTag)) {
      setErrors(['Photo already has this tag'])
      return
    }

    const tagToAdd = {
      tag_name: newTag
    }

    await dispatch(addPhotoTagThunk(tagToAdd, +photoId))
    .then(() => dispatch(getPhotoTagsThunk(+photoId)))
    .then(() => setNewTag(''))
    .then(() => setErrors([]))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder='Add a tag' type='text' required value={newTag} onChange={e => setNewTag(e.target.value)} minLength='3' maxLength='20'/>
        <button type='submit'>Add</button>
      </form>
      {errors.map((error, idx) => (
                  <div className='errors' key={idx}>{error}</div>
                ))}
    </div>
  )
}

export default TagsAdd;
