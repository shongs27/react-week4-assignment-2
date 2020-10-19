import React from 'react';

import { useSelector } from 'react-redux';

import Restaurants from './Restaurants';

export default function RestaurantsContainer() {
  const { restaurants } = useSelector((state) => ({
    restaurant: state.restaurnt,
  }));
  return (
    <div>
      <Restaurants restaurants={restaurants} />
    </div>
  );
}
