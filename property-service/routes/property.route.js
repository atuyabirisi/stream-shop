import express from "express";
import multer from "multer";
import {
  createProperty,
  getProperties,
  getProperty,
} from "../controllers/property.controller.js";

const router = express.Router();

const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 },
});

router.post("/", multerUpload.array("images", 10), createProperty);
router.get("/", getProperties);
router.get("/:id", getProperty);

export default router;
