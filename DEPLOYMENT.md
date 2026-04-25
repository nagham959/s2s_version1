# Frontend deployment

This app is published as a Docker image to GitHub Container Registry.

Default production image:

```text
ghcr.io/hedra-nabil/s2sai-frontend:latest
```

## Build and push from Windows

Run from this `web_app` directory:

```powershell
docker login ghcr.io -u Hedra-Nabil

$env:GHCR_OWNER = "hedra-nabil"
$env:TAG = "latest"
$env:FRONTEND_API_BASE_URL = "https://api.s2sai.online"

powershell -ExecutionPolicy Bypass -File .\scripts\build-push-ghcr.ps1
```

Expected output:

```text
FRONTEND_IMAGE=ghcr.io/hedra-nabil/s2sai-frontend:latest
```

## Update from Portainer

After pushing the image:

```text
1. Open Portainer over Tailscale.
2. Go to Containers.
3. Select the frontend container.
4. Recreate the container and enable pulling the latest image.
5. Check Dozzle logs if the container does not become healthy.
```

The server compose file must point to the same image name:

```env
FRONTEND_IMAGE=ghcr.io/hedra-nabil/s2sai-frontend:latest
```
