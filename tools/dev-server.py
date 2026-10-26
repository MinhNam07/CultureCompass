#!/usr/bin/env python3
"""Local dev server for CultureCompass (used by `npm run dev`).

Same as `python3 -m http.server`, but tells the browser not to cache anything,
so a normal reload always shows the latest HTML, CSS, JS and data files.
Usage: python3 tools/dev-server.py [port]   (default 8765)
"""
import functools
import http.server
import os
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        self.send_header('Expires', '0')
        super().end_headers()


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8765
    root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
    handler = functools.partial(NoCacheHandler, directory=root)
    with http.server.ThreadingHTTPServer(('', port), handler) as server:
        print(f'CultureCompass running at http://localhost:{port}  (Ctrl + C to stop)', flush=True)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == '__main__':
    main()
