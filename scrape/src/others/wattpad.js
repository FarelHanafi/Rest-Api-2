const axios = require("axios");
const cheerio = require("cheerio");

class Wattpad {
	constructor() {
		this.baseURL = "https://www.wattpad.com";
		this.headers = {
			"upgrade-insecure-requests": 1,
			"user-agent": "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.62 Mobile Safari/537.36",
			"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
			"sec-ch-ua": '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
			"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
			"cookie": 'wp_id=160a66e7-9e15-4f9d-bee6-856ffa62cda3;adMetrics=0;_pbeb_=1;lang=20;locale=id_ID;_pbjs_userid_consent_data=3524755945110770;_pubcid=4df9bbfc-edd1-4f24-9308-d63eabdc8cf6;ff=1;dpr=1.7000000476837158;tz=-7;_lr_env_src_ats=false;_cc_id=8645ceb4b96b4580f7c6b9e908cdf7f2;pbjs-unifiedid=%7B%22TDID%22%3A%22f5926b74-c1b3-4fe6-a88a-127f9fa0d978%22%2C%22TDID_LOOKUP%22%3A%22TRUE%22%2C%22TDID_CREATED_AT%22%3A%222021-09-15T12%3A41%3A52%22%7D;_fbp=fb.1.1634301714192.950307742;_col_uuid=01a0d2df-6000-4355-9002-2f6a54240eb0-10wrk;g_state={"i_p":1634308926506,"i_l":1};uuid=e9c65ceb-71e6-48e2-c58a-bb1fddc64bd7;cto_bundle=VSJ7519zT1VMRzc5JTJCaWs0ZyUyQm40a2wzZDRRWmhiSU9nQmVPcUxsM0F4MG5IZWc2bUFNcGhVY3FUd3pjVXBybzRKREREZ2F4dWMxNG9TU3lhYUhEUHRyY3EwUnNkMFI3cFVDUmlvRTJPTElXU1BKSDlZdDRXcno3dHN3S01oYThtRVFTNHFFTUhsS3pETXQ0RkhLRmZWU3BuanR3JTNEJTNE;cto_bundle=VSJ7519zT1VMRzc5JTJCaWs0ZyUyQm40a2wzZDRRWmhiSU9nQmVPcUxsM0F4MG5IZWc2bUFNcGhVY3FUd3pjVXBybzRKREREZ2F4dWMxNG9TU3lhYUhEUHRyY3EwUnNkMFI3cFVDUmlvRTJPTElXU1BKSDlZdDRXcno3dHN3S01oYThtRVFTNHFFTUhsS3pETXQ0RkhLRmZWU3BuanR3JTNEJTNE;fs__exp=2;sn__time=j%3Anull;cto_bidid=RXTOKl84YW5jUHhUSjIzTlZUMiUyRldnNVlaNE40MnpaUU44dTBXREZBMUc3Rjl5JTJGdGMyY0RKeGM0R1hxUW1XRmVKMFFkbkxCTWZ3aGJCanVKWW1NZDclMkYwYXVBJTJCOCUyRjgzaEJ0bUpSeW9RUXRiZFI2OXclM0Q;cto_bundle=G-DBC19zT1VMRzc5JTJCaWs0ZyUyQm40a2wzZDRRVGtvSWw5QSUyQm9ha1VsYm50VDhnZ0V2MU5LTUpBMFdZNmYwelQzSnBOMzNGOHFvc1psQ2RSd09mUnFHQnE0anFDYXZNdXlJRG9MU1BmMTE1NXdhd2lkREQ3dFNTd2Voc0s5RUdBd0dqcW1Icm10eHVzJTJGOGclMkJGQVFWZkRTd2tpR0p3JTNEJTNE;_lr_retry_request=true;panoramaId_expiry=1635074817403;panoramaId=025cbf3eefcfa5f4e20992c0dd5e16d53938af9f1f4dc3fa8d3549352b779872;te_session_id=1634470018788;AMP_TOKEN=%24NOT_FOUND;_ga=GA1.2.1691007221.1634301713;_gid=GA1.2.115553894.1634470019;__qca=P0-717415294-1634470019778;signupFrom=search;RT=nu=https%3A%2F%2Fwww.wattpad.com%2Fsearch%2Fteman%2520rasa%2520pacar&cl=1634470046419&r=https%3A%2F%2Fwww.wattpad.com%2Fsearch%2Fteman%2520rasa%2520pacar&ul=1634470113039&hd=1634470114396;_ga_FNDTZ0MZDQ=GS1.1.1634470016.5.1.1634470114.0'
		};
	}
	search(query) {
		return new Promise(async (resolve, reject) => {
			await axios.request({
				method: "GET",
				url: `https://www.wattpad.com/v4/search/stories/?query=${encodeURIComponent(query)}&limit=10&fields=stories(title%2CvoteCount%2CreadCount%2CcommentCount%2Cdescription%2Ccover%2Curl%2CnumParts%2Cuser(name)%2ClastPublishedPart(createDate)%2Cpromoted%2Csponsor(name%2Cavatar)%2Ctracking(clickUrl%2CimpressionUrl%2CthirdParty(impressionUrls%2CclickUrls))%2Ccontest(endDate%2CctaLabel%2CctaURL))%2Ctotal`,
				headers: this.headers
			}).then(anu => resolve({
				total_result: anu.data.total,
				data: anu.data.stories
			})).catch(reject);
		});
	}
	story(url) {
		return new Promise(async (resolve, reject) => {
			if (!url.match(/^(?:http?s:\/\/)?(?:www\.|)?(wattpad\.com)?(\/)?(?:story\/)?([\d]+\-)/gi)) return reject("invalid url");
			const link = new URL(url);
			await axios.request({
				method: "GET",
				url: link.href,
				headers: this.headers
			}).then(async ({ data }) => {
				const $ = cheerio.load(data);
				const result = new Array();
				const contents = new Array();
				const title = $("html > head > title").text();
				const description = $("pre.description-text").text().trim();
				const keywords = $("meta[name='keywords']").attr("content");
				let thumbnail, author_name, author_url;
				$("div.component-wrapper").get().map(m => {
					thumbnail = $(m).find("div.story-cover > img").attr("src");
					author_name = $(m).find("div.author-info__username > a").text();
					author_url = (this.baseURL + $(m).find("div.author-info__username > a").attr("href"));
				});
				$("div.tool-tip").get().map(m => {
					contents.push($(m).attr("data-tip"));
				});
				$("a.story-parts__part").get().map(m => {
					result.push({
						title: $(m).text(),
						url: (this.baseURL + $(m).attr("href")),
					});
				});
				resolve({
					title,
					keywords,
					thumbnail,
					author_name,
					author_url,
					reading: contents[0],
					vote: contents[1],
					bab: contents[2],
					description,
					result
				});
			}).catch(reject);
		});
	}
	read(url) {
		return new Promise(async (resolve, reject) => {
			const link = new URL(url);
			await axios.request({
				method: "GET",
				url: link.href,
				headers: this.headers
			}).then(async ({ data }) => {
				const $ = cheerio.load(data);
				const aliases = $("script[type='text/javascript']").eq(12).get().map(m => {
					if ((m.children && m.children[0] && m.children[0].data) !== undefined) {
						const parse = m.children[0].data;
						const comment = /"commentCount":(.*?),/g.exec(parse)[0];
						const vote = /"voteCount":(.*?),/g.exec(parse)[0] + " vote";
						const reading = /"readCount":(.*?),/g.exec(parse)[0] + " kali dibaca";
						return { comment, vote, reading };
					} else {
						reject(undefined);
					}
				});
				let reading, vote, comment;
				const story = $("pre").get().map(m => $(m).find("p").text());
				$("div.story-stats").get().map(m => {
					reading = $(m).find("span.reads").attr("title");
					vote = $(m).find("span.votes").attr("title");
					comment = $(m).find("span.comments > a").text().trim();
				});
				const nextPage = $("link[rel=\"next\"]").attr("href");
				const result = {
					title: $("html > head > title").text(),
					thumb: $("span.cover > img").attr("src"),
					author_name: $("span.author").text().split(" ")[1],
					reading: reading ? reading : aliases[0].reading,
					vote: vote ? vote : aliases[0].vote,
					comment: comment ? comment : aliases[0].comment,
					next_page: nextPage ? nextPage : "End Page",
					story: story[0].trim()
				};
				resolve(result);
			}).catch(reject);
		});
	}
}

module.exports = { Wattpad };