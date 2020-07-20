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
    title = TextLorem(srange=(3, 11)).sentence()[:-1]

    filename = FILENAME_TMPL.format(
        date=date.strftime("%Y-%m-%d"), title=title.replace(" ", "-").lower()
    )

    # inject front matter
    front_matter = [
        "title: " + title,
        "date: " + date.strftime("%Y-%m-%d %H:%M:%S"),
        "comments: false",
    ]

    if random.randint(0, 100) < 40:
        front_matter.extend(
            [
                "image: https://source.unsplash.com/random/1280x720?random="
                + str(random.randint(0, 9999)),
                "image-alt: random image",
            ]
        )

    if random.randint(0, 100) < 10:
        front_matter.append("featured: true")

    front_matter = ["---", *front_matter, "---\n"]

    body = []

    # make random paragraphs
    for _ in range(PARAGRAPHS):
        paragraph = [lorem.paragraph(), ""]
        body.extend(paragraph)

    # randomly insert image
    image_idx = random.randint(0, len(body) - 1)
    image = [
        "![random image](https://source.unsplash.com/random/700x500)",
        TextLorem(srange=(4, 9)).sentence(),
        r"{:.caption}",
    ]

    if image_idx != 0 and body[image_idx - 1] != "":
        image.insert(0, "")
    if body[image_idx] != "" and image_idx != len(body) - 1:
        image.append("")

    for l in reversed(image):
        body.insert(image_idx, l)

    # build lines
    lines = [*front_matter]

    for l in body:
        ll = textwrap.wrap(l, width=80) if l != "" else [""]
        lines.extend(ll)

    # make each line end with linefeed
    for j in range(len(lines) - 1):
        lines[j] += "\n"

    # write post to disk
    with open(filename, "w") as f:
        f.writelines(lines)
