module.exports = it => {
	const fields = [
		{ label: 'Action taken', value: it.action?.toUpperCase() },
		{ label: 'ASN', value: `${it.clientAsn} (${it.clientASNDescription})` },
		{ label: 'Protocol', value: `${it.clientRequestHTTPProtocol} (method ${it.clientRequestHTTPMethodName})` },
		{ label: 'Domain', value: it.clientRequestHTTPHost },
		{ label: 'Endpoint', value: it.clientRequestPath },
		{ label: 'Query', value: it.clientRequestQuery },
		{ label: 'Timestamp', value: it.datetime },
		{ label: 'Ray ID', value: it.rayName },
		{ label: 'Rule ID', value: it.ruleId },
		{ label: 'UA', value: it.userAgent || 'Empty string' }
	];

	const reportLines = fields
		.filter(field => field.value)
		.map(field => `${field.label}: ${field.value}`);

	return `Triggered Cloudflare WAF (${it.source}) from ${it.clientCountryName}.
${reportLines.join('\n')}

Report generated by Node-Cloudflare-WAF-AbuseIPDB https://github.com/sefinek/Node-Cloudflare-WAF-AbuseIPDB`;
};