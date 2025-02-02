exports.CONFIG = {
	MAIN: {
		NODE_ENV: 'production', // Environment mode: 'production' or 'development'
		CLOUDFLARE_ZONE_ID: '00000000000000000000000000000000', // https://dash.cloudflare.com/profile/api-tokens
		CLOUDFLARE_API_KEY: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // API key for Cloudflare access
		ABUSEIPDB_API_KEY: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', // API key for reporting malicious IPs to AbuseIPDB
	},

	CYCLES: {
		// Main interval (in minutes) of each cycle
		CYCLE_INTERVAL: 120 * 60 * 1000,

		// The minimum time (in hours) that must pass after reporting an IP address before it can be reported again.
		// The required time is >= 15 minutes, according to AbuseIPDB API limits.
		REPORTED_IP_COOLDOWN: 6 * 60 * 60 * 1000,

		// The maximum URI length that can be reported to AbuseIPDB.
		// If Cloudflare returns a longer URI, the API request will fail.
		MAX_URL_LENGTH: 780,

		// Additional delay (in milliseconds) after each successful IP report to avoid overloading the AbuseIPDB API.
		SUCCESS_COOLDOWN: 30,

		// Interval for refreshing your IP address (in minutes).
		// This ensures that WAF violations originating from your IP address are not reported to AbuseIPDB.
		IP_REFRESH_INTERVAL: 80 * 60 * 1000,
	},

	SEFINEK_API: {
		// Report IP addresses to api.sefinek.net to support the development of the repository at https://github.com/sefinek/Malicious-IP-Addresses. SECRET_TOKEN is required if true.
		REPORT_TO_SEFIN_API: true,

		// Secret key for api.sefinek.net
		SECRET_TOKEN: 'HKKAUZHTDAH7W87SyL6XsWkV8UeUFVA9VvvXhn6H9Wn6kfDW6ZsXCtbahmkaYcLbxZGyrAKPmSkXb3AJ6pCU3VuDyTjUSehMyDZ',

		// How often should the log (reported_ips.csv) be analyzed and sent to the Sefinek API? In hours.
		INTERVAL: 60 * 60 * 1000, // Frequency for analyzing and submitting logs to the Sefinek API
	},
};

exports.GENERATE_COMMENT = ({ action, clientAsn, clientASNDescription, clientRequestHTTPProtocol, clientRequestHTTPMethodName, clientRequestHTTPHost, clientRequestPath, clientRequestQuery, datetime, rayName, ruleId, userAgent, source, clientCountryName }) => {
	const fields = [
		{ label: 'Action taken', value: action?.toUpperCase() },
		{ label: 'ASN', value: `${clientAsn} (${clientASNDescription})` },
		{ label: 'Protocol', value: `${clientRequestHTTPProtocol} (${clientRequestHTTPMethodName} method)` },
		// { label: 'Zone', value: clientRequestHTTPHost },
		{ label: 'Endpoint', value: clientRequestPath },
		{ label: 'Query', value: clientRequestQuery },
		{ label: 'Timestamp', value: datetime },
		{ label: 'Ray ID', value: rayName },
		// { label: 'Rule ID', value: ruleId },
		{ label: 'UA', value: userAgent || 'Empty string' },
	];

	const reportLines = fields
		.filter(({ value }) => value)
		.map(({ label, value }) => `${label}: ${value}`);

	return `Triggered Cloudflare WAF (${source}) from ${clientCountryName}.
${reportLines.join('\n')}

Report generated by Cloudflare-WAF-To-AbuseIPDB:
https://github.com/sefinek/Cloudflare-WAF-To-AbuseIPDB`; // Please do not remove the repository URL. I'd really appreciate it (:
};