const mongoose = require("mongoose");

const poolSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  instructions: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  amenities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenity",
    },
  ],
  isRestRoomAvailable: {
    type: Boolean,
    required: true,
  },
  restRoomDescription: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  additionalAmenities: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  furniture: [
    {
      name: {
        type: String,
        default: "Umbrella",
        enums: ["Umbrella"],
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    {
      name: {
        type: String,
        default: "Lounge Chairs",
        enums: ["Lounge Chairs"],
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    {
      name: {
        type: String,
        default: "Lunch Table",
        enums: ["Lunch Table"],
      },
      count: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
  ],
  poolArea: {
    length: {
      type: Number,
      required: true,
      min: 0,
    },
    width: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  poolDepth: {
    shallowestPoint: {
      type: Number,
      min: 0,
    },
    deepestPoint: {
      type: Number,
      min: 0,
    },
  },
  charge: {
    type: Number,
    enum: [15, 30, 45, 60],
    required: true,
  },
  weeklyDiscount: {
    type: Number,
    enum: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50],
  },
  maxGuest: {
    type: Number,
    enum: [5, 10, 15, 20, 25, 30],
    required: true,
  },
  extraGuestFee: {
    type: Number,
    enum: [1, 3, 5, 10],
    required: true,
  },
  maxPoolCapacity: {
    type: Number,
    required: true,
    max: 999,
  },
  allowChildren: {
    type: Boolean,
    required: true,
  },
  allowInfants: {
    type: Boolean,
    required: true,
  },
  poolPrivacy: {
    type: String,
    enum: ["Not Too Private", "Pretty Private", "Super Private"],
    required: true,
  },
  poolRules: {
    noParty: {
      type: Boolean,
    },
    noSmoking: {
      type: Boolean,
    },
    noAlcohol: {
      type: Boolean,
    },
    noGlass: {
      type: Boolean,
    },
    noLoudMusic: {
      type: Boolean,
    },
    noFood: {
      type: Boolean,
    },
    noPets: {
      type: Boolean,
    },
  },
  additionalRules: {
    type: String,
    minlength: 5,
    maxlength: 255,
  },
  cancellationPolicy: {
    type: String,
    enum: ["Really Chilled Out", "Chilled Out", "Not Chilled"],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Pool = mongoose.model("Pool", poolSchema);

module.exports = Pool;
