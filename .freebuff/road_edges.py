from PIL import Image

im = Image.open('My/HOMEPAGE.png').convert('RGB')
W, H = im.size
px = im.load()

def is_road(x, y):
    r, g, b = px[x, y]
    return 30 <= r <= 120 and 30 <= g <= 120 and 30 <= b <= 120 and (max(r,g,b) - min(r,g,b)) < 20

# scan rows from y=540 to bottom; find the road run containing x=772
lefts, rights = [], []
for y in range(540, H - 4, 40):
    if not is_road(772, y):
        # search nearby for road center
        found = False
        for dx in range(0, 60, 6):
            for cx in (772 - dx, 772 + dx):
                if is_road(cx, y): lefts.append(None); found = True; break
            if found: break
        if not found:
            continue
    # walk left
    l = 772
    while l > 0 and is_road(l, y): l -= 1
    rgt = 772
    while rgt < W - 1 and is_road(rgt, y): rgt += 1
    lefts.append((y, l)); rights.append((y, rgt))

print('left edge samples :', lefts)
print('right edge samples:', rights)
