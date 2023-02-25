"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import library
const mongoose_1 = require("mongoose");
const boardgamesSchema = new mongoose_1.Schema({
    id: { type: String },
    name: { type: String },
    rank: { type: Number },
    geek_rating: { type: Number },
    avg_rating: { type: Number },
    usersrated: { type: Number },
    category: { type: [String] },
    mechanic: { type: [String] },
    weight: { type: Number },
    minplayers: { type: Number },
    maxplayers: { type: Number },
    playingtime: { type: Number },
    minage: { type: Number },
    yearpublished: { type: Number },
    designer: { type: [String] },
    artist: { type: [String] },
    publisher: { type: [String] },
    description: { type: String },
    image: { type: String },
});
const Boardgames = (0, mongoose_1.model)("boardgames", boardgamesSchema);
exports.default = Boardgames;
