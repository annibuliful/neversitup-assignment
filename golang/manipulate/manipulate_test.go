package manipulate

import (
	"reflect"
	"testing"
)

func TestManipulate(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected []string
	}{
		{
			name:     "Single character",
			input:    "a",
			expected: []string{"a"},
		},
		{
			name:     "Two distinct characters",
			input:    "ab",
			expected: []string{"ab", "ba"},
		},
		{
			name:     "Three distinct characters",
			input:    "abc",
			expected: []string{"abc", "acb", "bac", "bca", "cab", "cba"},
		},
		{
			name:     "Four characters with duplicates",
			input:    "aabb",
			expected: []string{"aabb", "abab", "abba", "baab", "baba", "bbaa"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := Manipulate(tt.input)
			if !reflect.DeepEqual(result, tt.expected) {
				t.Errorf("Manipulate(%q) = %v; want %v", tt.input, result, tt.expected)
			}
		})
	}
}
