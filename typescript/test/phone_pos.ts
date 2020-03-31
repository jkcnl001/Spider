import fs from 'fs'
import path from 'path'
import axios from 'axios';
import cheerio from 'cheerio'
import iconv from 'iconv-lite'
import pify from 'pify'
const max = 18899999973;
const phone_file_path = path.resolve(__dirname, 'phone_pos.txt')
const selector = '#table1 > tbody > tr:nth-child(3) > td:nth-child(1) > div > p:nth-child(2) > font:nth-child(1) > b'
let phone_current = 18800000073;
let data: any;
(async function () {
    data = JSON.parse(fs.readFileSync(phone_file_path).toString())
    while ((data[`${phone_current}`] || data[`${phone_current}`] == '') && phone_current <= max) {
        phone_current += 100
    }
    while (phone_current <= max) {
        await play()
        if ((phone_current - 73) % 1000000 == 0) {
            saveFile()
        }
    }
    saveFile()
})()
async function play() {
    const url = `https://www.00cha.com/114.asp?t=${phone_current}`
    const html: any = await getHtml(url, 'gb2312')
    const city = getElement(html, selector)?.text()
    if (typeof city === 'string') {
        data[`${phone_current}`] = city.replace(/\s*/g, "")
        console.log((phone_current - 18800000073) / 100)
        console.log(phone_current, city)
        phone_current += 100
    }
}
async function sleep(time: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time * 1000)
    })
}
async function saveFile() {
    await pify(fs.writeFile)(phone_file_path, JSON.stringify(data, null, 4))
    console.log('saveFile : ',phone_current)
}
function getElement(html: any, selector: string) {
    try {
        const $ = cheerio.load(html, { decodeEntities: false })
        return $(selector)
    } catch (e) {
        console.log(e)
    }
}
async function getHtml(url: string, encode = 'utf-8') {
    try {
        const res = await axios({
            url,
            responseType: 'stream',
            headers: {
                'User-agent': 'Baiduspider'
            },
            timeout: 10000
        })
        return new Promise(resolve => {
            const chunks: any[] = []
            res.data.on('data', (chunk: any) => chunks.push(chunk))
            res.data.on('end', () => {
                const buffer = Buffer.concat(chunks)
                const str = iconv.decode(buffer, encode)
                resolve(str)
            })
        })
    } catch (e) {
        console.error(e)
    }
}