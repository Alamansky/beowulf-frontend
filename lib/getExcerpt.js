export default function getExcerpt(post, lines = 3) {
	let sentences = 0;
	let excerpt = Array.from(post)
		.map((char) => {
			if (char === '.' || char === '?' || char === '!') {
				sentences = sentences + 1;
			}
			if (sentences >= lines) {
				return null;
			}
			return char;
		})
		.join('');

	return `${excerpt}...`;
}
