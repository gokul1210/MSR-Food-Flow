import urllib.request
import urllib.parse
import json
import re

foods = [
  'Idli', 'Dosa', 'Masala Dosa', 'Pongal (dish)', 'Puri (food)', 'Vada (food)', 'Upma', 'Appam', 'Paratha', 'Chole bhature', 'Indian filter coffee', 'Masala chai',
  'Biryani', 'Thali (meal)', 'Butter chicken', 'Paneer tikka masala', 'Dal makhani', 'Malabar matthi curry', 'Fried rice', 'Naan',
  'Tandoori chicken', 'Chicken tikka', 'Kadai paneer', 'Parotta', 'Chilli chicken', 'Noodle', 'Gobi manchurian',
  'Samosa', 'Panipuri', 'Vada pav', 'Pakora', 'Cutlet', 'French fries', 'Spring roll',
  'Gulab jamun', 'Ras malai', 'Jalebi', 'Chocolate cake', 'Ice cream', 'Falooda',
  'Tea', 'Rose milk', 'Lassi', 'Juice', 'Milkshake', 'Lemonade'
]

results = {}

for food in foods:
    url = 'https://en.wikipedia.org/wiki/' + urllib.parse.quote(food)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as response:
            html = response.read().decode('utf-8', errors='ignore')
            match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
            if match:
                results[food] = match.group(1)
    except Exception as e:
        pass

with open('scraped_images.json', 'w') as f:
    json.dump(results, f, indent=2)
print("Done scraping.")
