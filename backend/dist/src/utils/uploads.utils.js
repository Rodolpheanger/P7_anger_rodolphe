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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPostImgUrl = exports.deleteOldPostImageOnServer = exports.createPostImgUrl = exports.deleteAvatarImgIfExist = exports.createAvatarUrl = void 0;
const fs = __importStar(require("fs"));
const createAvatarUrl = (req, avatarUrl) => {
    if (req.file) {
        return `${req.protocol}://${req.get("host")}/uploads/avatars/${req.file.filename}`;
    }
    else {
        (0, exports.deleteAvatarImgIfExist)(req, avatarUrl);
        return "";
    }
};
exports.createAvatarUrl = createAvatarUrl;
const deleteAvatarImgIfExist = (req, avatarUrl) => {
    avatarUrl ? deleteAvatarImgOnServer(req, avatarUrl) : true;
};
exports.deleteAvatarImgIfExist = deleteAvatarImgIfExist;
const deleteAvatarImgOnServer = (req, avatarUrl) => {
    const filename = avatarUrl.split("/avatars/")[1];
    fs.unlinkSync(`uploads/avatars/${filename}`);
};
const createPostImgUrl = (req) => {
    if (req.file) {
        return `${req.protocol}://${req.get("host")}/uploads/posts_images/${req.file.filename}`;
    }
    else {
        return "";
    }
};
exports.createPostImgUrl = createPostImgUrl;
const modifyPostImgUrl = (req) => {
    return `${req.protocol}://${req.get("host")}/uploads/posts_images/${req.file.filename}`;
};
const deleteOldPostImageOnServer = (oldPostImgUrl) => {
    const filename = oldPostImgUrl.split("/posts_images/")[1];
    fs.unlinkSync(`uploads/posts_images/${filename}`);
};
exports.deleteOldPostImageOnServer = deleteOldPostImageOnServer;
// TODO voir pour si multipart mais img vide
const setPostImgUrl = (req, oldPostImgUrl) => {
    if (!req.file) {
        return oldPostImgUrl;
    }
    else if (req.file && !oldPostImgUrl) {
        const postImgUrl = (0, exports.createPostImgUrl)(req);
        return postImgUrl;
    }
    else {
        (0, exports.deleteOldPostImageOnServer)(oldPostImgUrl);
        const newPostImgUrl = modifyPostImgUrl(req);
        return newPostImgUrl;
    }
};
exports.setPostImgUrl = setPostImgUrl;
//# sourceMappingURL=uploads.utils.js.map