import jwt from "jsonwebtoken";
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
        // Split at the space
        const bearer = bearerHeader.split(" ");
        // Get token from array
        const bearerToken = bearer[1];
        // Get user informatio using jwt decoder
        const user = jwt.verify(bearerToken, "SoftwareQualityAssurance");
        // Set the token
        req.token = bearerToken;
        req.email = user.email
        // Next middleware
        next();
    } else {
        // Forbidden
        res.status(403).json({ error: "Forbidden" });
    }
}

module.exports = verifyToken;