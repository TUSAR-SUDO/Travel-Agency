from PIL import Image, ImageDraw
import math

im = Image.open('My/HOMEPAGE.png').convert('RGB')
W, H = im.size
px = im.load()
HUB = (772, 502)

def white_score(adeg, band=8, thresh=222):
    a = math.radians(adeg)
    pa = a + math.pi / 2
    tot = hit = 0
    for rr in range(100, 700, 6):
        x = HUB[0] + rr * math.cos(a)
        y = HUB[1] + rr * math.sin(a)
        if not (0 <= x < W and 0 <= y < H):
            break
        b = 0
        for d in range(-band, band + 1, 2):
            sx = int(x + d * math.cos(pa)); sy = int(y + d * math.sin(pa))
            if 0 <= sx < W and 0 <= sy < H:
                r, g, bl = px[sx, sy]
                v = min(r, g, bl)
                if v > b: b = v
        tot += 1
        if b > thresh: hit += 1
    return hit / max(tot, 1)

def refine(a0, span=14, steps=(3, 1.5, 0.75, 0.3)):
    best_a, best_s = a0, white_score(a0)
    a = a0
    for step in steps:
        improved = True
        while improved:
            improved = False
            for da in (step, -step):
                if abs(a + da - a0) <= span:
                    s = white_score(a + da)
                    if s > best_s + 0.004:
                        best_s, a = s, a + da
                        improved = True
    return round(a, 2), round(best_s, 2)

# corrected initial guesses from the visual
rays = [
    ('himalaya|taj',   245.0),
    ('taj|amer',       302.0),
    ('amer|waterfall', 330.5),
    ('waterfall|tiger',352.0),
    ('tiger|maldives',  15.0),
    ('dal|temple',     196.5),
    ('temple|streets', 166.0),
    ('himalaya|dal',   199.0),
    ('roadL',          150.0),
    ('roadR',           33.0),
]
out = []
for label, a0 in rays:
    a, s = refine(a0)
    out.append((label, a, s))
    print(label, '->', a, 'score', s)

d = ImageDraw.Draw(im)
for label, a, s in out:
    rad = math.radians(a)
    d.line([HUB, (HUB[0] + 950 * math.cos(rad), HUB[1] + 950 * math.sin(rad))],
           fill=(255, 0, 255) if s > 0.45 else (0, 160, 255), width=3)
im.save('.freebuff/rays2.png')
im2 = im.copy(); im2.thumbnail((900, 900)); im2.save('.freebuff/rays2_small.jpg', quality=85)
