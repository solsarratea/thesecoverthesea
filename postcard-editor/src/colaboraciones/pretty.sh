#!/usr/bin/env python
"""
Convert JSON data to human-readable form.

(Reads from stdin and writes to stdout)
"""

import sys
try:
    import simplejson as json
except:
    import json

print json.dumps(json.loads(sys.stdin.read()), indent=4)
sys.exit(0)