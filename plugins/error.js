export default ({ app }, inject) => {
  inject('errorMessage', (message) => {
    app.context.error({
      statusCode: 404,
      message
    })
  })
}
