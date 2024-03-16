const express = require("express");
const Router = express.Router();

const {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
  } = require("../controllers/chatControllers");

  const { protect } = require("../middleware/authMiddleWare");
  
//   Router.post("/" , protect, accessChat);
//   Router.get("/" , protect, fetchChats);
//   Router.post("/group" , protect, createGroupChat);
//   Router.put("/rename", protect, renameGroup);
//   Router.put("/groupremove",protect, removeFromGroup);
//   Router.put("/groupadd", protect, addToGroup);

module.exports = Router;