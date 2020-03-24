#!/usr/bin/env python3

import datetime
import frontmatter
import os
import re
import sys
import time

def print_pass(*objects, sep=' ', end='\n'):
    print("\u001b[32m", *objects, "\u001b[0m", sep=sep, end=end)

def print_warn(*objects, sep=' ', end='\n'):
    print("\u001b[33m", *objects, "\u001b[0m", sep=sep, end=end)

def print_fail(*objects, sep=' ', end='\n'):
    print("\u001b[31m", *objects, "\u001b[0m", sep=sep, end=end)

# The list list of project files that are missing the photo key.
missing_photo = []

# The list of project files that have blank photo fields.
blank_photo = []

# The list of project files that have invalid URLs for photos.
bad_photo = []

# The list of project files that are missing the date key.
missing_date = []

# The list of project files that have blank date fields.
blank_date = []

# The lsit of project files that do not have an ISO-8601 date.
bad_date = []

# The list of project files that are missing the title key.
missing_title = []

# The list of project files that do not have a title.
blank_title = []

# The list of project files that are missing the description key.
missing_description = []

# The list of project files that do not have a description.
blank_description = []

print("--- TEST STARTED ---\n")
start_time = time.monotonic()

url_validator = re.compile(
    "https:\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?")

for directory, _, files in os.walk("./_projects"):
    for f in files:
        if f.startswith("."):
            continue

        path = os.path.join(directory, f)

        with open(path, 'r') as project_file:
            metadata, _ = frontmatter.parse(project_file.read())

            # Photo checks.
            if "photo" not in metadata:
                missing_photo.append(f)
            else: 
                photo_url = metadata["photo"]

                if len(photo_url) == 0:
                    blank_photo.append(f)

                if url_validator.match(photo_url) is None:
                    bad_photo.append(f)

            # Date checks.
            if "date" not in metadata:
                missing_date.append(f)
            else:
                date = str(metadata["date"])

                if len(date) == 0:
                    blank_date.append(f)
                
                try:
                    datetime.datetime.strptime(date, "%Y-%m-%d")
                except ValueError:
                    bad_date.append(f)

            # Title checks.
            if "title" not in metadata:
                missing_title.append(f)
            else: 
                title = metadata["title"]

                if len(title) == 0:
                    blank_title.append(f)
            
            # Description checks.
            if "description" not in metadata:
                missing_description.append(f)
            else: 
                description = metadata["description"]

                if len(description) == 0:
                    blank_description.append(f)



if missing_photo:
    print_fail("⛔️ FAIL - projects have missing photo key:")
    for project in missing_photo:
        print_fail("   *", project)
else:
    print_pass("✅ PASS - all projects have photo key in front matter")

if blank_photo:
    print_fail("⛔️ FAIL - projects have blank photo fields")
    for project in blank_photo:
        print_fail("   *", project)
elif not missing_photo:
    print_pass("✅ PASS - all projects have photo field")
else:
    print_fail("⛔️ FAIL - photo field test is contingent upon its presence")

if bad_photo:
    print_fail("⛔️ FAIL - projects have bad photo URLs")
    for project in bad_photo:
        print_fail("   *", project)
elif not missing_photo and not blank_photo:
    print_pass("✅ PASS - all projects have valid photo URLs")
else:
    print_fail("⛔️ FAIL - photo URL validation is contingent upon its presence")

if missing_date:
    print_fail("⛔️ FAIL - projects have missing date key:")
    for project in missing_date:
        print_fail("   *", project)
else:
    print_pass("✅ PASS - all projects have date key in front matter")

if blank_date:
    print_fail("⛔️ FAIL - projects have blank date fields")
    for project in blank_date:
        print_fail("   *", project)
elif not missing_date:
    print_pass("✅ PASS - all projects have date field")
else:
    print_fail("⛔️ FAIL - date field test is contingent upon its presence")

if bad_date:
    print_fail("⛔️ FAIL - projects have date that does not conform to ISO 8601")
    for project in bad_date:
        print_fail("   *", project)
elif not missing_date and not blank_date:
    print_pass("✅ PASS - all projects have date that conforms to ISO 8601")
else:
    print_fail("⛔️ FAIL - date field test is contingent upon its presence")

if missing_title:
    print_fail("⛔️ FAIL - projects have missing title key:")
    for project in missing_title:
        print_fail("   *", project)
else:
    print_pass("✅ PASS - all projects have title key in front matter")

if blank_title:
    print_fail("⛔️ FAIL - projects have blank title fields")
    for project in blank_title:
        print_fail("   *", project)
elif not missing_title:
    print_pass("✅ PASS - all projects have title field")
else:
    print_fail("⛔️ FAIL - title field test is contingent upon its presence")

if missing_description:
    print_fail("⛔️ FAIL - projects have missing description key:")
    for project in missing_description:
        print_fail("   *", project)
else:
    print_pass("✅ PASS - all projects have description key in front matter")

if blank_description:
    print_fail("⛔️ FAIL - projects have blank description fields")
    for project in blank_description:
        print_fail("   *", project)
elif not missing_description:
    print_pass("✅ PASS - all projects have description field")
else:
    print_fail("⛔️ FAIL - description field test is contingent upon its presence")


retval = (
    len(missing_photo) + 
    len(blank_photo) +
    len(missing_date) + 
    len(blank_date) + 
    len(bad_date) +
    len(missing_title) +
    len(blank_title) +
    len(missing_description) +
    len(blank_description)
)

print("\n--- TEST COMPLETE ---")
end_time = time.monotonic()
print_warn("⏳ {} seconds elapsed.".format(end_time - start_time))

if retval:
    print_fail("⛔️ FAIL - found {} errors total!".format(retval))
    sys.exit(retval)
print_pass("✅ PASS - All project files meet test requirements.")
