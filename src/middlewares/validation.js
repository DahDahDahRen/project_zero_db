import Joi from "joi";

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.string().default("TODO"),
  priority: Joi.string().default("MEDIUM"),
  due_date: Joi.date().required(),
  is_completed: Joi.boolean().default(false),
  created_at: Joi.date().required(),
});

const validation = (req, res, next) => {
  //* Get the body
  const { body } = req;

  console.log(body);

  //! Start validation
  const { error, value } = taskSchema.validate(body);

  //! Error
  if (error) {
    //! Stop adn return a response
    return res.status(404).json({
      message: "🔥 Validation failed!",
      details: error.details[0].message,
      status: 404,
    });
  }

  //* Validation complete proceed to next middleware
  next();
};

export default validation;
