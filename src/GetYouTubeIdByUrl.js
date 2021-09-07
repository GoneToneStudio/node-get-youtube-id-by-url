/*
 * Copyright (c) 2014-2021 旋風之音 GoneTone
 *
 * Website: https://blog.reh.tw/
 * GitHub: https://github.com/GoneTone
 * Facebook: https://www.facebook.com/GoneToneDY
 * Twitter: https://twitter.com/TPGoneTone
 *
 * Project GitHub: https://github.com/GoneToneStudio/node-get-youtube-id-by-url
 *
 *                               _oo0oo_
 *                              o8888888o
 *                              88" . "88
 *                              (| -_- |)
 *                              0\  =  /0
 *                            ___/`---'\___
 *                          .' \\|     |# '.
 *                         / \\|||  :  |||# \
 *                        / _||||| -:- |||||- \
 *                       |   | \\\  -  #/ |   |
 *                       | \_|  ''\---/''  |_/ |
 *                       \  .-\__  '-'  ___/-. /
 *                     ___'. .'  /--.--\  `. .'___
 *                  ."" '<  `.___\_<|>_/___.' >' "".
 *                 | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *                 \  \ `_.   \_ __\ /__ _/   .-` /  /
 *             =====`-.____`.___ \_____/___.-`___.-'=====
 *                               `=---='
 *           ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *               佛祖保佑                       永無 BUG
 */

'use strict'

const axios = require('axios')
const cheerio = require('cheerio')

const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
  },
  validateStatus: () => {
    return true
  }
})

/**
 * Check YouTube Url
 *
 * @param {string} url
 * @returns {boolean}
 */
const checkUrl = (url) => url.indexOf('youtube.com') !== -1 || url.indexOf('youtu.be') !== -1

/**
 * Get YouTube Channel ID By Url
 *
 * @param {string} url Channel Url
 * @returns {Promise<string>} Channel ID
 */
const channelId = async (url) => {
  if (checkUrl(url)) {
    const ytChannelPageResponse = await axiosInstance.get(url)
    const $ = cheerio.load(ytChannelPageResponse.data)

    const id = $('meta[itemprop="channelId"]').attr('content')
    if (id) {
      return id
    }
  } else {
    throw Error(`"${url}" is not a YouTube url.`)
  }

  throw Error(`Unable to get "${url}" channel id.`)
}

/**
 * Get YouTube Video ID By Url
 *
 * @param {string} url Video Url
 * @returns {Promise<string>} Video ID
 */
const videoId = async (url) => {
  if (checkUrl(url)) {
    const ytChannelPageResponse = await axiosInstance.get(url)
    const $ = cheerio.load(ytChannelPageResponse.data)

    const id = $('meta[itemprop="videoId"]').attr('content')
    if (id) {
      return id
    }
  } else {
    throw Error(`"${url}" is not a YouTube url.`)
  }

  throw Error(`Unable to get "${url}" video id.`)
}

module.exports = {
  channelId,
  videoId
}
