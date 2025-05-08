import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

import { MemeCard } from '../components';

type MemeItem = {
  id: number
  meme_url: string,
  title: string,
  description: string
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 110px;
  padding: 30px 40px;
`;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;
  width: 100%
`;

const MemesContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
`;

const InfoText = styled.strong`
  margin-top: 7%;
  font-size: xx-large;
`;

const Button = styled.button`
  cursor: pointer;
  font-size: large;
  font-weight: 600;
`;

function MemesHome() {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/memes');
        if (!response.ok) {
          throw new Error(`Error fetching memes -> status: ${response.status}`);
        }
        const json = await response.json();
        setMemes(json);
      } catch (e) {
        setError(e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <HeaderContainer>
        <Button onClick={() => navigate('/create')}>Create New Meme</Button>
      </HeaderContainer>
      <BodyContainer>
        {!memes.length ?
          <InfoText>No Memes To Display! Try creating a new meme!</InfoText>
        :
          <MemesContainer>
            {memes.map((current: MemeItem) => (
              <MemeCard
                key={current.id}
                id={current.id}
                imageUrl={current.meme_url}
                title={current.title}
                description={current.description}
              />
            ))}
          </MemesContainer>
        }
        {error &&
          <InfoText>Something went wrong fetching the memes..</InfoText>
        }

      </BodyContainer>
    </>
  )
}

export default MemesHome;