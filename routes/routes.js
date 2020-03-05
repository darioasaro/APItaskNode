module.exports = routes = ( app ) => {
    app.use('/api/tasks', require( './tasks' )),
     app.use('/api/form', require( './form' ))
  }
 