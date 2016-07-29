var Imagemin = require("imagemin")

var min = function(data, options, cb) {
  var imagemin = new Imagemin()
        .src(data)
        .use(Imagemin.gifsicle({interlaced: options.interlaced}))
        .use(Imagemin.jpegtran({progressive: options.progressive}))
        .use(Imagemin.optipng({optimizationLevel: options.optimizationLevel}))
        .use(Imagemin.svgo({
          plugins: options.svgoPlugins || [],
          multipass: options.multipass
        }))

  imagemin.run((err, files) => {
    if (err) {
      console.error('imagemin error in ' + err)

      return
    }

    cb(null, {code: files[0].contents})
  })
}

module.exports = function imagemin() {
  this.filter('imagemin', function(data, options) {
    return this.defer(min)(data, options)
  })
}

