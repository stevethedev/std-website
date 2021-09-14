package hello_world

import "testing"

func TestHelloWorld(t *testing.T) {
	hw := GetHelloWorld()
	if hw != "Hello, world" {
		t.Fatalf(`Expected 'Hello, world', got %s`, hw)
	}
}
