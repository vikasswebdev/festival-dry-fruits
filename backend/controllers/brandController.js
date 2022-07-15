import asyncHandler from "express-async-handler";
import Brand from "../models/brandModel.js";
import slugGenerate from "../utils/slugGenerate.js";

export const addBrand = asyncHandler(async (req, res) => {
  const brand = new Brand({
    name: req.body.name,
    slug: slugGenerate(req.body.name),
    description: req.body.description,
    image: req.body.image,
    isActive: req.body.isActive,
  });

  await brand.save();
  res.status(201).json({ success: true, data: brand });
});
