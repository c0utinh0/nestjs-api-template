docker_up:
	docker compose up -d

docker_down:
	docker compose down

.PHONY: docker_up docker_down