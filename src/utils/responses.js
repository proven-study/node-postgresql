const getStatusDescription = (status) => {
  switch (status) {
    case 200:
      return "Ok";
    case 201:
      return "Created";
    case 204:
      return "No Content";
    case 304:
      return "Not Modified";
    case 400:
      return "Bad Request";
    case 401:
      return "Unauthorized";
    case 403:
      return "Forbidden";
    case 404:
      return "Not Found";
    case 500:
      return "Internal Server Error";
    default:
      return "";
  }
};

const response = (res, status, message, data) => {
  const success = (status >= 200 && status < 300) || status === 304;

  const isObject = (data) => {
    return !!data && data.constructor === Object;
  };

  const results = {
    status: success ? "success" : "error",
    statusCode: status,
    statusDescription: getStatusDescription(status),
    message: isObject(message) ? [message] : message,
    data: data || null,
  };

  res.status(status).json(results);
};

module.exports = response;
