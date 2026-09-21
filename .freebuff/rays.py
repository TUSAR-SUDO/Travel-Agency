from PIL import Image, ImageDraw
import math

im = Image.open('My/HOMEPAGE.png').convert('RGB')
W, H = im.size
px = im.load()
HUB = (772, 502)

def white_score(adeg):
    a = math.radians(adeg)
    pa = a + math.pi / 2
    tot = hit = 0
    for rr in range(90, 640, 6):
        x = HUB[0] + rr * math.cos(a)
        y = HUB[1] + rr * math.sin(a)
        if not (0 <= x < W and 0 <= y < H):
            break
        best = 0
        for d in range(-7, 8, 2):
            sx = int(x + d * math.cos(pa)); sy = int(y + d * math.sin(pa))
            if 0 <= sx < W and 0 <= sy < H:
                r, g, b = px[sx, sy]
                v = min(r, g, b)
                if v > best: best = v
        tot += 1
        if best > 225: hit += 1
    return hit / max(tot, 1)

# initial guesses: [label, angle]
rays = [
    ('himalaya|taj', 245.2), ('taj|amer', 301.5), ('amer|waterfall', 328.0),
    ('waterfall|tiger', 353.0), ('tiger|maldives', 18.0),
    ('dal|temple', 188.5), ('temple|streets', 170.0), ('himalaya|dal', 202.9),
    ('roadL', 137.5), ('roadR', 42.5),
]
refined = []
for label, a0 in rays:
    best_a, best_s = a0, white_score(a0)
    a = a0
    for step in (4, 2, 1, 0.5, 0.25):
        improved = True
        while improved:
            improved = False
            for da in (step, -step):
                s = white_score(a + da)
                if s > best_s + 0.005:
                    best_s, a = s, a + da
                    improved = True
    refined.append((label, round(a, 2), round(best_s, 2)))
    print(label, '->', round(a, 2), 'score', round(best_s, 2))

d = ImageDraw.Draw(im)
for label, a, s in refined:
    rad = math.radians(a)
    x2 = HUB[0] + 900 * math.cos(rad)
    y2 = HUB[1] + 900 * math.sin(rad)
    color = (255, 0, 255) if s > 0.45 else (0, 128, 255)
    d.line([HUB, (x2, y2)], fill=color, width=3)
im.save('.freebuff/rays.png')
im2 = im.copy(); im2.thumbnail((900, 900)); im2.save('.freebuff/rays_small.jpg', quality=85)
