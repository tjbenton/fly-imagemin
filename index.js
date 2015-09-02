const Imagemin = require("imagemin")

let min = function(data, options, cb) {
  let imagemin = new Imagemin()
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
      console.error(`imagemin error in ${err}`)

      return
    }

    cb(null, {code: files[0].contents})
  })
}

export default function () {
  this.filter("imagemin", (data, options) => {
    return this.defer(min)(data, options)
  })
}
