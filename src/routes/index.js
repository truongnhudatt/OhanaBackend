const express = require("express")
const route = express.Router()

const _ = require("lodash")
const faker = require("faker")
const Room = require("../models/room.model")
const mongoose = require("mongoose")
const roomTypes = ['Kí túc xá', 'Phòng cho thuê', 'Phòng ở ghép', 'Nhà nguyên căn', 'Căn hộ'];
const genders = ['Tất cả', 'Nam', 'Nữ'];
const utilities = ['WC riêng', 'Chỗ để xe', 'Cửa sổ', 'An ninh', 'Wifi', 'Tự do', 'Chủ riêng', 'Máy lạnh', 'Máy nước nóng', 'Nhà bếp', 'Tủ lạnh', 'Máy giặt', 'Gác lửng', 'Giường', 'Tủ đồ', 'TV', 'Thú cưng', 'Ban công'];
const VIETNAM_BOUNDS = {
    // SouthWest (long, lat)
    sw: [102.1446, 8.3832],
    // NorthEast (long, lat)
    ne: [109.4693, 23.3924],
  };
const createFakeRoom =() => {
    const roomType = _.sample(roomTypes);
    const roomCount = faker.random.number({ min: 1, max: 5 });
    const roomCapacity = faker.random.number({ min: 1, max: 10 });
    const gender = _.sample(genders);
    const area = faker.random.number({ min: 20, max: 100 });
    const price = faker.random.number({ min: 100000, max: 10000000 });
    const deposit = faker.random.number({ min: 100000, max: 5000000 });
    const electricityFee = faker.random.number({ min: 0, max: 500000 });
    const waterFee = faker.random.number({ min: 0, max: 50000 });
    const internetFee = faker.random.number({ min: 0, max: 100000 });
    const parking = faker.random.boolean();
    const parkingFee = parking ? faker.random.number({ min: 10000, max: 500000 }) : 0;
    const city = faker.address.city();
    const district = faker.address.county();
    const ward = faker.address.streetName();
    const street = faker.address.streetName();
    const houseNumber = faker.random.number({ min: 1, max: 100 });
    const images = [faker.image.image(), faker.image.image(), faker.image.image(), faker.image.image()];
    const selectedUtilities = _.sampleSize(utilities, faker.random.number({ min: 3, max: 10 }));
    const phoneNumber = faker.phone.phoneNumber();
    const title = faker.lorem.sentence();
    const description = faker.lorem.paragraph();
    const owner = "645e514b1b5a4c59d2783a89";
    const [minLon, minLat] = VIETNAM_BOUNDS.sw;
    const [maxLon, maxLat] = VIETNAM_BOUNDS.ne;
    const longitude = faker.random.number({ min: minLon * 1000, max: maxLon * 1000 }) / 1000;
    const latitude = faker.random.number({ min: minLat * 1000, max: maxLat * 1000 }) / 1000;
    const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
    };
    const isAvailable = faker.random.boolean();
    return {
        roomType,
        roomCount,
        roomCapacity,
        gender,
        area,
        price,
        deposit,
        electricityFee,
        waterFee,
        internetFee,
        parking,
        parkingFee,
        city,
        district,
        ward,
        street,
        houseNumber,
        images,
        utilities: selectedUtilities,
        phoneNumber,
        title,
        description,
        owner,
        location,
        isAvailable
    };
};

const createFakeRooms = async (numRooms) => {
    const fakeRooms = _.times(numRooms, createFakeRoom);
    console.log(fakeRooms);
    // await Room.create(fakeRooms)
    await Room.insertMany(fakeRooms);
}
// createFakeRooms(100)

route.use("/api/v1", require("./access"))
route.use("/api/v1", require("./room"))
module.exports = route