const fs = require('fs')

function replaceStr(filePath, sourceRegx, targetSrt) {
    //文件路径、 需要修改的字符串、修改后的字符串
    fs.readFile(filePath, (err, data) => {
        if (err) console.log(err)
        else {
            let str = data.toString();
            str = str.replace(sourceRegx, targetSrt);
            fs.writeFile(filePath, str, (err) => {
                if (err) console.log(err);
            })
        }
    })
}

var wfPath = 'D:/Program Files/JetBrains/java_project/my_project/ibooks/xu_vuepress_reco_blog/node_modules/.bin'
fs.readdir(wfPath, (err, files) => {
    if (err) console.log(err);
    else {
        if (files.length != 0) {
            files.forEach((item) => {
                var wfPath = 'D:/Program Files/JetBrains/java_project/my_project/ibooks/xu_vuepress_reco_blog/node_modules/.bin';// 或者var wfPath = path.resolve(__dirname, '../node_modules/.bin')
                if (item.split('.')[1] === 'cmd') {
                    wfPath += `/${item}`;
                    replaceStr(wfPath, /"%_prog%"/, '%_prog%')
                }
            })
        }
    }
})