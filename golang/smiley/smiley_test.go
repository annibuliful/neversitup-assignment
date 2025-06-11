package smiley

import (
	"testing"
)

func TestCountSmileys(t *testing.T) {
	tests := []struct {
		name     string
		input    []string
		expected int
	}{
		{
			name:     "All valid smileys",
			input:    []string{":)", ":D", ";-D", ":~)"},
			expected: 4,
		},
		{
			name:     "All invalid smileys",
			input:    []string{";(", ":>", ":}", ":]"},
			expected: 0,
		},
		{
			name:     "Mixed valid and invalid smileys",
			input:    []string{":)", ";(", ":~D", ":}", ":)"},
			expected: 3,
		},
		{
			name:     "Only short smileys",
			input:    []string{":)", ":D", ";)"},
			expected: 3,
		},
		{
			name:     "Only long smileys",
			input:    []string{":-)", ";~D", ":-D"},
			expected: 3,
		},
		{
			name:     "Empty input",
			input:    []string{},
			expected: 0,
		},
		{
			name:     "Smileys with invalid characters",
			input:    []string{":*)", ";~]", ":--D"},
			expected: 0,
		},
		{
			name:     "Smileys with incorrect order",
			input:    []string{"D:)", ")~:", "~-;"},
			expected: 0,
		},
		{
			name:     "Edge case with similar valid formats",
			input:    []string{":)", ";)", ":~D", ";-D"},
			expected: 4,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			result := Smiley(tc.input)
			if result != tc.expected {
				t.Errorf("expected %d, got %d", tc.expected, result)
			}
		})
	}
}

func TestSmileyRegularExpression(t *testing.T) {
	tests := []struct {
		name     string
		input    []string
		expected int
	}{
		{
			name:     "All valid smileys",
			input:    []string{":)", ":D", ";-D", ":~)"},
			expected: 4,
		},
		{
			name:     "All invalid smileys",
			input:    []string{";(", ":>", ":}", ":]"},
			expected: 0,
		},
		{
			name:     "Mixed valid and invalid smileys",
			input:    []string{":)", ";(", ":~D", ":}", ":)"},
			expected: 3,
		},
		{
			name:     "Only short smileys",
			input:    []string{":)", ":D", ";)"},
			expected: 3,
		},
		{
			name:     "Only long smileys",
			input:    []string{":-)", ";~D", ":-D"},
			expected: 3,
		},
		{
			name:     "Empty input",
			input:    []string{},
			expected: 0,
		},
		{
			name:     "Smileys with invalid characters",
			input:    []string{":*)", ";~]", ":--D"},
			expected: 0,
		},
		{
			name:     "Smileys with incorrect order",
			input:    []string{"D:)", ")~:", "~-;"},
			expected: 0,
		},
		{
			name:     "Edge case with similar valid formats",
			input:    []string{":)", ";)", ":~D", ";-D"},
			expected: 4,
		},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			result := SmileyRegularExpression(tc.input)
			if result != tc.expected {
				t.Errorf("expected %d, got %d", tc.expected, result)
			}
		})
	}
}
