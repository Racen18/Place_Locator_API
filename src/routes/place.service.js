const express = require('express')
const Sequelize = require('sequelize')
const placeService = express.Router()
const db = require('../database/db.connection')
const Place = require('../models/place.model')
const generateGeometryPoint = require('../utils/engine')
const { authSchema } = require('../utils/validate.schema')

placeService.post('/place', async (req, res) => {
    try {
        await db.sync()
        const validatedObject = await authSchema.validateAsync(req.body)
        const point = await generateGeometryPoint(validatedObject)
        const newData = {
            ...validatedObject,
            place_geom: point
        }
        const data = await Place.create(newData)
        res.status(201).send(data)
    } catch (error) {
        if (error.isJoi === true) {
            return res.status(422).send(error)
        }
        res.send(error)
    }
})

placeService.get('/places', async (req, res) => {
    try {
        const data = await Place.findAll()
        if (data === null) {
            return res.send({
                message: 'There is no data according to your search!'
            })
        }
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

placeService.get('/place/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await Place.findOne({ where: { place_id: id } })
        if (data === null) {
            return res.send({
                message: 'There is no data according to your search!'
            })
        }
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})

placeService.patch('/place/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await Place.update(
            { place_name: req.body.place_name }, 
            { where: { place_id: id } })
        if (data[0] === 0) {
            return res.send({
                updatedCount: data[0],
                message: 'There is no data to update!'
            })
        }
        res.send({
            updatedCount: data[0],
            message: 'The data has been updated!'
        })
    } catch (error) {
        res.send(error)
    }
})

placeService.delete('/place/:id', async (req, res) => {
    const id = req.params.id
    try {
        const data = await Place.destroy( { where: { place_id: id } } )
        if (data === 0) {
            return res.send({
                deletedCount: data,
                message: 'There is no data to delete!'
            })
        }
        res.send({
            deletedCount: data,
            message: 'The data has been deleted!'
        })
    } catch (error) {
        res.send(error)
    }
})


/********** Get the nearby locations **********/

placeService.post('/nearbyplaces', async (req, res) => {
    try {
        const data = await Place.findAll({
            where: Sequelize.where(
              Sequelize.fn('ST_DWithin',
                Sequelize.col('place_geom'),
                Sequelize.fn('ST_SetSRID',
                  Sequelize.fn('ST_MakePoint',
                    req.body.longitude, req.body.latitude),
                  4326),
                req.body.distance),
              true)
          })
          res.send(data)
    } catch (error) {
        res.send(error)
    }
})

module.exports = placeService