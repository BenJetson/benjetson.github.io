#!/usr/bin/env python3

from datetime import datetime, timedelta
from lorem.text import TextLorem
import lorem
import os
import random
import textwrap

POST_COUNT = 50
PARAGRAPHS = 7
START_DATE = datetime.strptime("2017/01/01", "%Y/%m/%d")
FILENAME_TMPL = "{date}-{title}.gen.md"

os.chdir("_posts")

for i in range(POST_COUNT):
    date = START_DATE + timedelta(days=i)
    title = TextLorem(srange=(3, 3)).sentence()[:-1]

    filename = FILENAME_TMPL.format(
        date=date.strftime("%Y-%m-%d"), title=title.replace(" ", "-").lower()
    )

    # inject front matter
    lines = [
        "---",
        "title: " + title,
        "date: " + date.strftime("%Y-%m-%d %H:%M:%S -0500"),
        "---\n",
    ]

    # make random paragraphs
    for _ in range(PARAGRAPHS):
        paragraph = lorem.paragraph()
        paragraph = textwrap.wrap(paragraph, width=80)

        paragraph.append("")

        for l in paragraph:
            lines.append(l)

    # randomly insert image
    image_idx = random.randint(4, len(lines) - 1)
    image = [
        "![random image](https://source.unsplash.com/random/700x500)",
        TextLorem(srange=(4, 9)).sentence(),
        r"{:.caption}",
    ]

    if lines[image_idx - 1] == "" or image_idx != 4:
        image.insert(0, "")
    if image_idx != len(lines) - 1 and lines[image_idx] != "":
        image.append("")

    for l in reversed(image):
        lines.insert(image_idx, l)

    # make each line end with linefeed
    for j in range(len(lines) - 1):
        lines[j] += "\n"

    with open(filename, "w") as f:
        f.writelines(lines)
