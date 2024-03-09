import React from 'react';
import { Card, Typography, Button, Divider } from '@mui/material';
import { styled } from '@mui/system';

// Custom styled component for the card container
const FlippableCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  transition: 'transform 0.6s',
  transformStyle: 'preserve-3d',
  cursor: 'pointer',
  '&.flipped': {
    transform: 'rotateY(180deg)',
  },
}));

// Custom styled component for the card face (front and back)
const CardFace = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
}));

interface FlashCardProps {
  question: string;
  answer: string;
}

export default function FlashCard({ question, answer }: FlashCardProps) {
  const [flipped, setFlipped] = React.useState(false);

  const handleToggleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <FlippableCard
      className={flipped ? 'flipped' : ''}
      onClick={handleToggleFlip}
    >
      <CardFace style={{ zIndex: flipped ? 1 : 2 }}>
        <Typography variant='h5' align='center' sx={{ p: 2 }}>
          {question}
        </Typography>
        <Divider />
        <Button variant='text' color='primary' sx={{ mx: 'auto', mt: 2 }}>
          Show Answer
        </Button>
      </CardFace>
      <CardFace
        style={{ transform: 'rotateY(180deg)', zIndex: flipped ? 2 : 1 }}
      >
        <Typography variant='h5' align='center' sx={{ p: 2 }}>
          {answer}
        </Typography>
        <Divider />
        <Button variant='text' color='primary' sx={{ mx: 'auto', mt: 2 }}>
          Show Question
        </Button>
      </CardFace>
    </FlippableCard>
  );
}
