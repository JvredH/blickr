import { useSelector } from "react-redux";
import TagsDelete from "../TagsDelete";
import './tagsGet.css'

const TagsGet = ({sessionUser, photo}) => {
  const photoTags = useSelector(state => state.tags.onePhotoTags)
  const tagsArr = Object.values(photoTags)

  let tags;

  if (tagsArr.length === 0) {
    return (<div className='no-tags'>This photo has no tags yet.</div>)
  }


  if (sessionUser && sessionUser.id === photo.user.id) {
    tags = tagsArr.map(tag => {
      return (<div className='tags' key={tag.id}>{`${tag.tag_name}`}<span><TagsDelete photo={photo} tag={tag}/></span></div>)
    })
  } else {
    tags = tagsArr.map(tag => {
      return (<div className='tags' key={tag.id}>{`${tag.tag_name}`}</div>)
    })
  }

  return (
    <div>{tags}</div>
  )
}

export default TagsGet;
