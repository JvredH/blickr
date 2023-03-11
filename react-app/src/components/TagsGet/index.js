import { useSelector } from "react-redux";

const TagsGet = () => {
  const photoTags = useSelector(state => state.tags.onePhotoTags)
  const tagsArr = Object.values(photoTags)

  console.log('tagsArr',tagsArr)
  let tags;

  if (tagsArr.length === 0) {
    tags = (<div>No tags for this photo</div>)
  } else {
    console.log ('tagsArr inside else',tagsArr)
    tags = tagsArr.map(tag => {
      return (<div>{`[${tag.tag_name}]`}</div>)
    })
  }

  return (
    <div>{tags}</div>
  )
}

export default TagsGet;


