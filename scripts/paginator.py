#!/usr/bin/env python3

# This script models the logic of the paginator used on the blog page.

RANGE = 2
MAX = 23
CURRENT = 1

start = CURRENT - RANGE
end = CURRENT + RANGE

if start < 1:
    end = end + ((start * -1) + 1)
    start = 1

if end > MAX:
    start = start - (end - MAX)
    end = MAX

if start < 1:
    start = 1

paginator = "|"

if CURRENT != 1:
    paginator += " < PREV |"

if start != 1:
    paginator += " << |"
    paginator += " ... |"

for page in range(start, end + 1):
    page = page if page != CURRENT else "*{}*".format(page)
    paginator += " {} |".format(page)

if end != MAX:
    paginator += " ... |"
    paginator += " >> |"

if CURRENT != MAX:
    paginator += " NEXT > |"


# Print the paginator view and start/end.
print()
print(start, end)
print()
print(paginator)
print()
