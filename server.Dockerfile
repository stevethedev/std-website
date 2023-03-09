FROM rust:1.67.1-alpine3.17 AS rs-builder

ARG BUILD_ARGS

WORKDIR /build/server

COPY ./server .

RUN \
    --mount=type=cache,target=/build/server/target,rw \
    cargo install --locked --path ./workspace/app


FROM alpine:3.17.2 AS runtime

COPY --from=rs-builder /usr/local/cargo/bin/app /usr/local/bin/app

EXPOSE 80

CMD ["app"]
