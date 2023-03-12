import { useSelector } from "react-redux";
import TagsDelete from "../TagsDelete";

const TagsGet = ({sessionUser, photo}) => {
  const photoTags = useSelector(state => state.tags.onePhotoTags)
  const tagsArr = Object.values(photoTags)

  let tags;

  if (tagsArr.length === 0) {
    return (<div>No tags for this photo</div>)
  }


  if (sessionUser && sessionUser.id === photo.user.id) {
    tags = tagsArr.map(tag => {
      console.log('tag', tag)
      return (<div key={tag.id}>{`${tag.tag_name}`}<span><TagsDelete photo={photo} tag={tag}/></span></div>)
    })
  } else {
    tags = tagsArr.map(tag => {
      return (<div key={tag.id}>{`[${tag.tag_name}]`}</div>)
    })
  }

  // const tags = tagsArr.map(tag => {
  //   return (<div key={tag.id}>{`[${tag.tag_name}]`}</div>)
  // })

  return (
    <div>{tags}</div>
  )
}

export default TagsGet;

// const TagsGet = () => {
//   const photoTags = useSelector(state => state.tags.onePhotoTags)
//   const tagsArr = Object.values(photoTags)

//   console.log('tagsArr',tagsArr)
//   let tags;

//   if (tagsArr.length === 0) {
//     tags = (<div>No tags for this photo</div>)
//   } else {
//     console.log ('tagsArr inside else',tagsArr)
//     tags = tagsArr.map(tag => {
//       return (<div>{`[${tag.tag_name}]`}</div>)
//     })
//   }

//   return (
//     <div>{tags}</div>
//   )
// }
