const PROXY_CONFIG = [{
    context: [
        "/api",
    ],
    target: "http://localhost:9081",
    secure: false
}]

module.exports = PROXY_CONFIG;