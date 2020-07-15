#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from "../app";
import debugLib from "debug";
import http from "http";
import dotenv from "dotenv";
import config from "../config/config";

dotenv.config();

var debug = debugLib("myapp:server");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(config.PORT);
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var ports = parseInt(val, 10);

  if (isNaN(ports)) {
    // named pipe
    return val;
  }

  if (ports >= 0) {
    // port number
    return ports;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}

export default server;
