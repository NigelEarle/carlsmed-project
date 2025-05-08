import { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 110px;
  padding: 30px 20px;
`;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const InfoText = styled.strong`
  margin-top: 15%;
  font-size: xxx-large;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px
`;

const FileInput = styled.input`
  height: 45px;
  margin-bottom: 50px;
`;

const TextInput = styled(FileInput)`
  background: whitesmoke;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  height: 130px;
  margin-bottom: 50px;
  background: whitesmoke;
  border-radius: 4px;
`;

const Label = styled.label`
  font-size: x-large;
  font-weight: 700;
`;

const SubmitButton = styled.button`
  cursor: pointer;
  font-size: x-large;
  font-weight: 700;
  width: 215px;
  align-self: flex-end;
`;

function CreateNewMeme() {
  const [memeFields, setMemeFields] = useState({
    title: '',
    image: '',
    description: ''
  });

  // const [deleteId, setDeleteId] = useState(0);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const submitNewMeme = async (e: Event) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('image', memeFields.image)
      formData.append('title', memeFields.title)
      formData.append('description', memeFields.description) 

      const response = await fetch('http://localhost:3001/memes', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error(`Error submitting meme memes -> status: ${response.status}`);
      }
      await response.json();
      navigate('/')

    } catch (e) {
      setError(e);
    }
  };

  const updateFields = (e: Event) => {
    setMemeFields(prevMemeFields => ({
      ...prevMemeFields,
      [e.target?.name] : [e.target?.value]
    }))
  }

  const setFile = (e: Event) => {
    const file = e.target?.files[0];
    setMemeFields(prevMemeFields => ({
      ...prevMemeFields,
      image: file
    }));
  }



  return (
    <>
      <HeaderContainer/>
      <BodyContainer>
        {error ?
          <InfoText>Something went wrong creating a new meme</InfoText>
        :
          <Form onSubmit={(e) => submitNewMeme(e)}>
            <Label>Choose Meme To Upload</Label>
            <FileInput
              onChange={(e) => setFile(e)}
              name='file'
              type='file'
              accept='image/*'
              required
            />
            <Label>Title</Label>
            <TextInput
              onChange={(e) => updateFields(e)}
              name='title'
              type='text'
              placeholder='Title'
              value={memeFields.title}
              required
            />
            <Label>Description</Label>
            <TextArea
              onChange={(e) => updateFields(e)}
              name='description'
              placeholder='Description'
              value={memeFields.description}
              required
            />
            <SubmitButton type="submit">Submit</SubmitButton>
          </Form>
        }
        

      </BodyContainer>
    </>
  )
}

export default CreateNewMeme;