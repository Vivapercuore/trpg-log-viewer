
 const download = function(blob,fileName){
    const a= document.createElement("a")
    a.href = URL.createObjectURL(blob)
    a.download = fileName||"fileName" // 这里填保存成的文件名
    a.click()
    URL.revokeObjectURL(a.href)
　　a.remove();
}
export {download }