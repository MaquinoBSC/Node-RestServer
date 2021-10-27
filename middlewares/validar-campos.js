const { validationResult } = require('express-validator');

const validarCampos= (req, res, next)=> {
    const errors= validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    //Si en la validacion, llega a este punto quiere decir que puede seguir con el siguiente middleware
    //Y si no hay otro middleware que siga con el controlador
    next();
}


module.exports= {
    validarCampos
};