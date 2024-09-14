// src/Components/Home.jsx
import React, { lazy, Suspense } from 'react';
import Categories from "./ExploreMenu/Categories";

const FoodDisplay = lazy(() => import('./ExploreMenu/FoodDisplay'));

const Home = ({ category, setCategory }) => {
  return (
    <>
      <div className="home-container">
        <Suspense fallback={<div className='loading-screen'>Loading...</div>}>
          <Categories category={category} setCategory={setCategory} />
          <FoodDisplay category={category} />
        </Suspense>
      </div>
    </>
  );
}

export default Home;
