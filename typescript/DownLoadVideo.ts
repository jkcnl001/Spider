const ibili = require('ibili')
let url = `https://www.bilibili.com/video/av18109226`
const sessdata = "61a6dd8d%2C1600014626%2C2d798*31"
const max = 10
let index = 0
// for (let i = 1; i < 2; ++i) {
//     url.push(`https://www.bilibili.com/video/av18109226?p=${i}`)
// }
function downLoad(url: string) {
    ibili.downloadVideo({
        url: url,
        folder: "video",
        sessdata: sessdata,
    }).then(() => {
        console.log("1")
    })
}
downLoad(url)


