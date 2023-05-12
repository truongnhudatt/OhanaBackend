const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const roomSchema = new mongoose.Schema({
    roomType: {
        type: String,
        enum: ['Kí túc xá', 'Phòng cho thuê', 'Phòng ở ghép', 'Nhà nguyên căn', 'Căn hộ'],
        required: true
    },
    roomCount: {
        type: Number,
        required: true
    },
    roomCapacity: {
        type: Number,
        // required: true
    },
    gender: {
        type: String,
        enum: ['Tất cả', 'Nam', 'Nữ'],
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    deposit: {
        type: Number,
        required: true
    },
    electricityFee: {
        type: Number,
        default: 0
    },
    waterFee: {
        type: Number,
        default: 0
    },
    internetFee: {
        type: Number,
        default: 0
    },
    parking: {
        type: Boolean,
        default: false
    },
    parkingFee: {
        type: Number,
        default: 0
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    houseNumber: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        validate: [(images) => images.length >= 4 && images.length <= 20, 'Room should have at least 4 images and at most 20 images'],
        required: true
    },
    utilities: {
        type: [String],
        enum: ['WC riêng', 'Chỗ để xe', 'Cửa sổ', 'An ninh', 'Wifi', 'Tự do', 'Chủ riêng', 'Máy lạnh', 'Máy nước nóng', 'Nhà bếp', 'Tủ lạnh', 'Máy giặt', 'Gác lửng', 'Giường', 'Tủ đồ', 'TV', 'Thú cưng', 'Ban công'],
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true,
        }
    },
    isAvailable: {
        type: Boolean,
        required: true,
        default: true
    },
}, {
    timestamps: true,
    collection: "Rooms"
});
roomSchema.index({ location: '2dsphere' });
roomSchema.plugin(mongoosePaginate)
const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
