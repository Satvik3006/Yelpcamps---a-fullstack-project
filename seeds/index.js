const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');

const { places, descriptors } = require('./seedhelpers')

mongoose.connect('mongodb://127.0.0.1:27017/yelpcamps ');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once('open', () => {
    console.log("Database connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)]


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6486b419a9b45e274a64339b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam dolore sequi ut praesentium optio, sunt fugit perferendis ratione ad id voluptatum quaerat aspernatur non, tempora corporis, distinctio minus libero perspiciatis',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },

            images: [
                {
                    url: 'https://res.cloudinary.com/dd82gmora/image/upload/v1686850243/YelpCamp/g21we0nh8gfmd24mccrn.jpg',
                    filename: 'YelpCamp/g21we0nh8gfmd24mccrn',
                },
                {
                    url: 'https://res.cloudinary.com/dd82gmora/image/upload/v1686850242/YelpCamp/cs5sdbqh2wu4qgj8cy1l.jpg',
                    filename: 'YelpCamp/cs5sdbqh2wu4qgj8cy1l',
                }
            ]

        })
        await camp.save()
    }
}

seedDB();