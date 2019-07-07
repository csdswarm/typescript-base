const fs = require('fs')
const path = require('path')

deleteDirectory(path.resolve(__dirname, './dist'))
  .then(() => console.log('Clean Complete'))

async function deleteDirectory(dirPath) {
  try {
    if (await isDirectory(dirPath)) {
      const contents = await getDirectoryContents(dirPath)
      for (const contentName of contents) {
        const contentPath = path.resolve(dirPath, contentName)
        if (await isDirectory(contentPath)) {
          await deleteDirectory(contentPath)
        } else {
          await removeFile(contentPath)
        }
      }
      await removeDir(dirPath)
    }
  } catch (e) {
    if (e.code !== 'ENOENT') {
      console.log('Error trying to delete: ', dirPath, '\nINFO: ', JSON.stringify(e, null, 2))
    }
  }
}

function isDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, stats) => {
      err ? reject(err) : resolve(stats.isDirectory())
    })
  })
}

function getDirectoryContents(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      err ? reject(err) : resolve(files)
    })
  })
}

function removeFile(path) {
  return new Promise(resolve => fs.unlink(path, resolve))
}

function removeDir(path) {
  return new Promise(resolve => fs.rmdir(path, resolve))
}