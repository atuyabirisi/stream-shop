import express from "express";
import { getAccessToken } from "../services/mpesa.service.js";
import {
  initiateSTKPush,
  mpesaCallback,
} from "../controllers/mpesa.controller.js";

const router = express.Router();

router.post("/", initiateSTKPush);
router.post("/callback", mpesaCallback);

router.get("/", async (req, res) => {
  try {
    const tokenData = await getAccessToken();

    res.status(200).json({
      success: true,
      data: tokenData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.response?.data || error.message,
    });
  }
});

export default router;
