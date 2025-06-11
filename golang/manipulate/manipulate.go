package manipulate

import "sort"

// https://www.geeksforgeeks.org/print-all-permutations-of-a-string-with-duplicates-allowed-in-input-string/
// https://www.geeksforgeeks.org/write-a-c-program-to-print-all-permutations-of-a-given-string/

func permutations(index int, sliceCharacters []rune, result *[]string) {
	if index == len(sliceCharacters)-1 {
		*result = append(*result, string(sliceCharacters))
		return
	}

	seen := make(map[rune]bool)

	for i := index; i < len(sliceCharacters); i++ {
		if seen[sliceCharacters[i]] {
			continue
		}

		// prevent duplicated
		seen[sliceCharacters[i]] = true

		// swap
		sliceCharacters[index], sliceCharacters[i] = sliceCharacters[i], sliceCharacters[index]
		permutations(index+1, sliceCharacters, result)
		sliceCharacters[index], sliceCharacters[i] = sliceCharacters[i], sliceCharacters[index]
	}

}

func Manipulate(text string) []string {
	result := []string{}
	permutations(0, []rune(text), &result)
	sort.Strings(result)

	return result
}
