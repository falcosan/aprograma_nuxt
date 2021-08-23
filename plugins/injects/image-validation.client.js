export default ({ app }, inject) => {
  inject('imageValidation', (source, image = 'image', notImage = false) => {
    return source ? (/(gif|jpe?g|tiff?|png|svg|webp|bmp)/gi).test(source.toLowerCase().split('.').pop()) ? image : notImage : null
  })
}
