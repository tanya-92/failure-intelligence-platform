function generateFingerprint(message) {
    return message
    .toLowerCase()
    .replace(/\d+/g, "")
    .replace(/[^a-z\s]/g,"")
    .replace(/\s+/g, " ")
    .trim();
}

module.exports = { generateFingerprint };