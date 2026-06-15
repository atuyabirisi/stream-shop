import Property from "../models/property.model.js";
import uploadImage from "../utilities/cloudinaryapi.js";

async function createProperty(req, res) {
  try {
    const result = await Promise.all(
      req.files.map((file) => uploadImage(file.buffer)),
    );

    const property = await Property.create({
      ...req.body,
      image: result.map((r) => r.secure_url),
    });

    return res.status(201).json({
      success: true,
      message: "Property created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getProperties(req, res) {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("GET PROPERTIES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

async function getProperty(req, res) {
  try {
    const { id } = req.params;

    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    console.error("GET PROPERTY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { createProperty, getProperties, getProperty };
