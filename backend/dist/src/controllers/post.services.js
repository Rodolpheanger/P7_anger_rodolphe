"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceDeletePost = exports.serviceUpdatePost = exports.serviceGetPostsByAuthor = exports.serviceGetOnePost = exports.serviceGetAllPosts = exports.serviceCreatePost = void 0;
const database_1 = require("../../config/database");
const post_utils_1 = require("../utils/post.utils");
const uploads_utils_1 = require("../utils/uploads.utils");
const user_utils_1 = require("../utils/user.utils");
const serviceCreatePost = async (req) => {
    const userUid = req.userUid;
    const { content, title } = req.body;
    const postImgUrl = (0, uploads_utils_1.createPostImgUrl)(req);
    const userDatas = await (0, user_utils_1.checkIfUserExistAndGetDatas)(req, userUid);
    const userId = userDatas.u_id;
    if (req.headers["content-type"].includes("multipart") &&
        req.file === undefined) {
        throw Error("no file");
    }
    return new Promise((resolve, reject) => {
        const reqCreatePost = `INSERT INTO posts (p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_fk_user_id) VALUES (UUID(), "${content}", "${postImgUrl}", NOW(), "${title}", ${userId}) `;
        database_1.db.query(reqCreatePost, (err) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(true);
        });
    });
};
exports.serviceCreatePost = serviceCreatePost;
const serviceGetAllPosts = () => {
    return new Promise((resolve, reject) => {
        const reqGetAllPosts = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id =  u_id ORDER BY p_creation_date DESC`;
        database_1.db.query(reqGetAllPosts, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
        });
    });
};
exports.serviceGetAllPosts = serviceGetAllPosts;
const serviceGetOnePost = (req) => {
    return new Promise((resolve, reject) => {
        const reqGetOnePost = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM posts INNER JOIN users ON p_fk_user_id = u_id WHERE p_uid = "${req.params.id}"`;
        database_1.db.query(reqGetOnePost, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows[0]);
        });
    });
};
exports.serviceGetOnePost = serviceGetOnePost;
const serviceGetPostsByAuthor = (req) => {
    return new Promise((resolve, reject) => {
        const reqGetPostsByAuthor = `SELECT p_uid, p_content, p_post_img_url, p_creation_date, p_title, p_modification_date, u_username FROM users INNER JOIN posts ON u_id = p_fk_user_id WHERE u_uid = "${req.body.author}"`;
        database_1.db.query(reqGetPostsByAuthor, (err, rows) => {
            err ? (console.log(err), reject(Error("query error"))) : resolve(rows);
        });
    });
};
exports.serviceGetPostsByAuthor = serviceGetPostsByAuthor;
const serviceUpdatePost = async (req) => {
    const postUid = req.params.id;
    const { content, title } = req.body;
    const postDatas = await (0, post_utils_1.checkIfPostExistAndGetDatas)(req, postUid);
    const postOwner = postDatas.u_uid;
    const postId = postDatas.p_id;
    const oldPostImgUrl = postDatas.p_post_img_url;
    if (req.headers["content-type"].includes("multipart") &&
        req.file === undefined) {
        throw Error("no file");
    }
    if (postOwner === req.userUid) {
        const postImgUrl = (0, uploads_utils_1.setPostImgUrl)(req, oldPostImgUrl);
        console.log("1");
        return new Promise((resolve, reject) => {
            const reqUpdatePost = `UPDATE posts SET p_content = '${content}', p_post_img_url = '${postImgUrl}',p_title = '${title}' WHERE p_id = ${postId}`;
            database_1.db.query(reqUpdatePost, (err) => {
                err ? (console.log(err), reject(Error("query error"))) : resolve(true);
            });
        });
    }
    else {
        if (req.file) {
            (0, uploads_utils_1.deleteNewImageOnServer)(req);
            throw Error("forbidden");
        }
        else {
            throw Error("forbidden");
        }
    }
};
exports.serviceUpdatePost = serviceUpdatePost;
const serviceDeletePost = async (req) => {
    const postUid = req.params.id;
    const postDatas = await (0, post_utils_1.checkIfPostExistAndGetDatas)(req, postUid);
    const postOwner = postDatas.u_uid;
    const postId = postDatas.p_id;
    const postImgUrl = postDatas.p_post_img_url;
    if (postOwner === req.userUid) {
        return new Promise((resolve, reject) => {
            const reqDeletePost = `DELETE FROM posts WHERE p_uid = ${postId}`;
            database_1.db.query(reqDeletePost, (err) => {
                err
                    ? (console.log(err), reject(Error("query error")))
                    : ((0, uploads_utils_1.deleteOldPostImageOnServer)(postImgUrl), resolve(true));
            });
        });
    }
    else {
        throw Error("forbidden");
    }
};
exports.serviceDeletePost = serviceDeletePost;
//# sourceMappingURL=post.services.js.map