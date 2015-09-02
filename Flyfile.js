export default function* () {
  yield this.clear(__dirname + "test/result/image.jpg")

  yield this
    .source("test/image.jpg")
    .imagemin({
      progressive: true
    })
    .target("test/result")
}
