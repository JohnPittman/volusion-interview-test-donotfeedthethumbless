var imageDirEntries = [
    'IMG_0001.jpg',
    'IMG_0009.jpg',
    'IMG_0019.jpg',
    'IMG_0029.jpg',
    'IMG_0002_thumb.jpg',
    'IMG_0009_thumb.jpg',
    'IMG_0004_thumb.jpg',
    'IMG_0002.jpg',
    'IMG_0005.jpg',
    'IMG_0004.jpg',
    'IMG_0003.jpg',
    'IMG_0003_thumb.jpg'
];

var imageCache = {};
var thumbRegExp = new RegExp('_thumb.jpg');

function processFileName(filename) {
    var isThumb = thumbRegExp.test(filename);
    return {
        hasThumb: isThumb,
        fileName: isThumb === false ? filename : filename.replace(/_thumb\.jpg/, '.jpg'),
        thumbName: isThumb === true ? filename : filename.replace(/\.jpg/, '_thumb.jpg')
    };
}

function processData(data) {
    var result = 0;

    var imageCacheData = imageCache[data.fileName];

    if (imageCacheData === undefined) {
        imageCache[data.fileName] = data;
        result = 1;
    } else if (imageCacheData.hasThumb === true ||
        data.hasThumb === true) {
        imageCacheData.hasThumb = true;
        result = -1;
    }

    return result;
}

function validateFilenames(filenames) {
    // this function should return true if every filename in the array 
    // that does not end in "_thumb.jpg" has a corresponding filename
    // in the array that does end in "_thumb.jpg". if there are any
    // unmatched files (without thumbnails), throw an exception
    // listing the unmatched files.

    var noThumbCount = 0;

    for (var i = 0, n = filenames.length; i < n; ++i) {
        var data = processFileName(filenames[i]);

        noThumbCount += processData(data);
    }

    return noThumbCount > 0;
}

function print() {
    console.log('----------');
    console.log('Key Lookup');
    console.log('----------');
    if (validateFilenames(imageDirEntries) === true) {
        var output = '';
        var image;

        for (var key in imageCache) {
            image = imageCache[key];

            if (image.hasThumb === false) {
                output += imageCache[key].fileName + ', ';
            }
        }

        throw new Error("Error: The following filenames do not have thumbnails: " + output);
    } else {
        console.log('All good.');
    }
}

print();
