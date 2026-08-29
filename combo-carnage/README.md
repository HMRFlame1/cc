# Combo Carnage site (iframe-ready pages)

Separate pages for a Weebly menu + GitHub Pages iframe.

## Pages

| Weebly menu | File to iframe |
| --- | --- |
| Home | `index.html` |
| About | `about.html` |
| Features | `features.html` |
| Gallery | `gallery.html` |
| Play | `play.html` |

Upload the whole `combo-carnage` folder to GitHub Pages. Keep the folder structure (`css/`, `js/`, `images/`).

## Weebly iframe embed

On each Weebly page, embed **only that page**. Example for Home:

```html
<iframe
  src="https://YOURUSER.github.io/YOURREPO/index.html?embed=1"
  title="Combo Carnage Home"
  style="width:100%;height:900px;border:0;background:#070708;"
  loading="lazy"
  allow="autoplay"
></iframe>
```

Swap the file for the other pages:

- About → `about.html?embed=1`
- Features → `features.html?embed=1`
- Gallery → `gallery.html?embed=1`
- Play → `play.html?embed=1`

`?embed=1` hides the inner nav so it does not fight Weebly’s Home / About / Features / Gallery / Play menu.

## Mini-game notes

The rampage game lives only on `play.html`.

If the iframe is sandboxed, Weebly must allow scripts. Do **not** add `sandbox` unless it includes:

`allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox`

Steam links open in a new tab, so popups should be allowed.

## Images

Official Steam header + screenshots are stored in `images/`. Backgrounds use those files, not the old missing `images/hero.jpg` / `logo.png` / `street.png` paths.
