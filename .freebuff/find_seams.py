from PIL import Image
import math

im = Image.open('My/HOMEPAGE.png').convert('RGB')
W, H = im.size
px = im.load()
hx, hy = 772, 502

def strip_max(x, y, adeg, halfw):
    a = math.radians(adeg)
    pa = a + math.pi / 2
    best = 0
    for d in range(-halfw, halfw + 1, 2):
        sx = int(x + d * math.cos(pa))
        sy = int(y + d * math.sin(pa))
        if 0 <= sx < W and 0 <= sy < H:
            r, g, b = px[sx, sy]
            v = min(r, g, b)
            if v > best:
                best = v
    return best

# angular profile: for each angle, median of strip-max over radius samples
angles = [i * 0.5 for i in range(720)]
profile = []
for adeg in angles:
    vals = []
    for rr in range(80, 620, 12):
        x = hx + rr * math.cos(math.radians(adeg))
        y = hy + rr * math.sin(math.radians(adeg))
        if 0 <= x < W and 0 <= y < H:
            vals.append(strip_max(x, y, adeg, 7))
    vals.sort()
    profile.append(vals[len(vals) // 2] if vals else 0)

# smooth, then find local maxima that stand out
def smooth(arr, k=3):
    out = []
    n = len(arr)
    for i in range(n):
        s = 0
        c = 0
        for d in range(-k, k + 1):
            s += arr[(i + d) % n]
            c += 1
        out.append(s / c)
    return out

sm = smooth(profile, 2)
seams = []
for i, v in enumerate(sm):
    neigh = [sm[(i + d) % len(sm)] for d in range(-8, 9) if d != 0]
    if v > 215 and v - sorted(neigh)[len(neigh) // 2] > 25:
        seams.append((angles[i], v))

# group consecutive
groups = []
for a, v in seams:
    if groups and a - groups[-1][-1][0] <= 1.5:
        groups[-1].append((a, v))
    else:
        groups.append([(a, v)])
centers = []
for g in groups:
    best = max(g, key=lambda t: t[1])
    centers.append(round(best[0], 1))
print('seam angles (deg):', centers)
