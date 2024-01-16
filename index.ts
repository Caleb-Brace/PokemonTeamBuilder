import { launch } from "puppeteer";
import { Browser } from 'puppeteer';

const puppeteer = require('puppeteer');

const url = 'https://victoryroadvgc.com/sv-rental-teams/'

let pokeData: any = [];
let constData: any = [];

const main = async () => {
    const browser = await puppeteer.launch({headless: true})
    
    const page = await browser.newPage()
    await page.goto(url)

    let teamData = await page.evaluate(() => {

        // const pokePod = Array.from(document.querySelectorAll('.table-team-wrapper'))
        // const pokeTable = Array.from(document.querySelectorAll('.infobox2.sortable tr'))
        const pokeRef = Array.from(document.querySelectorAll('a[href]'))
        
        // const data = pokeRef.map((mon: any) => ({
            
        //         name: mon.getAttribute('href')
        //         //backName: mon.querySelector('img').getAttribute('title')
        //     }))
        //     return data
        // })

        const data = pokeRef.filter(poke => poke.getAttribute('href').startsWith('https://pokepast')).map((mon: any) => ({
            
            url: mon.getAttribute('href')

        }))
        return data
    })
    for(let i = 0; i < 2; i++){

        if (pokeData.length > 0) {
            constData.push(pokeData)}

        await page.goto(teamData[i].url)

        pokeData = await page.evaluate(() => {
            
            const pokeRef = Array.from(document.querySelectorAll('pre'))
            const floatText = Array.from(document.querySelectorAll('article'))

            // const data = pokeRef.map((mon: any) => ({
                
            //     name: mon.querySelector('span')[0],
            //     something: [...mon.querySelectorAll('span')].map( (i:any) => ({
                    
            //         value: i.innerText,
            //         class: i.className,
            //         text: i.nextElementSibling
            //     }) )
            // }))

            const data = floatText.map((mon: any) => ({
                
                 value: [...mon.querySelectorAll('pre')].map( (i:any) => i.innerText.replaceAll('\n', '')
                )
            }))
            return data
        })}
    
    
        for(let k = 0; k < constData[0].length; k++){
            console.log(constData[0][k])}

    // console.log(constData)
    await browser.close()
};

main();