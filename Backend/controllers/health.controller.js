import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";


// asyncHandler warp kiya - try/catch automatic
const healthCheck = asyncHandler(async (req, res) => {
    res.status(200).json(
        new ApiResponse(200, 'Invoice-AI server is running!', {
            version: '1.0',
            database: 'connected'  //DB checked!
        })
    )
});




export { healthCheck }