import e from "express";
import CategoryModel from "../models/category.model.js";


// Create a new category
const createCategoryController = async (req, res) => {
    try {
        const{ name, image } = req.body;
        if(!name || !image){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const category = await CategoryModel.create({
            name,
            image,
        }).then((category) => {
            return res.status(200).json({
                success: true,
                message: "Category created successfully",
                error: false,
                data: category,
            });
        }).catch((error) => {
            return res.status(500).json({
                success: false,
                message: "Error in creating category",
                error,
            });
        });
        

        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in creating category",
            error,
        });
        
    }

}
const getcategoryController = async(req, res) => {
    try {
        console.log("heyy");
        const category= await CategoryModel.find({}).then((category) => {
            return res.status(200).json({
                success: true,
                message: "Category fetched successfully",
                error: false,
                data: category,
            });
        }).catch((error) => {
            return res.status(500).json({
                success: false,
                message: "Error in getting category",
                error,
            });
        });
        
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in getting category",
            error,
        });
        
    }
}
const editCategoryController = async (req, res) => {
  try {
    const { _id, name, image } = req.body;
    console.log(_id,name,image);

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      _id,
      { name, image },
      { new: true } // returns the updated document
    );
    console.log(updatedCategory);

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      error: false,
      data: updatedCategory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in editing category",
      error,
    });
  }
};

export{ createCategoryController,getcategoryController,editCategoryController};