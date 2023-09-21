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
const {remove} = require("cheerio/lib/api/manipulation");

const axiosInstance = axios.create({
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/117.0'
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
    const id = $('meta[itemprop="identifier"]').attr('content')  //updated itemprop. YouTube appears to have updated this since last commit.
    if (id) {
      return id
    }
  } else {
    throw Error(`"${url}" is not a YouTube channel.`)
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

    const id = $('meta[itemprop="identifier"]').attr('content')  //apparently same goes for videos?
    if (id) {
      return id
    }
  } else {
    throw Error(`"${url}" is not a YouTube video.`)
  }

  throw Error(`Unable to get "${url}" video id.`)
}

module.exports = {
  channelId,
  videoId
}
