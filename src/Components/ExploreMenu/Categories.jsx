import React from 'react';

const Categories = ({ category, setCategory }) => {
    const categories = [
        { name: 'Fruits', img: "/categories/Fruits.jpg" },
        { name: 'Vegetables', img: '/categories/Veges.jpg' },
        { name: 'Street Food', img: '/categories/StreetFood.jpg' },
        { name: 'Juices', img: '/categories/Juices.jpg' },
        { name: 'Dairy', img: '/categories/Dairy.jpg' },
    ];

    return (
        <div className="px-4 py-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Explore Our Menu</h2>
            <p className="mb-8 text-center">
                Choose from a diverse array of items featuring local specialties. Our mission is to satisfy all your needs while celebrating the heart of the city: Hawkers.
            </p>
            <div className="flex flex-wrap justify-center gap-8">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center cursor-pointer"
                        onClick={() => setCategory(prev => prev === cat.name ? "All" : cat.name)}
                    >
                        <img
                            className={`h-24 w-24 rounded-full object-cover ${category === cat.name ? "border-4 border-tomato-600" : ""}`}
                            src={cat.img}
                            alt={cat.name}
                        />
                        <h3 className="mt-2 text-lg font-semibold">{cat.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
