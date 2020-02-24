import MacchiatoCoffee from "../assets/images/coconut-milk-macchiato.webp";
import CinamonLatteCoffee from "../assets/images/cinamon-latte.webp";
import VainillaBrewCoffee from "../assets/images/vainilla-cold-brew.webp";

export const previewProducts = [
    {
        id: Date.now(),
        image: 'https://images.unsplash.com/photo-1542729779-11d8fe8e25f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80',
        title: 'Caramel latte with pumpkin',
        subtitle: 'New summer offer'
    },
    {
        id: Date.now(),
        image: 'https://images.unsplash.com/photo-1546815670-5c5e437ffc6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        title: 'Barista courses',
        subtitle: 'Become a professional coffeemaker'
    },
    {
        id: Date.now(),
        image: 'https://images.unsplash.com/photo-1560867615-41120b242193?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjU2MDh9&auto=format&fit=crop&w=1000&q=80',
        title: 'Starbucks coffee yo your office',
        subtitle: 'From $230 per month'
    },
];


export const productOffers = [
    {
        id: "product1",
        size: "Tall",
        title: "Coconut Milk Mocha Macchiato",
        price: "4.35",
        image: MacchiatoCoffee,
    },
    {
        id: "product2",
        size: "Grande",
        title: "Cinamon Latte with Whipped Cream",
        price: "5.10",
        image: CinamonLatteCoffee,
    },
    {
        id: "product3",
        size: "Venti",
        title: "Vanilla Sweet Cream Cold Brew",
        price: "4.80",
        image: VainillaBrewCoffee,
    },
]