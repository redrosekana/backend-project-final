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
const jwt = __importStar(require("jsonwebtoken"));
//* import model
const user_facebook_1 = __importDefault(require("../model/user-facebook"));
function GatewayFacebook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const existFacebookMember = yield user_facebook_1.default.findOne({ "facebookId": { $eq: req.user.facebookId } });
            if (!existFacebookMember) {
                const addInfo = {
                    facebookId: req.user.facebookId,
                    facebookName: req.user.facebookName
                };
                yield user_facebook_1.default.create(addInfo);
            }
            const secret_accessToken = process.env.SECRET_ACCESSTOKEN;
            const secret_refreshToken = process.env.SECRET_REFRESHTOKEN;
            const payload = req.user;
            const accessToken = jwt.sign(payload, secret_accessToken, {
                "algorithm": "HS256",
                expiresIn: "10000ms"
            });
            //"10000ms"
            //"1800000ms"
            const refreshToken = jwt.sign(payload, secret_refreshToken, {
                "algorithm": "HS256",
                expiresIn: "20000ms"
            });
            //"20000ms"
            //"2700000ms"
            const url_gateway = process.env.GATEWATFACEBOOK;
            res.redirect(`${url_gateway}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ "message": "occurred error in server" });
        }
    });
}
exports.default = GatewayFacebook;
