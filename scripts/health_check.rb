#!/usr/bin/env ruby

require 'github-pages-health-check'
require 'yaml'

# Load the site global configuration.
config = YAML.load_file("../_config.yml")

# Create a system for reporting problems.
$found_problems = false
def raise_problem(reason, details = nil)
    $found_problems = true

    puts "<!> PROBLEM: " + reason
    unless details.nil? then
        puts "    Details: " + details
    end
end

# Perform the actual health check.
puts "\n<i> Starting health check for " + config['url'] + "...\n\n"
check = GitHubPages::HealthCheck::Site.new(config['url'])

# Check the master health check valid state.
unless check.valid? then
    raise_problem("Overall configuration is invalid!", check.reason.message)
end

# Report additional problems.
unless check.domain.served_by_pages? then
    raise_problem("GitHub Pages is not serving this domain.")
end

unless check.domain.https_eligible? then
    raise_problem("Site is not HTTPS eligible.")
end

unless check.domain.https? then
    raise_problem("HTTPS is not enabled.")
end

unless check.domain.enforces_https? then
    raise_problem("HTTPS enforcement is not enabled.")
end

# End of all tests; report the final result.
if $found_problems then
    puts "\n<!> FAIL: problem(s) were detected with the site (see above).\n\n"
else
    puts "<i> PASS: no problems were found.\n\n"
end
