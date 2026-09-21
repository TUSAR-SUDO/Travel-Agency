from PIL import Image

im = Image.open('My/HOMEPAGE.png').convert('RGB')
W, H = im.size
px = im.load()

def runs_x(y, thresh):
    runs, start = [], None
    for x in range(W):
        r, g, b = px[x, y]
        w = min(r, g, b) > thresh
        if w and start is None: start = x
        if not w and start is not None:
            if x - start >= 2: runs.append(round((start + x - 1) / 2))
            start = None
    if start is not None: runs.append(round((start + W - 1) / 2))
    return runs

def runs_y(x, thresh):
    runs, start = [], None
    for y in range(H):
        r, g, b = px[x, y]
        w = min(r, g, b) > thresh
        if w and start is None: start = y
        if not w and start is not None:
            if y - start >= 2: runs.append(round((start + y - 1) / 2))
            start = None
    if start is not None: runs.append(round((start + H - 1) / 2))
    return runs

for t in (215, 200, 185):
    print('thresh', t)
    print('  top y=20   :', runs_x(20, t))
    print('  bottom H-20:', runs_x(H - 20, t))
    print('  left x=20  :', runs_y(20, t))
    print('  right W-20 :', runs_y(W - 20, t))
