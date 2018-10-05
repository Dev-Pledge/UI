const fs = require('fs-extra');
const paths = require('../config/paths');

function makeDirAndCopyPrebuild() {
    fs.remove(paths.appPostBuild+'/*').then(
        () => {
            fs.ensureDir(paths.appPostBuild)
                .then(() => {
                    fs.copySync(paths.appBuild, paths.appPostBuild)
                    fs.remove(paths.appBuild)
                })
        }
    );

}

makeDirAndCopyPrebuild()