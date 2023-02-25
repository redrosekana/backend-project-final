"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const csv_parser_1 = __importDefault(require("csv-parser"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
// import model
const recommend_guest_1 = __importDefault(require("../model/recommend-guest"));
function RecommendGuest(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // await Recommend_guest.deleteMany({})
        try {
            fs.createReadStream(path.resolve(__dirname, "../../public/csv/item-based.csv"))
                .pipe((0, csv_parser_1.default)())
                .on('data', (data) => __awaiter(this, void 0, void 0, function* () {
                data.recommend = convertStringToArray(data.recommend);
                yield recommend_guest_1.default.create(data);
            }));
            res.status(200).json({ message: "success insert the boardgame for a guest" });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "occurred error in server" });
        }
    });
}
const convertStringToArray = (value) => {
    const tmp1 = value.replace(/^(\"|\')|(\"|\')$|^\[\s*(\'|\")\s*|\s*(\'|\")\s*\]\s*$/ig, "");
    const tmp2 = tmp1.replace(/\s*(\'|\")\s*\,\s*(\'|\")\s*/ig, ",");
    const tmp3 = tmp2.replace(/\s+\,|\,\s+/ig, " ");
    const tmp4 = tmp3.split(",");
    return tmp4;
};
exports.default = RecommendGuest;
