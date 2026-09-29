# severe-weather-

## Local development and deployment

Create a local `.env` file containing `VITE_MAPTILER_KEY=your_maptiler_key`.
Run `npm ci` and `npm run dev` to start the app.

For GitHub Pages, add a repository Actions secret named `VITE_MAPTILER_KEY`
under **Settings > Secrets and variables > Actions**. The deployment workflow
passes this secret to Vite during the build; the local `.env` is not committed
or available to GitHub Actions. Run the deployment workflow again after adding
or changing the secret.

Satellite and Dark require a valid MapTiler browser key. If the key has allowed
origin restrictions, allow your GitHub Pages origin (`https://<username>.github.io`)
as well as your local development origin. Vite embeds this key in the public
client bundle, so use a browser key with appropriate origin restrictions.
Standard and Terrain do not use this key.

Navigation uses hash routes so opening the GitHub Pages project URL displays
the map and refreshing routes such as `/#/about` works on static hosting.

## Data Sources

### AEMET SINOBAS

Spanish tornado and waterspout data used in this project is sourced from
AEMET's SINOBAS (Sistema de Notificación de Observaciones Atmosféricas Singulares).

AEMET authorizes the use and reproduction of this information when AEMET is
credited as the author.

The SINOBAS data shown in this project is used for educational and
visualization purposes only and is not intended for administrative or legal use.

The original SINOBAS data is normalized into a common tornado event format so
that additional European data sources can be added in the future.

Source: AEMET SINOBAS
