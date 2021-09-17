package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Router struct{}

func (r *Router) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	log.Printf("HTTP %s %s", req.Method, req.URL.Path)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	if err := json.NewEncoder(w).Encode("Hello, world"); err != nil {
		log.Printf("ERROR: Could not encode response: %s\n", err)
	}
}

func main() {
	listenOn := ":3000"

	r := Router{}

	log.Fatal(http.ListenAndServe(listenOn, &r))
}
