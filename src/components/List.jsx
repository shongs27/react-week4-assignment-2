import React from 'react';

import Restaurant from './Restaurant';

export default function List({ restaurants }) {
  if (restaurants.length === 0) {
    return null;
  }

  return (
    <ol>
      {restaurants.map((restaurant) => (
        <Restaurant
          key={`${restaurant.id}^${Date.now()}`}
          name={restaurant.name}
          category={restaurant.category}
          address={restaurant.address}
        />
      ))}
    </ol>
  );
}