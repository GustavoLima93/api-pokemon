class Helper {
    sendResponse = (res,statusCode, data) => {
        return  res.status(statusCode).send({pokemons:data});
    }
}

export default new Helper();