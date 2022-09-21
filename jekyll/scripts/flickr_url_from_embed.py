#!/usr/bin/env python3

import pyperclip

embed_code = pyperclip.paste()

start = 0
end = -1

try:
    start = embed_code.index("https://live.staticflickr.com/")
    end = embed_code.index(".jpg") + 4
except ValueError:
    print("\n\u001b[31m⛔️ Could not find URL!\u001b[0m\n")
    raise SystemExit

flickr_url = embed_code[start:end]

pyperclip.copy(flickr_url)

print("\n\u001b[32m✅ URL Found.\u001b[0m")
print('\nℹ️  Copied "{}" to clipboard.\n'.format(flickr_url))
