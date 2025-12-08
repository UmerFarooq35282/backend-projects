const allowedOrigins = [
    "http://umer-dev.local:5173",
    "https://fanciful-cucurucho-f7b801.netlify.app"
]

function originFilter(origin, callback) {
    console.log("Incoming Origin:", origin);
    if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
    } else {
        console.log("❌ Blocked Origin:", origin);
        return callback(new Error("Not allowed by CORS"));
    }
}

module.exports = { originFilter }