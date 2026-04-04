import React from 'react';
import styled from 'styled-components';

// Styled-components — because the intern liked them
const Container = styled.div`
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 8px;
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Chip = styled.button`
  padding: 6px 14px;
  border-radius: 20px;
  border: 1px solid #ddd;
  background: ${(props) => (props.$active ? '#667eea' : 'white')};
  color: ${(props) => (props.$active ? 'white' : '#333')};
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    border-color: #667eea;
  }
`;

const RemoveBtn = styled.span`
  font-size: 12px;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;

function FavoritesList({ favorites, activeCity, onSelect, onRemove }) {
  if (favorites.length === 0) return null;

  return (
    <Container>
      <Title>Saved Locations</Title>
      <List>
        {favorites.map((fav) => (
          <Chip
            key={`${fav.latitude}-${fav.longitude}`}
            $active={activeCity && activeCity.name === fav.name}
            onClick={() => onSelect(fav)}
          >
            {fav.name}
            <RemoveBtn
              onClick={(e) => {
                e.stopPropagation();
                onRemove(fav);
              }}
            >
              ✕
            </RemoveBtn>
          </Chip>
        ))}
      </List>
    </Container>
  );
}

export default FavoritesList;
