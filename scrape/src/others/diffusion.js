const fetch = require('node-fetch')

async function animedif(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Ryzan/fantasy-diffusion-v1",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	)
	const result = await response.blob();
	let arrayBuffer = await result.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer, 'base64')
	return buffer
}
async function animedif2(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/stablediffusionapi/anime-model-v2",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	)
	const result = await response.blob();
	let arrayBuffer = await result.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer, 'base64')
	return buffer
}
async function stabledif(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Andyrasika/lora_diffusion",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	)
	const result = await response.blob();
	let arrayBuffer = await result.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer, 'base64')
	return buffer
}
async function stabledif2(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/stablediffusionapi/dreamshaper-v6",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	)
	const result = await response.blob();
	let arrayBuffer = await result.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer, 'base64')
	return buffer
}

module.exports = {
animedif,
animedif2,
stabledif,
stabledif2,
}