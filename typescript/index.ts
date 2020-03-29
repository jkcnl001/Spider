import SpiderOptions from './interfaces/SpiderOptions'
import http from 'http'
export default class Spider {
    options: SpiderOptions
    constructor(options: SpiderOptions = { url: "", method: 'GET' }) {
        this.options = options
        this.start()
    }
    start() {
        const req = http.request(this.options.url, {
            headers: this.options.headers,
            method: this.options.method
        }, (res: any) => {
            const chunks: any[] = []
            res.on('data', (chunk: any) => { chunks.push(chunk) })
            res.on('end', () => {
                const data = Buffer.concat(chunks).toString('utf-8')
                console.log(data)
            })
        })
        req.end()
    }
} 