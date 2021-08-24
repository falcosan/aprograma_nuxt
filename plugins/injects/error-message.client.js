export default ({ app }, inject) => {
  inject('errorMessage', (res, message404, message500) => {
    const ctx = app
    if (!res) {
      ctx.context.error({
        statusCode: 404,
        message: message404
      })
    } else {
      ctx.context.error({
        statusCode: 500,
        message: message500
      })
    }
  })
}
