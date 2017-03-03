export default string => {

	if (typeof string !== 'string') return string;

	return string.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, char => {
		switch (char) {
			case '\0':
				return '\\0';
			case '\x08':
				return '\\b';
			case '\x09':
				return '\\t';
			case '\x1a':
				return '\\z';
			case '\n':
				return '\\n';
			case '\r':
				return '\\r';
			case '"':
			case '\'':
			case '\\':
			case '%':
				return '\\' + char;
			}
		});

}
