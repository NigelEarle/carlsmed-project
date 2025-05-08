import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
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
  padding: 50px 40px 0 40px;
`;

const InfoText = styled.strong`
  margin-top: 15%;
  font-size: xxx-large;
`;

const HeaderButton = styled.button`
  cursor: pointer;
  font-size: large;
  font-weight: 600;
`;

const Button = styled.button`
  cursor: pointer;
  font-size: large;
  font-weight: 600;
  width: 9em;
  align-self: flex-end;
  height: 50px;
`;

const MemeDetailsContainer = styled.div`
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  width: 70%;
  padding: 4%;
  border-radius: 5px;
  border: lightgrey;
`;

const Img = styled.img`
  border-radius: 4px;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #2a2a2a;
  margin-bottom: 5px;
`;

const Description = styled.p`
  color: #2a2a2a;
  font-size: large;
  font-weight: 400;
  margin-bottom: 4em;
`;

function GetSingleMeme() {
  const [meme, setMeme] = useState({
    imageUrl: '',
    title: '',
    description: ''
  });
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/memes/${id}`);
        if (!response.ok) {
          throw new Error(`Error fetching meme -> status: ${response.status}`);
        }
        const json = await response.json();
        setMeme({
          imageUrl: json.meme_url,
          title: json.title,
          description: json.description
        });
      } catch (e) {
        setError(e);
      }
    };

    fetchData();
  }, []);


  const deleteMeme = async () => {
    try {
      const response = await fetch(`http://localhost:3001/memes/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error(`Error fetching meme -> status: ${response.status}`);
      }

      navigate('/');
    } catch (err) {
      setError(err);
    }
  }

  return (
    <>
      {meme &&
        <>
          <HeaderContainer>
            <HeaderButton onClick={() => navigate('/create')}>Create New Meme</HeaderButton>
          </HeaderContainer>
          <BodyContainer>
            <MemeDetailsContainer>
              <Img src={meme.imageUrl}/>
              <Title>{meme.title}</Title>
              <Description>{meme.description}</Description>
              <Button onClick={deleteMeme}>Delete Meme</Button>
            </MemeDetailsContainer>
          </BodyContainer>
        </>
      }
      {error &&
        <InfoText>Something went wrong fetching the memes..</InfoText>
      }
    </>
  )
}

export default GetSingleMeme;