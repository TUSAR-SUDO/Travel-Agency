from PIL import Image

im = Image.open('My/HOMEPAGE.png').convert('RGB')
W, H = im.size
px = im.load()

def white_runs_along_x(y):
    runs, start = [], None
    for x in range(W):
        r, g, b = px[x, y]
        w = min(r, g, b) > 225
        if w and start is None: start = x
        if not w and start is not None:
            if x - start >= 3: runs.append((start, x - 1))
            start = None
    if start is not None: runs.append((start, W - 1))
    return [round((a + b) / 2) for a, b in runs]

def white_runs_along_y(x):
    runs, start = [], None
    for y in range(H):
        r, g, b = px[x, y]
        w = min(r, g, b) > 225
        if w and start is None: start = y
        if not w and start is not None:
            if y - start >= 3: runs.append((start, y - 1))
            start = None
    if start is not None: runs.append((start, H - 1))
    return [round((a + b) / 2) for a, b in runs]

print('TOP y=6   :', white_runs_along_x(6))
print('BOT y=H-7 :', white_runs_along_x(H - 7))
print('LEFT x=6  :', white_runs_along_y(6))
print('RIGHT x=W-7:', white_runs_along_y(W - 7))
