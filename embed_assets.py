#!/usr/bin/env python3
"""Embed styles.css and app.js into index.html for offline file:// use."""
from pathlib import Path

ROOT = Path(__file__).parent
html_path = ROOT / "index.html"
css = (ROOT / "styles.css").read_text(encoding="utf-8")
js = (ROOT / "app.js").read_text(encoding="utf-8")
html = html_path.read_text(encoding="utf-8")

style_start = html.find('<style id="embedded-styles">')
style_end = html.find("</style>", style_start)
if style_start != -1 and style_end != -1:
    html = (
        html[:style_start]
        + '<style id="embedded-styles">\n'
        + css
        + "\n</style>"
        + html[style_end + len("</style>") :]
    )

script_marker = '<script id="app-script">'
script_start = html.find(script_marker)
if script_start == -1:
    raise SystemExit("Could not find <script id=\"app-script\"> in index.html")
script_end = html.find("</script>", script_start)
if script_end == -1:
    raise SystemExit("Could not find closing </script> for app-script")

html = (
    html[:script_start]
    + script_marker
    + "\n"
    + js
    + "\n  </script>"
    + html[script_end + len("</script>") :]
)

html_path.write_text(html, encoding="utf-8")
print(f"Embedded {len(css)} bytes CSS and {len(js)} bytes JS into index.html")
