var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    "realm": "Demo-Realm",
    "auth-server-url": "http://localhost:8080/auth/",
    "resource": "nodejs-microservice",
    "credentials": {
      "secret": "1c6fe190-835f-40d7-ac8d-abc232623353"
    }
  }

function initKeycloak(app) {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        app.use(session({
            secret: 'some secret',
            resave: false,
            saveUninitialized: true,
            store: memoryStore
          }));
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};