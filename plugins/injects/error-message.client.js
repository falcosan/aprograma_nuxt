export default ({ app }, inject) => {
  inject('errorMessage', (res, message404, message500) => {
    if (!res) {
      app.context.error({
        statusCode: 404,
        message: message404
      })
    } else {
      app.context.error({
        statusCode: 500,
        message: message500
      })
    }
  })
}
