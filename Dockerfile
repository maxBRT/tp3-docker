FROM alpine:3.19

LABEL org.opencontainers.image.source="https://github.com/maxbrt/tp3-docker"
LABEL org.opencontainers.image.description="tp3-docker placeholder image"
LABEL org.opencontainers.image.licenses="MIT"

RUN echo "tp3-docker ready"
CMD ["echo", "Hello from tp3-docker"]
