_Looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)_

---

# Yaaas Bot

The only chrome extension you don't need.

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd yaaas-bot
npm install
npm run build
```

...then go to [Chrome Extensions](chrome://extensions/):

- Make sure _developer mode_ is on
- Click `Load unpacked` and select the `public` folder from the project.

The extension should now be live.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

Every time you make a change click `Update` in the chrome extensions page and the extension will grab the newest code fromt he `build` folder.

## Using TypeScript

This template comes with a script to set up a TypeScript development environment, you can run it immediately after cloning the template with:

```bash
node scripts/setupTypeScript.js
```

Or remove the script via:

```bash
rm scripts/setupTypeScript.js
```

## Deploying to the web

### With [Vercel](https://vercel.com)

Install `vercel` if you haven't already:

```bash
npm install -g vercel
```

Then, from within your project folder:

```bash
cd public
vercel deploy --name my-project
```

### With [surge](https://surge.sh/)

Install `surge` if you haven't already:

```bash
npm install -g surge
```

Then, from within your project folder:

```bash
npm run build
surge public my-project.surge.sh
```
