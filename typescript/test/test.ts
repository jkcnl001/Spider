// import Spider from './../index'
// new Spider({ url: 'http://www.itcast.cn/news/json/f1f5ccee-1158-49a6-b7c4-f0bf40d5161a.json' })
// new Spider({ url: 'http://web.itheima.com/teacher.html' })
import { Builder, By, Key, until } from 'selenium-webdriver'
(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.baidu.com/');
        await driver.findElement(By.id('kw')).sendKeys('黑马程序员', Key.RETURN);
        await driver.wait(until.titleIs('黑马程序员_百度搜索'), 1000); //验证搜索是否成功
    } finally {
        // await driver.quit();
    }
})();