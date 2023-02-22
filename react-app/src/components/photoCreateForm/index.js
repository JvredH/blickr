import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const CreatePhotoForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  }

  return (
    <div>
      <h1>Add A Photo</h1>
      <form onSubmit={handleSubmit}>
        {/* <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
        </ul> */}
        <label>
          Url:
          <input
          type='url'
          value={url}
          onChange={e => setUrl(e.target.value)}
          />
        </label>
        <label>
          Name:
          <input
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}/>
        </label>
        <label>
          Description:
          <input
          type='text'
          value={description}
          onChange={e => setDescription(e.target.value)}/>
        </label>
        <button type='submit'>Add Photo!</button>
      </form>
    </div>
  )
}

export default CreatePhotoForm;
