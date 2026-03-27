import urllib.request as r
import urllib.error as e
try:
  r.urlopen('http://localhost:5000/prediction_insights/35')
except e.HTTPError as err:
  print(err.read().decode())
