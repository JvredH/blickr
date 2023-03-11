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


//   const tagsArr = photo.tags

//   let tags;

//   if (tagsArr.length === 0) {
//     tags = (
//       <div>No tags for this photo.</div>
//     )
//   } else {
//     tags = tagsArr.map(tag => {
//       return (
//         <div>{`[${tag.tag_name}]`}</div>
//       )
//     })
//   }

  // const dispatch = useDispatch()
  // const [photoTags, setPhotoTags] = useState({})
  // const tagsArr = Object.values(photoTags);

  // useEffect(() => {
  //   dispatch(getPhotoTagsThunk(photo.id)).then((data)=> setPhotoTags(data))
  // }, [])

  // console.log('photoTags', photoTags)
  // let tags;

  // if (!photoTags.tags.length === 0) {
  //   tags = (<div>There are currently no tags for this photo</div>);
  // } else {
  //   tags = tagsArr[0].map(tag => {
  //     return (
  //       <div>{`[${tag.tag_name}]`}</div>
  //     )
  //   })
  // }
