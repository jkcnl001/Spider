import http from 'http'
export default interface SpiderOptions {
    url: string,
    method?: string,
    headers?: http.OutgoingHttpHeaders,
}