require('../controllers/settings');
require('../controllers/message');

__path = process.cwd();

const { default: axios, isAxiosError } = require("axios");
const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const fetch = require('node-fetch');
const Frieren = require("@xct007/frieren-scraper");
const { diffusion } = require("@xct007/frieren-scraper");
const { downloads } = require('scraper-jsc')
const { search } = require('scraper-jsc')
const { anime } = require('scraper-jsc')
const { news } = require('scraper-jsc')
const { stalk } = require('scraper-jsc')
const snapsave = require("snapsave-downloader2")
const { Wattpad } = require("../scrape/src/others/wattpad");
var lolkilScraper = require('lolkil-scraper')
const { v1, v2 } = require("node-tiklydown");
const ameClient = require("./../scrape/src/others/ameClient");
const ameApi = new ameClient("015e9ee6d55d7ec9b6643c67d0b11487da81cca6d32a221fb4559739705c0d7b50caddfc508fb6fc4bd60f5ece4323b39bd4efeb414c545e192c1facd0fdfb91");
const wattpad = new Wattpad();
const { searching, latest, list, detail } = require("nekopoi-scraper");

// Lib

const {
    fetchJson,
    getBuffer
} = require('../lib/function');


// Database
const {
    limitMin,
    isLimit,
    checkKey
} = require('../database/function');

// Scrape data
const scrape = require('../scrape/index');
// API Key
const keyfree = key_free;
const keypremium = key_premium;

// Features
// AI
router.get("/ai/dall-e", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const q = req.query.q
    if (!q) return res.json(msg.paramquery)
  const caliph = await fetchJson(`https://api.caliph.biz.id/api/openai/dalle?query=${q}&apikey=caliphkey`)
	await getBuffer(caliph.url).then(buffer => {
		res.set({'Content-Type': 'image/png'})
	  res.send(buffer)
	})
    limitMin(apikey);
})
router.get("/ai/remini", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
  const caliph = await fetchJson(`https://api.caliph.biz.id/api/upscale/v2?img=${url}&scale=5&apikey=caliphkey`)
	await getBuffer(caliph.data.img).then(buffer => {
		res.set({'Content-Type': 'image/png'})
	  res.send(buffer)
	})
    limitMin(apikey);
})
router.get('/ai/animediffusion', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
 scrape.others.diffusion.animedif(query).then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get('/ai/animediffusion2', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
 scrape.others.diffusion.animedif2(query).then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get('/ai/stablediffusion', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
 scrape.others.diffusion.stabledif(query).then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get('/ai/stablediffusion2', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
 scrape.others.diffusion.stabledif2(query).then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get('/others/chatgpt', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
  const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
	const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.others.chatgpt(query)
	.then(data => {
    let anu = data
		if (!anu) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: anu
		})
	})
  limitMin(apikey);
})
//Anime
router.get('/anime/mangatoons', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
 scrape.others.xyro.mangatoons(query).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
 limitMin(apikey);
})
router.get('/anime/nhentai-get', async (req, res, next) => {
  const id = req.query.id
	if (!id) return res.json('Masukan IDnya')
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
 scrape.others.xyro.nhentaiScraper(id).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
})
router.get('/anime/nhentai-search', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
 scrape.others.xyro.nhentaisearch(query).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get('/anime/nhentai-detail', async (req, res, next) => {
  const url = req.query.url
	if (!url) return res.json(msg.paramurl)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
 scrape.others.xyro.nhentai(url).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get('/anime/nhentai-getimg', async (req, res, next) => {
  const url = req.query.url
	if (!url) return res.json(msg.paramurl)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
 scrape.others.xyro.nhgetimg(url).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get('/anime/mal-anime', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    anime.MalSearchAnime(query).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
	limitMin(apikey);
})
router.get('/anime/mal-manga', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    anime.MalSearchManga(query).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
	limitMin(apikey);
})
router.get('/anime/hentai', async (req, res, next) => {
const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  xorizn = await fetchJson(`https://xorizn-apis-v1.vercel.app/api/random/hentai`).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
  limitMin(apikey);
})
router.get('/anime/nekopoi', async (req, res, next) => {
const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  xorizn = await fetchJson(`https://xorizn-apis-v1.vercel.app/api/random/nekopoi`).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
  limitMin(apikey);
})
router.get('/anime/character', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  xorizn = await fetchJson(`https://xorizn-apis-v1.vercel.app/api/myanimelist/character?search=${query}`).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
	limitMin(apikey);
})
router.get('/anime/otakudesu-search', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.otakudesu.search(query)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
router.get('/anime/otakudesu-detail', async (req, res, next) => {
	const url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.otakudesu.detail(url)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
router.get('/anime/otakudesu-latest', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.otakudesu.latest()
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
  router.get('/anime/komiku-search', async (req, res, next) => {
    const query = req.query.q
	  if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.komikuId.search(query)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
  router.get('/anime/komiku-detail', async (req, res, next) => {
    const url = req.query.url
	  if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.komikuId.detail(url)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
router.get('/anime/komiku-latest', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.komikuId.latest()
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
 router.get('/anime/doujin-search', async (req, res, next) => {
    const query = req.query.q
	  if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.doujindesu.search(query)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
  router.get('/anime/doujin-detail', async (req, res, next) => {
    const url = req.query.url
	  if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.doujindesu.detail(url)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})
router.get('/anime/doujin-latest', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  Frieren.doujindesu.latest()
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})  
//Sfw
router.get('/sfw/akira', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/akira.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/anna', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/anna.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/asuna', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/asuna.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/ayanokouji', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/ayanokouji.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/ayuzawa', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/ayuzawa.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/bocchi', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/bocchi.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/chisato', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/chisato.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/cosplay', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/cosplay.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/elaina', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/elaina.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/ikuyo', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/ikuyo.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/kaela', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/kaela.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/kaguya', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/kaguya.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/kaori', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/kaori.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/kobo', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/kobo.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/kotori', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/kotori.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/loli', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/loli.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/miku', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/miku.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/neko', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/neko.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/rias', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/rias.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/sakura', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/sakura.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/sasuke', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/sasuke.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/shina', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/shina.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/shinka', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/shinka.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/shizuka', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/shizuka.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/shota', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/shota.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/tekina', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/tekina.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/waifu', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/waifu.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/yotsuba', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/yotsuba.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
router.get('/sfw/yumeko', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/sfw/yumeko.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})
// Stalk
router.get('/stalker/instagram', async (req, res, next) => {
	const username = req.query.username
	if (!username) return res.json('Masukan Usernamenya')
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    xcode = await fetchJson(`https://api-xcoders.site/api/stalk/ig?username=${username}&apikey=Frieren`)
		let result = xcode.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
  limitMin(apikey);
	})
router.get('/stalker/tiktok', async (req, res, next) => {
	const username = req.query.username
	if (!username) return res.json('Masukan Usernamenya')
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    xcode = await fetchJson(`https://api-xcoders.site/api/stalk/tiktok?username=${username}&apikey=Frieren`)
		let result = xcode.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
  limitMin(apikey);
	})
router.get('/stalker/stalkgithub', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    stalk.Github(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get('/stalker/githubrepo', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    stalk.GithubRepo(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
// Others
router.get('/others/heroml', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  xorizn = await fetchJson(`https://xorizn-apis-v1.vercel.app/api/game/detail-hero?search=${query}`).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
  limitMin(apikey);
})
router.get('/others/chargi', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.others.chargi(query).then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get("/others/ssweb", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  await getBuffer(`https://api.apiflash.com/v1/urltoimage?access_key=06ce7f1d5e3d41edaee385b749ef0e33&url=${url}`)
      .then(buffer => {
		res.set({'Content-Type': 'image/png'})
	  res.send(buffer)
	})
    limitMin(apikey);
})
router.get('/others/tts', async(req, res, next) => {
	const text = req.query.text
  if (!text) return res.json('Masukan Textnya')
  const lang = req.query.lang
  if (!lang) return res.json('Masukan Kode Bahasa')
  const apikey = req.query.apikey
	if (!apikey) return res.json(msg.paramkey)
	const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })

	lolkilScraper.convert.gtts(text, lang).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get('/others/voicevox', async (req, res, next) => {
  const query = req.query.q
	if (!query) return res.json(msg.paramquery)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
  const apirandom = ['O096s_7_87q_4-5','x739h-785175886','E-02821-l-1_272']
  var apikeynya = apirandom[Math.floor(Math.random() * apirandom.length)];
    result = await fetch(`https://deprecatedapis.tts.quest/v2/voicevox/audio/?key=${apikeynya}&speaker=3&pitch=0&intonationScale=1&speed=1&text=${query}`).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/voice.mp3', result)
    res.sendFile(__path +'/tmp/voice.mp3')
  limitMin(apikey);
	})
// Downloader
router.get('/downloader/youtube-short', async (req, res, next) => {
	const url = req.query.url
	if (!url) return res.json(msg.paramurl)
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    xcode = await fetchJson(`https://api-xcoders.site/api/download/yt-short?url=${url}&apikey=Frieren`)
		let result = xcode.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
  limitMin(apikey);
	})
router.get('/downloader/igstory', async (req, res, next) => {
	const query = req.query.query
	if (!query) return res.json('Masukan Usernamenya')
  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    xcode = await fetchJson(`https://api-xcoders.site/api/download/ig-story?username=${query}&apikey=Frieren`)
		let result = xcode.data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
  limitMin(apikey);
	})
router.get('/downloader/spotify', async (req, res, next) => {
	const url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    
    scrape.downloader.download.spotifyDown(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get('/downloader/xnxx', async (req, res, next) => {
	const url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.download.xnxxDownloader(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get('/downloader/youtube-play', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.youtube.play(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
	limitMin(apikey);
})

router.get('/downloader/youtube-play-audio', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.youtube.playaudio(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/youtube-play-video', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.youtube.playvideo(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/youtube-audio', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.youtube.audio(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/youtube-video', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.youtube.video(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/tiktok', async (req, res, next) => {
  const url = req.query.url
	if (!url) return res.json(msg.paramurl)
const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
  xorizn = await fetchJson(`https://xorizn-downloads.vercel.app/api/downloads/tiktok?url=${url}`).then(data => {
		let aneh = data.result
		if (!aneh) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: aneh
		})
	})
  limitMin(apikey);
})
router.get('/downloader/facebook', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.facebook(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/downloader/pornhub', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
     lolkilScraper.pornhub.download(url).then(data => {
       let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			result
		})
	})
    limitMin(apikey);
})
router.get('/downloader/instagram', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
     snapsave(url).then(data => {
		let result = data.data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/downloader/spotify', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    ibeng = await fetchJson(`https://api.alyachan.my.id/api/spotifydl?url=${url}`)
	.then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/twitter', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    downloads.Twitter(url)
	.then(data => {
		let result = data.result;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/mediafire', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.mediafire(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/sfilemobi', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.sfilemobi(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/downloader/soundcloud', async (req, res, next) => {
	let url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.downloader.soundcloud(url)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

// Asupan
router.get('/asupan/video/random', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
	
	const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/video/random.json'));
    const rv = data[Math.floor(Math.random() * data.length)];
    result = await fetch(rv).then(v => v.buffer())
    await fs.writeFileSync(__path +'/tmp/asupan.mp4', result)
    res.sendFile(__path +'/tmp/asupan.mp4')
  limitMin(apikey);
})

router.get('/asupan/image/random', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
	let data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/random.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
  limitMin(apikey);
})

router.get('/asupan/image/china', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/china.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/indonesia', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/indonesia.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/japan', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/japan.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/korean', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/korean.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/malaysia', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/malaysia.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/thailand', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/thailand.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

router.get('/asupan/image/vietnam', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    const data = JSON.parse(fs.readFileSync(__path +'/scrape/data/asupan/image/vietnam.json'));
    var result = data[Math.floor(Math.random() * data.length)];
    var requestSettings = {
        url: result,
        method: 'GET',
        encoding: null
    };
    request(requestSettings, function (error, response, body) {
        res.set('Content-Type', 'image/png');
        res.send(body);
    });
    limitMin(apikey);
})

// Search
router.get('/search/xnxx', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    
    scrape.downloader.download.xnxxSearch(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
router.get('/search/soundcloud', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.SoundCloude(query)
	.then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/wattpad', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.WattPad(query)
	.then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/pornhub', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    lolkilScraper.pornhub.search(query)
	.then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			...data
		})
	})
    limitMin(apikey);
})
router.get('/search/jadwaltv', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.JadwalTV(query)
	.then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/youtube', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.youtube(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/joox', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.joox(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/sfilemobi', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.sfilemobi(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/moddroid', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.moddroid(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/apkmody', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.apkmody(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/happymod', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.happymod(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/group-whatsapp', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.groupwa(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/sticker', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.sticker(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/wallpaper', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.wallpaper(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/ringtone', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.ringtone(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/pinterest', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.pinterest(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})

router.get('/search/wikimedia', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    scrape.search.wikimedia(query)
	.then(data => {
		let result = data;
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/playstore', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.PlayStore(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/bukalapak', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.BukaLapak(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/random/pornhub', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    lolkilScraper.pornhub.video().then(data => {
		let result = data
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			...data
		})
	})
    limitMin(apikey);
})
router.get('/search/jadwalbola', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.JadwalSepakbola().then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/kodepos', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.KodePos(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/lirik', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.Lirik(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/steam', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.Steam(query).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/steam-detail', async (req, res, next) => {
	const url = req.query.url
	if (!url) return res.json(msg.paramurl)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    search.SteamDetail(url).then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/search/spotify', async (req, res, next) => {
	const query = req.query.q
	if (!query) return res.json(msg.paramquery)
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    
    ibeng = await fetchJson(`https://api.ibeng.tech/api/search/spotify?query=${query}&apikey=APIKEY`)
	.then(data => {
		let result = data.result.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
  limitMin(apikey);
})
// News
router.get('/news/gempa', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.Gempa().then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/gempa2', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.Gempa2().then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/kompas-global', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.KompasGlobal().then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/kompas-news', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.KompasNews().then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/kompas-populer', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.KompasTerpopuler().then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/rumah-keadilan', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.RumahKeadilan().then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
router.get('/news/tixid', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    
    news.TixID().then(data => {
		let result = data.result
		if (!result) res.json(msg.nodata)
		res.json({
			status: "Success",
			code: 200,
			author: author,
			data: result
		})
	})
    limitMin(apikey);
})
// Text Pro
router.get('/textpro/hologram-color', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/hologram-color-3d-text-effect-generator-online-1117.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/luxury-crystal', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-luxury-3d-crystal-text-effects-online-1116.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/metallic', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-3d-metallic-text-with-details-online-1108.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/grunge-metallic', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/grunge-metallic-3d-text-effect-online-1115.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/liquid-metal', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-3d-liquid-metal-text-effect-1112.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/multicolor-paint', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-3d-multicolor-paint-text-effect-online-1114.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/pink-gold', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-pink-soft-gold-text-effect-online-1113.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/burger', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-burger-3d-text-effect-1111.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/cage', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-cage-text-effect-online-1110.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/comic', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-3d-comic-text-effects-online-1091.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/neon-light', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/neon-light-text-effect-online-882.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/neon-light-2', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-3d-neon-light-text-effect-online-1028.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/gradient-neon-light', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-gradient-neon-light-text-effect-online-1085.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/orange-juice', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-a-3d-orange-juice-text-effect-online-1084.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/valentine', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-realistic-golden-text-effect-on-red-sparkles-online-1082.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/pencil', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-a-sketch-text-effect-online-1044.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/berry', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-berry-text-effect-online-free-1033.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/blackpink', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-blackpink-logo-style-online-1001.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/bear-logo', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/online-black-and-white-bear-mascot-logo-creation-1012.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/christmas', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/3d-christmas-text-effect-by-name-1055.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/thunder', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/online-thunder-text-effect-generator-1031.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/box-text', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/3d-box-text-effect-online-880.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/green-horor', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-green-horror-style-text-effect-online-1036.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/magma-hot', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-a-magma-hot-text-effect-online-1030.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/chocolate-cake', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/chocolate-cake-text-effect-890.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/strawberry', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/strawberry-text-effect-online-889.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/glitch', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.textpro('https://textpro.me/create-impressive-glitch-text-effects-online-1027.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/glitch-2', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    const text2 = req.query.text2
    if (!text2) return res.json(msg.paramtext2)
    
    scrape.textpro('https://textpro.me/create-a-glitch-text-effect-online-free-1026.html', [text,text2])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/glitch-tiktok', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    const text2 = req.query.text2
    if (!text2) return res.json(msg.paramtext2)
    
    scrape.textpro('https://textpro.me/create-glitch-text-effect-style-tik-tok-983.html', [text,text2])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/video-game-classic', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    const text2 = req.query.text2
    if (!text2) return res.json(msg.paramtext2)
    
    scrape.textpro('https://textpro.me/video-game-classic-8-bit-text-effect-1037.html', [text,text2])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/marvel-studios', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    const text2 = req.query.text2
    if (!text2) return res.json(msg.paramtext2)
    
    scrape.textpro('https://textpro.me/create-logo-style-marvel-studios-online-971.html', [text,text2])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/textpro/ninja-logo', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    const text2 = req.query.text2
    if (!text2) return res.json(msg.paramtext2)
    
    scrape.textpro('https://textpro.me/create-ninja-logo-online-935.html', [text,text2])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

// Photo Oxy
router.get('/photooxy/flaming', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/realistic-flaming-text-effect-online-197.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/night-sky', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/write-stars-text-on-the-night-sky-200.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/shadow-sky', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/burn-paper', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/write-text-on-burn-paper-388.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/under-grass', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/make-quotes-under-grass-376.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/under-watter', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/creating-an-underwater-ocean-363.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/under-white', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/3d-text-effect-under-white-cube-217.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/coffe-cup', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/put-any-text-in-to-coffee-cup-371.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/neon-glow', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/make-smoky-neon-glow-effect-343.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/rainbow-shine', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/rainbow-shine-text-223.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/army-camouflage', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/army-camouflage-fabric-text-effect-221.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/glow-text', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/create-a-3d-glowing-text-effect-220.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/candy-text', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/honey-text-effect-218.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/vintage', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/other-design/vintage-text-style-219.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/gradient-avatar', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/gradient-avatar-text-effect-207.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/fur-text', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/logo-and-text-effects/fur-text-effect-generator-198.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

router.get('/photooxy/striking', async (req, res, next) => {
    const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
    
    scrape.photooxy('https://photooxy.com/other-design/striking-3d-text-effect-online-187.html', [text])
    .then((data) =>{ 
	res.set({'Content-Type': 'image/png'})
	res.send(data)
	})
    limitMin(apikey);
})

// Canvas
router.get("/canvas/welcome", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
  const nama = req.query.nama
    if (!nama) return res.json('Masukan Nama Partisipasi')
  const member = req.query.member
    if (!member) return res.json('Masukan Nomor Member')
  const pp = req.query.pp
    if (!pp) return res.json("Masukan Url PPnya")
  const ucapan = 'Selamat Datang'
	await getBuffer(`https://api.popcat.xyz/welcomecard?background=https://wallpaperaccess.com/full/901534.jpg&text1=${nama}&text2=${ucapan}&text3=${member}&avatar=${pp}`).then(buffer => {
		res.set({'Content-Type': 'image/png'})
	  res.send(buffer)
	})
    limitMin(apikey);
})
router.get("/canvas/goodbye", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
  const nama = req.query.nama
    if (!nama) return res.json('Masukan Nama Partisipasi')
  const member = req.query.member
    if (!member) return res.json('Masukan Nomor Member')
  const pp = req.query.pp
    if (!pp) return res.json("Masukan Url PPnya")
  const ucapan = 'Selamat Tinggal'
	await getBuffer(`https://api.popcat.xyz/welcomecard?background=https://wallpaperaccess.com/full/901534.jpg&text1=${nama}&text2=${ucapan}&text3=${member}&avatar=${pp}`).then(buffer => {
		res.set({'Content-Type': 'image/png'})
	  res.send(buffer)
	})
    limitMin(apikey);
})
router.get("/maker/tolol", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
	await getBuffer(`https://tolol.ibnux.com/img.php?nama=${text}`).then(buffer => {
		res.set({'Content-Type': 'image/png'})
	  res.send(buffer)
	})
    limitMin(apikey);
})
router.get("/canvas/ttp2", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
	await getBuffer(`https://huratera.sirv.com/PicsArt_08-01-10.00.42.png?profile=Example-Text&text.0.text=${encodeURIComponent(text)}&text.0.opacity=93&text.0.outline.color=fff40a&text.0.outline.width=4&text.0.color=000000&text.0.font.family=Permanent%20Marker&text.0.background.color=ffffff`).then(buffer => {
		res.set({'Content-Type': 'image/png'})
	  res.send(buffer)
	})
    limitMin(apikey);
})
router.get("/canvas/ttp", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
	await getBuffer(`https://huratera.sirv.com/PicsArt_08-01-10.00.42.png?profile=Example-Text&text.0.text=${encodeURIComponent(text)}&text.0.color=ffffff&text.0.background.color=0000ff&text.0.font.family=Changa%20One&&text.0.outline.color=0000`).then(buffer => {
		res.set({'Content-Type': 'image/png'})
	  res.send(buffer)
	})
    limitMin(apikey);
})

// Maker
router.get("/others/toanime", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	await getBuffer(`https://api.caliph.biz.id/api/animeai?img=${url}&apikey=caliphkey`).then(buffer => {
		res.set({'Content-Type': 'image/png'})
	  res.send(buffer)
	})
    limitMin(apikey);
})
router.get("/maker/tolol", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const text = req.query.text
    if (!text) return res.json(msg.paramtext)
	await getBuffer(`https://tolol.ibnux.com/img.php?nama=${text}`).then(buffer => {
		res.set({'Content-Type': 'image/png'})
	  res.send(buffer)
	})
    limitMin(apikey);
})
router.get("/maker/scary", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("scary", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/instagram", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("instagram", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/glitch", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("glitch", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/rejected", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("rejected", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/ps4", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("ps4", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/brazzers", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("brazzers", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/distort", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("distort", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/moustache", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("moustache", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/frame", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("frame", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/missionpassed", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("missionpassed", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/emboss", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("emboss", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/spongebob", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("spongebob", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/facebook", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("facebook", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/discordhouse", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("discordhouse", {
		url: url,
		house: "balance"
	})
		.then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/karenhave", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("lookwhatkarenhave", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/thanos", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("thanos", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/approved", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("approved", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/burn", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("burn", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/crush", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("crush", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/dictator", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
	  ameApi.generate("dictator", { url: url })
    .then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})
router.get("/maker/vs", async (req, res, next) => {
	  const apikey = req.query.apikey
    if (!apikey) return res.json(msg.paramkey)
    const check = await checkKey(apikey)
    if (!check) return res.render('not-apikey', { layout: 'not-apikey' })
    const limit = await isLimit(apikey)
    if (limit) return res.render('limit', { layout: 'limit' })
    const url = req.query.url
    if (!url) return res.json(msg.paramurl)
    const url2 = req.query.url2
    if (!url2) return res.json("Masukan Url Kedua")
	  ameApi.generate("vs", {
		type: 1,
		avatar: url,
		url: url2
	})
		.then(async image => {
		res.set({'Content-Type': 'image/png'})
	  res.send(image)
	})
    limitMin(apikey);
})


module.exports = router