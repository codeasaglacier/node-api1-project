const express = require( 'express' )
const db = require( './database.js' )

const server = express()
server.use( express.json() )

server.get( '/', ( req, res ) => {
  res.json( { message: 'Hello, Doe' } )
} )

server.get( '/users', ( req, res ) => {
  const users = db.getUsers()
  res.json( users )
} )

server.get( '/users/:id', ( req, res ) => {
  const userId = req.params.id
  const user = db.getUserById( userId )

  if ( user ) {
    res.json( user )
  } else {
    res.status( 404 ).json( {
      message: 'User not found'
    } )
  }
} )

server.post( '/users', ( req, res ) => {
  if ( !req.body.name ) {
    return res.status( 400 ).json( {
      message: 'Please enter a user name'
    } )
  }
  const newUser = db.createUser( {
    name: req.body.name
  } )

  res.status( 201 ).json( newUser )
} )

server.put( "/users/:id", ( req, res ) => {
  const user = db.getUserById( req.params.id )

  if ( user ) {
    const updatedUser = db.updateUser( user.id, {
      name: req.body.name || user.name
    } )
    res.json( updatedUser )
  } else {
    res.status( 404 ).json( {
      message: 'User not found'
    } )
  }
} )

server.delete( "/users/:id", ( req, res ) => {
  const user = db.getUserById( req.params.id )

  if ( user ) {
    db.deleteUser( user.id )
    res.status( 204 ).end() 
  } else {
    res.status( 404 ).json( {
      message: 'User not found'
    } )
  }
} )

server.listen( 4000 , () => {
  console.log( 'Server started on port 4000' )
})