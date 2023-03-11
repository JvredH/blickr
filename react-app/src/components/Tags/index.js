const Tags = ({photo}) => {
  // console.log('from tags component -----> ', photo)
  const tagsArr = photo.tags

  // console.log('tagsArr --> ', tagsArr)
  let tags;

  if (tagsArr.length === 0) {
    tags = (
      <div>No tags for this photo.</div>
    )
  } else {
    tags = tagsArr.map(tag => {
      return (
        <div>{`[${tag.tag_name}]`}</div>
      )
    })
  }

  return (
    tags
  )
}

export default Tags;
