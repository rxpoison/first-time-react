const route = require('koa-router')
const Router = new route()
const axios = require('axios');

Router.get('/api/trips', async ctx => {
    const keyword = ctx.request.query.keyword
    const trips = await dataTrips(keyword)
    ctx.status = 200;
    ctx.set({
        'Content-Type': 'application/json'
    })
    ctx.body = {
        response: ctx.response,
        keyword: keyword,
        data: trips,
    }
})


dataTrips = (keyword) => {
    return new Promise((resolve, reject) => {
        axios.get('http://127.0.0.1:9000/trips')
            .then(function async (response) {
                const trips = response.data
                const data = handleFilter(trips, keyword)
                resolve(data);
            })
            .catch(function (error) {
                reject(error)
            })
    });
}

handleFilter = async (trips, keyword) => {
    let checkKeyword = (keyword) ? true : false;
    let result;
    if (checkKeyword) {
        result = trips.filter((trip) => new RegExp(keyword).test([trip.title,trip.description,trip.tags]))
    }else{
        result = trips
    }
    return result
}

module.exports = Router