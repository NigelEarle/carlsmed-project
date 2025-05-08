import styled from 'styled-components';
import { useNavigate } from 'react-router';

type MemeCardProps = {
  id: number
  imageUrl: string
  title: string
  description: string
}

const ClickableContainer = styled.a`
  text-decoration: none;
  cursor: pointer;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  width: 28%;
  padding: 2.5em;
  border-radius: 5px;
  border: lightgrey;
  margin-bottom: 36px;
`;

const Img = styled.img`
  border-radius: 4px;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  color: #2a2a2a;
  // margin-bottom: 5px;
`;

const Description = styled.p`
  color: #2a2a2a;
  font-size: medium;
  font-weight: 400;
  // margin-bottom: 4em;
`;

function MemeCard({
  id,
  imageUrl,
  title,
  description
}: MemeCardProps) {
  const navigate = useNavigate();

  return (
    <ClickableContainer onClick={() => navigate(`/meme/${id}`)}>
      <Img src={imageUrl}/>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </ClickableContainer>
  );
}

export default MemeCard;