const Room = require("../models/room.model");
const geolib = require('geolib');
const { getDistanceFromLatLonInKm, deg2rad } = require("../helpers/cal");
const mongoose = require("mongoose");
class RoomService {

    static createRoom = async ({ roomType, roomCount, gender, area, price, deposit, electricityFee, waterFee,
        internetFee, parking, city, district, ward, street, houseNumber, utilities,
        phoneNumber, title, description, longitude, latitude },
        images, userId) => {

        try {
            const newRoom = await new Room({
                roomType, roomCount, gender, area, price, deposit, electricityFee, waterFee,
                internetFee, parking, city, district, ward, street, houseNumber, utilities,
                phoneNumber, title, description, location: { type: 'Point', coordinates: [longitude, latitude] }, images: images, owner: userId
            }).save()
            return newRoom;
        } catch (error) {
            console.error(error);
        }

    }

    static findAll = async({ page, limit}) => {
        try {
            const rooms = await Room.find({isAvailable: true}, "-__v -location -updatedAt ").skip((page - 1) * limit).limit(limit).lean()
            const total = (await Room.countDocuments({isAvailable: true}))
            const pages = Math.round(total / limit) + 1
            const offset = rooms.length
            return {
                rooms,
                total,
                page,
                limit,
                pages,
                offset,
                hasMorePage: total - (pages-1)*limit - offset !== 0 ? true : false
            }
        } catch (error) {
            console.error(error);
        }
    }

    static nearby = async ({ page, limit, longitude, latitude, maxDistance }) => {
        try {
            const pageNum = parseInt(page) || 1;
            const limitNum = parseInt(limit) || 10;
            const rooms = await Room.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [parseFloat(longitude), parseFloat(latitude)],
                        },
                        $maxDistance: maxDistance,
                        distanceField: 'distance',
                        spherical: true,
                    },
                },
                {
                    $match: {
                        isAvailable: true,
                    }
                },
                {
                    $addFields: {
                        distanceInKm: { $divide: ['$distance', 1000] }, // chuyển đổi sang km
                    },
                },
                {
                    $project: {
                        "location": 0,
                        "__v": 0,
                        "updatedAt": 0,
                        "distance": 0,
                    }
                },
                {
                    $skip: (pageNum - 1) * limit
                },
                {
                    $limit: limitNum,
                }
            ])
            return rooms
        } catch (error) {
            console.error(error);
        }
    }

}
module.exports = RoomService