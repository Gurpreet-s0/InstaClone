const postModal = require("../model/post.modal")
const ImageKit = require("@imagekit/nodejs")

const imagekit = new ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})


async function PostController (req,res) {
    console.log(req.body , req.file)

    const file = await imagekit.files.upload({
        file: await ImageKit.toFile(req.file.buffer,'file'),
        fileName:req.file.originalname
    })

    res.send(file)
}


module.exports = {
   PostController: PostController
}