const getSession = async (req, res) => {
  try {
    const user = req.user;

    res.status(200).json({
      success: true,
      message: "User session fetched successfully",
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profileImage: user.profileImage,
          description: user.description,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { getSession };
