// Main interval of each cycle.
// In production mode, it's 2 hours, and in development mode, it's 8 seconds.
const CYCLE_INTERVAL = process.env.NODE_ENV === 'production' ? 2 * 60 * 60 * 1000 : 8 * 1000;

// The minimum time that must pass after reporting an IP address before it can be reported again.
// The required time is >= 15 minutes, according to AbuseIPDB API limits.
const REPORTED_IP_COOLDOWN_MS = 6 * 60 * 60 * 1000; // 6h

// The maximum URI length that can be reported to AbuseIPDB.
// If Cloudflare returns a longer URI, the API request will fail.
const MAX_URL_LENGTH = 920;

// Additional delay after each successful IP report to avoid overloading the AbuseIPDB API.
const SUCCESS_COOLDOWN_MS = 2 * 1000; // 2s

// Interval for refreshing your IP address.
// This ensures that WAF violations originating from your IP address are not reported to AbuseIPDB.
const IP_REFRESH_INTERVAL = 55 * 60 * 1000; // 55m

// Report IP addresses to api.sefinek.net to support the development of the repository at https://github.com/sefinek24/Malicious-IP-Addresses. If true, please see the .env file.
const REPORT_TO_SEFINEK_API = true;

// How often should the log (reported_ips.csv) be analyzed and sent to the Sefinek API?
const SEFINEK_API_INTERVAL = process.env.NODE_ENV === 'production' ? 60 * 60 * 1000 : 4 * 1000;

module.exports = { CYCLE_INTERVAL, REPORTED_IP_COOLDOWN_MS, MAX_URL_LENGTH, SUCCESS_COOLDOWN_MS, IP_REFRESH_INTERVAL, REPORT_TO_SEFINEK_API, SEFINEK_API_INTERVAL };