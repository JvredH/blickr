import {useDispatch} from 'react-redux'
import { deletePhotoTagThunk, getPhotoTagsThunk } from '../../store/tagsReducer';

const TagsDelete = ({photo, tag}) => {
  const dispatch = useDispatch();

  const handleClick = async (e) => {
    e.preventDefault();

    await dispatch(deletePhotoTagThunk(photo.id, tag.id))
      .then(() => dispatch(getPhotoTagsThunk(photo.id)))
  }
  return (
    <button className='tag-delete' onClick={handleClick}>x</button>
  );
}

export default TagsDelete;
