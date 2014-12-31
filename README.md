# Podslower2

Based on original [PodSlower](http://podslower.ojoven.es) by [ojoven](https://twitter.com/ojoven)

Just a proof of concepts with HTML5 and audio tag.

It slows down audios using HTML5 playbackRate.

To fetch the title it uses ID3 tags. Depending on the version of ID3 tags, the info is located at the beginning or at the end of the file.
In order to avoid the download of the whole file it only scans the beginning tags.

## Install Via npm

```
npm install
```

It installs node, bower and php dependencies.

## Pre requisites

* npm (brew install npm / apt-get install npm)
* bower (npm install bower -g)
* grunt-cli (npm install grunt-cli -g)
* composer (curl -sS https://getcomposer.org/installer | php)

(node and grunt are only in development)