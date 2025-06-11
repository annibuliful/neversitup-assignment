package odd_int

import "testing"

func TestOddInt(t *testing.T) {
	tests := []struct {
		input    []int
		expected int
	}{
		{[]int{7}, 7},
		{[]int{0}, 0},
		{[]int{1, 1, 2}, 2},
		{[]int{0, 1, 0, 1, 0}, 0},
		{[]int{1, 2, 2, 3, 3, 3, 4, 3, 3, 3, 2, 2, 1}, 4},
	}

	for i, test := range tests {
		result := OddInt(test.input)
		if result != test.expected {
			t.Errorf("Test case %d failed: expected %d, got %d", i+1, test.expected, result)
		}
	}
}
