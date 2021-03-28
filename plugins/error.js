export default ({ app }, inject) => {
  inject('errorMessage', (call, message404, message500) => {
    if (!call) {
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
