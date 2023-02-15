const messages = {
    400: 'Bad request',
    404: 'Not found'
}

const HttpError = (status, message = messages[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;
