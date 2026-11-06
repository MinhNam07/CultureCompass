#!/usr/bin/env bash
# Downloads the Vietnam page photos from Wikimedia Commons (licences and credits are in
# tools/content/vietnam-*.cjs and go into assets/data/assets.json), then registers them
# and rebuilds the site.
# Run from the project root:  bash tools/fetch-photos.sh
set -euo pipefail
cd "$(dirname "$0")/.."
UA="CultureCompass/1.0 (student project; image download)"
for content in tools/content/vietnam-*.cjs; do
  node -e "require('./' + process.argv[1]).photos.forEach(p => console.log(p.file + '\t' + p.commonsFile))" "$content"
done |
while IFS=$'\t' read -r file commons; do
  if [ -s "$file" ]; then echo "have  $file"; continue; fi
  name=$(node -e "process.stdout.write(encodeURIComponent(process.argv[1].replace(/ /g,'_')))" "$commons")
  echo "get   $file"
  curl -fsSL -A "$UA" -o "$file" "https://commons.wikimedia.org/wiki/Special:FilePath/${name}?width=1600" || { echo "FAILED $commons"; rm -f "$file"; }
  sleep 1
done
node tools/content/apply-vietnam-ch3.cjs
node tools/content/apply-vietnam-ch12.cjs
npm run build
