const generateGeometryPoint = (data) => {
    const point = { type: 'Point', coordinates: [data.place_longitude,data.place_latitude] }
    return point
}

module.exports = generateGeometryPoint