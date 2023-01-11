const joi = require('joi')
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().required().min(1)

module.exports = {
    addCateRule:{
        body:{
            name,
            alias
        }
    },
    deleteCateRule:{
        params:{
            id
        }
    },
    queryCateRule:{
        params:{
            id
        }
    }
}