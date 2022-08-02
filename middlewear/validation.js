const dataMethod = ['body' , 'params' , 'query']

const validation = (schema)=>{

    return (req,res,next)=>{
        // console.log(schema.body);
        const validationErrArr = []
        dataMethod.forEach(key => {
            if (schema[key]) {
                console.log(key);
                const validationResult = schema[key].validate(req[key],{abortEarly:false})
                console.log(validationResult);
                if (validationResult.error) {
                    validationErrArr.push(validationResult.error.details)
                }
            }
        });
        console.log(validationErrArr);
        if (validationErrArr.length) {
            res.json({message:"validation error ", err:validationErrArr})
        } else {
            next()
        }
       
    }
}
module.exports = validation;