package smiley

import "regexp"

/*
Honestly I really hate regular expression and it's quited hard for me to solve it.
Even though I solved this problem, I still hate it LOL

# I used regex101.com to make line by line to understand how it works

/^[:;][-~]?[)D]$/gm

^ asserts position at start of a line

	Match a single character present in the list below [:;]
	    :; matches a single character in the list :; (case sensitive)
	Match a single character present in the list below [-~]
	    ? matches the previous token between zero and one times, as many times as possible, giving back as needed (greedy)
	    -~ matches a single character in the list -~ (case sensitive)
	Match a single character present in the list below [)D]
	    )D matches a single character in the list )D (case sensitive)

$ asserts position at the end of a line

	Global pattern flags
	g modifier: global. All matches (don't return after first match)
	m modifier: multi line. Causes ^ and $ to match the begin/end of each line (not only begin/end of string)
*/
func SmileyExpression(arr []string) int {
	regex := regexp.MustCompile(`^[:;][-~]?[)D]$`)
	count := 0

	for _, face := range arr {
		if regex.MatchString(face) {
			count++
		}
	}

	return count
}

func Smiley(arr []string) int {
	count := 0

	for _, face := range arr {
		length := len(face)

		if length == 2 {
			// Format: eyes + mouth
			if (face[0] == ':' || face[0] == ';') &&
				(face[1] == ')' || face[1] == 'D') {
				count++
			}
		} else if length == 3 {
			// Format: eyes + nose + mouth
			if (face[0] == ':' || face[0] == ';') &&
				(face[1] == '-' || face[1] == '~') &&
				(face[2] == ')' || face[2] == 'D') {
				count++
			}
		}
	}

	return count

}
