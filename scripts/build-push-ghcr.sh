#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

if [ -z "${FRONTEND_IMAGE:-}" ]; then
  : "${GHCR_OWNER:?Set GHCR_OWNER, for example: export GHCR_OWNER=hedra-nabil}"
  GHCR_OWNER="$(printf '%s' "$GHCR_OWNER" | tr '[:upper:]' '[:lower:]')"
  TAG="${TAG:-$(git -C "$ROOT_DIR" rev-parse --short HEAD 2>/dev/null || date +%Y%m%d%H%M%S)}"
  FRONTEND_IMAGE="ghcr.io/${GHCR_OWNER}/s2sai-frontend:${TAG}"
fi

FRONTEND_IMAGE="$(printf '%s' "$FRONTEND_IMAGE" | tr '[:upper:]' '[:lower:]')"
FRONTEND_API_BASE_URL="${FRONTEND_API_BASE_URL:-https://api.s2sai.online}"

docker build \
  -f "$ROOT_DIR/Dockerfile" \
  --build-arg VITE_API_BASE_URL="$FRONTEND_API_BASE_URL" \
  -t "$FRONTEND_IMAGE" \
  "$ROOT_DIR"

if [ "${SKIP_PUSH:-0}" != "1" ]; then
  docker push "$FRONTEND_IMAGE"
fi

echo "FRONTEND_IMAGE=$FRONTEND_IMAGE"
