import { Builder, By, Key, until } from 'selenium-webdriver'
(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
        await driver.get('https://www.lagou.com');
        await driver.findElement(By.css('#changeCityBox .clearfix .tab:nth-of-type(1)')).click()
        await driver.findElement(By.id('search_input')).sendKeys('cocos creator', Key.RETURN);
        let items = await driver.findElements(By.css('.item_con_list .con_list_item'))
        console.log(items, items.length)
        for (let i = 0, length = items.length; i < length; i++) {
            let item = items[i]
            console.log(await item.getText())
        }
        // await driver.findElement(By.css('#body-box > #body-btn'))?.click()
        // await driver.wait(until.titleIs('黑马程序员_百度搜索'), 1000); //验证搜索是否成功
    } finally {
        // await driver.quit();
    }
})();