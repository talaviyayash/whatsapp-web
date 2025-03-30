const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: true });
    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }
};

export default validate;
