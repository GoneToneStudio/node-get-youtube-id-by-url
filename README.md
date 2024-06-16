# Get YouTube ID By Url (npm Package)

Get YouTube channel or video id by url!

## Report Issues

Please report any bugs you discover at <https://github.com/GoneToneStudio/node-get-youtube-id-by-url/issues>

## Installation

Node.js 12.0.0 or newer is required.

### npm

```sh-session
npm install @gonetone/get-youtube-id-by-url
```

### Yarn

```sh-session
yarn add @gonetone/get-youtube-id-by-url
```

## Usage

### Import package

ES Module (ESM)

```js
import { channelId, videoId } from '@gonetone/get-youtube-id-by-url';
```

CommonJS (CJS)

```js
const { channelId, videoId } = require('@gonetone/get-youtube-id-by-url');
```

### Get YouTube Channel ID By Url

```js
channelId('YouTube Channel Url').then((id) => {
  console.log(id);
});
```

Support URL format:

- https://www.youtube.com/channel/xxxxxxxxxxxxxxxxxxxxxxxx
- https://www.youtube.com/c/xxxxxxxx
- https://www.youtube.com/user/xxxxxxxx

### Get YouTube Video ID By Url

```js
videoId('YouTube Video Url').then((id) => {
  console.log(id);
});
```

Support URL format:

- https://www.youtube.com/watch?v=xxxxxxxxxxx
- https://youtu.be/xxxxxxxxxxx

## License

[MIT](LICENSE)
