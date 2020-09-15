const { model } = require("mongoose");

class Operations{


    exist(collection, object){
        return new Promise((resolve, reject)=>{
            collection.findOne(object).then((result)=>{
                if(result === null)
                    resolve({result: false});
                else
                    resolve({result: true});
            })
        })
    }


    add(collection, object){
        return new Promise((resolve, reject)=>{
                new collection(object).save((err)=>{
                    if(err)
                    {
                        resolve({result: false});
                    }else{
                        resolve({result: true});
                    }
                })
        })
    }

    modify(collection, id, object){
        return new Promise((resolve, reject)=>{
            this.exist(collection, id).then((result)=>{
                if(result["result"] === false){
                    resolve({result: false, resone: "object not exist"});
                }else{
                    collection.findOneAndUpdate(id, object).then(()=>{
                        this.exist(collection, object).then((innerResult)=>{
                            if(innerResult["result"] === true){
                                resolve({result: true, resone: ""});
                            }else{
                                resolve({result: false, resone: ""});
                            }
                        })
                    })
                }
            })
        })
    }

    get(collection, object){
        return new Promise((resolve, reject)=>{
            collection.findOne(object).then((result)=>{
                if(result === null){
                    resolve({
                        result: false,
                        resone: 'object not exist',
                    })
                }else{
                    resolve({
                        result: true,
                        object: result,
                        resone: '',
                    })
                }
            })
        })
    }

}

module.exports = Operations