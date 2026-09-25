# alysibak

A business card for the terminal:

```bash
npx alysibak
```

## Publishing

The name `alysibak` was free on npm when this was written. From this folder:

```bash
npm login        # once, with your npm account
npm publish
```

To update the card, edit `card.mjs`, bump `version` in `package.json`, and
publish again. The site's content check fails if the card's email, links, or
availability drift from `src/lib/data.ts`.
