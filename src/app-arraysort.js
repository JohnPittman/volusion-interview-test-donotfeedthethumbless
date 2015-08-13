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

var noThumbs = [];
var re = new RegExp('IMG_\\d+');

function testPair(filename1, filename2) {
    var fileName1 = re.exec(filename1);
    var fileName2 = re.exec(filename2);
    return fileName1[0] === fileName2[0];
}

function validateFilenames(filenames) {
    // this function should return true if every filename in the array 
    // that does not end in "_thumb.jpg" has a corresponding filename
    // in the array that does end in "_thumb.jpg". if there are any
    // unmatched files (without thumbnails), throw an exception
    // listing the unmatched files.

    filenames.sort();
    //console.log(filenames);

    for (var i = 0, n = filenames.length; i < n; ++i) {
        if (i < n - 1) {
            if (testPair(filenames[i], filenames[i + 1]) === true) {
                i++;
            } else {
                noThumbs.push(filenames[i]);

                // Add last one on fail since it has nothing to compare to.
                if (i === n - 2)
                    noThumbs.push(filenames[i + 1]);
            }
        }
    }

    return noThumbs.length > 0;
}

function print() {
    console.log('----------');
    console.log('Array Sort');
    console.log('----------');
    if (validateFilenames(imageDirEntries) === true) {
        throw new Error("Error: The following filenames do not have thumbnails: " + noThumbs.join(', '));
    } else {
        console.log('All good.');
    }
}

print();
