import {useDispatch} from 'react-redux'
import { deletePhotoTagThunk, getPhotoTagsThunk } from '../../store/tagsReducer';

const TagsDelete = ({photo, tag}) => {
  const dispatch = useDispatch();

  // console.log(tag.Id)

  const handleClick = async (e) => {
    e.preventDefault();

    await dispatch(deletePhotoTagThunk(photo.id, tag.id))
      .then(() => dispatch(getPhotoTagsThunk(photo.id)))
  }
  return (
    <button onClick={handleClick}>x</button>
  );
}

export default TagsDelete;
