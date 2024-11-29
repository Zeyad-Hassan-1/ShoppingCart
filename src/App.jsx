import React, {useEffect, useState, Component} from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import {BsCart} from "react-icons/bs";
import './index.css';

function App() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState(null);
    const [cart, setCart] = useState([]);

    const addToCart = (number, title, image, description, price) => {
        setCount(count + number);
        setCart([...cart, {title: title, image: image, description: description, price: price, number: number}]);
    };
    console.log(cart);
    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => console.log(err));
    }, []);

    return (
        <Router>
            <div className="bg-amber-50 min-h-screen">
                <Navbar count={count}/>
                <Routes>
                    <Route path="/" element={<Home addToCart={addToCart} data={data}/>}/>
                    <Route path="/cart" element={<Cart count={count} cart={cart}/>}/>
                </Routes>
            </div>
        </Router>
    );
}

function Navbar({count}) {
    return (
        <div
            className="navbar glass shadow-xl mb-4 sticky z-10 top-0 text-black flex flex-col md:flex-row md:justify-between">
            <div className="flex justify-between w-full md:w-auto">
                <Link to="/" className="btn btn-ghost text-xl">shoppingCart</Link>
                <div className="md:hidden flex items-center">
                    <Link to="/cart">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <BsCart className="h-5 w-5"/>
                                <span className="badge badge-sm indicator-item">{count}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="font-bold hidden md:flex">
                <Link to="/" className="tab text-black">Home</Link>
                <Link to="/cart" className="tab text-black">Cart</Link>
            </div>
            <div className="flex-none hidden md:flex">
                <div className="dropdown dropdown-end">
                    <Link to="/cart">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <BsCart className="h-5 w-5"/>
                                <span className="badge badge-sm indicator-item">{count}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function Home({addToCart, data}) {


    if (!data) {
        return (
            <div>
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        )
    }

    return (
        <>
            <Carousel className="w-4/5 m-auto" autoPlay={true} infiniteLoop={true}>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""/>
                </div>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1487744480471-9ca1bca6fb7d?q=80&w=1791&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=''/>
                </div>
            </Carousel>
            <div className="grid w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((item, index) => (
                    <Card key={index} addToCart={addToCart} title={data[index].title} image={data[index].image}
                          description={data[index].description} price={data[index].price}/>
                ))}
            </div>
        </>
    );
}

function Cart({count, cart}) {
    if (cart.length === 0) {
        return (
            <div>
                <span className="loading loading-ball loading-xs"></span>
                <span className="loading loading-ball loading-sm"></span>
                <span className="loading loading-ball loading-md"></span>
                <span className="loading loading-ball loading-lg"></span>
            </div>
        )
    }


    return (
        <div className="p-4 text-black">
            <h1 className="text-2xl font-bold">Cart</h1>
            <p>Total items in cart: {count}</p>
            <br></br>
            <div className="grid grid-cols-1 gap-4">
                {cart.map((item, index) => (
                    <CardInCart key={index} title={cart[index].title} image={cart[index].image}
                                description={cart[index].description} price={cart[index].price}
                                number={cart[index].number}/>
                ))}
            </div>
        </div>
    );
}

function Card({addToCart, title, image, description, price}) {
    const [number, setNumber] = useState(1);

    return (
        <div className="card card-compact glass w-fit shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Shoes"
                    className="max-h-96"
                />
            </figure>
            <div className="card-body text-black">
                <h2 className="card-title">{title}</h2>
                <p className="line-clamp text-gray-500" style={{WebkitLineClamp: 2}}>{description}</p>
                <div className="card-actions justify-between items-center">
                    <div className="flex items-center gap-2">
                        <button
                            className="btn bg-white border-green-500"
                            onClick={() => setNumber(Math.max(1, number - 1))}
                        >
                            -
                        </button>
                        <p>{number}</p>
                        <button
                            className="btn bg-white border-green-500"
                            onClick={() => setNumber(number + 1)}
                        >
                            +
                        </button>
                    </div>
                    <p>{price} $ </p>
                    <button
                        onClick={() => {
                            addToCart(number, title, image, description, price)
                        }}
                        className="btn btn-primary bg-amber-50 border-green-400"
                    >
                        Add to Cart <BsCart/>
                    </button>
                </div>
            </div>
        </div>
    );
}

function CardInCart({title, image, description, price, number}) {
    return (
        <div className="card lg:card-side glass shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="Album"
                    className="max-h-96"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <div className="card-actions justify-between">
                    <div>
                        <p>{price} $</p>
                        <p>number of product : {number}</p>
                    </div>
                    <button className="btn btn-primary">Buy</button>
                </div>
            </div>
        </div>
    )
}

export default App;
