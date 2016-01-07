import Loader from 'loader/Loader.js';

let loader = new Loader();

loader.path = 'assets/';

loader.shader('bacteria');

loader.start().then(
    (files) => loaderComplete(files)
);

function loaderComplete (files) {

    for (let file of files)
    {
        console.log(file);
    }

}

