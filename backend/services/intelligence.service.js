const Failure = require("../models/failure.model");

async function getFailurePatterns(websiteId) {
    const patterns = await Failure.aggregate([
        {
            $match: {
                website: websiteId,
                fingerprint: { $exists: true, $ne: null }
            }
        },
        {
            $group: {
                _id: "$fingerprint",
                occurrences: { $sum: 1 },
                lastSeen: { $max: "$createdAt" },
                firstSeen: { $min: "$createdAt" },
                severity: { $max: "$severity" }
            }
        },
        {
            $sort: { occurrences: -1 }
        }
    ]);

    const result = [];

    for (const pattern of grouped) {

        const trend = await getTrend(pattern._id, websiteId);

        const risk = calculateRisk({
            occurrences: pattern.occurrences,
            trend,
            severity: pattern.severity
        });
          const explanation = generateExplanation({
    fingerprint: pattern._id,
    occurrences: pattern.occurrences,
    trend,
    risk,
    firstSeen: pattern.firstSeen,
    lastSeen: pattern.lastSeen
  });


        result.push({
            fingerprint: pattern._id,
            occurrences: pattern.occurrences,
            firstSeen: pattern.firstSeen,
            lastSeen: pattern.lastSeen,
            severity: pattern.severity,
            trend,
            risk,
            explaination
        });

    }

    return result;
}

function calculateRisk({ occurrences, trend, severity }) {

    let score = 0;

    // frequency impact
    if (occurrences > 10) score += 3;
    else if (occurrences > 5) score += 2;
    else score += 1;

    // trend impact
    if (trend === "increasing") score += 2;

    // severity impact
    if (severity === "critical") score += 3;
    else if (severity === "high") score += 2;

    // final risk level
    if (score >= 6) return "HIGH";
    if (score >= 4) return "MEDIUM";

    return "LOW";
}

function generateExplanation(pattern) {

    return `${pattern.fingerprint} occurred ${pattern.occurrences} times. 
    Trend: ${pattern.trend}. 
    Risk level: ${pattern.risk}. 
    First seen: ${pattern.firstSeen}. 
    Last seen: ${pattern.lastSeen}.`;

}

async function getTrend(fingerprint, websiteId) {

    const now = new Date();

    const last24h = new Date(now - 24 * 60 * 60 * 1000);
    const prev24h = new Date(now - 48 * 60 * 60 * 1000);

    const current = await Failure.countDocuments({
        website: websiteId,
        fingerprint,
        createdAt: { $gte: last24h }
    });

    const previous = await Failure.countDocuments({
        website: websiteId,
        fingerprint,
        createdAt: { $gte: prev24h, $lt: last24h }
    });

    if (current > previous) return "increasing";
    if (current < previous) return "decreasing";

    return "stable";
}

module.exports = { getFailurePatterns };