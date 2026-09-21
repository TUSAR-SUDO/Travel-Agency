from PIL import Image, ImageDraw

W, H = 1672, 941
HUB = (772, 502)
ROAD_L = (640, 941)
ROAD_R = (985, 941)

# sectors clockwise starting at top-left corner, along TOP -> RIGHT -> BOTTOM -> LEFT
SECTORS = [
    ('himalaya',  (0, 0),      (1119, 0)),   # along top
    ('taj',       (1119, 0),   (1672, 150)),
    ('amer-fort', (1672, 150), (1672, 388)),
    ('waterfall', (1672, 388), (1672, 743)),
    ('tiger',     (1672, 743), (1672, 900)),
    ('maldives',  (1672, 900), (985, 941)),  # right -> bottom (road right)
    ('streets',   (640, 941),  (0, 941)),    # road left -> bottom-left
    ('temple',    (0, 750),    (640, 941)),  # along left... (from border to road)
    ('dal-lake',  (0, 196),    (0, 750)),
]
# fix orientation: sectors list must be in clockwise border order:
SECTORS = [
    ('himalaya',  (0, 0),      (1119, 0)),
    ('taj',       (1119, 0),   (1672, 150)),
    ('amer-fort', (1672, 150), (1672, 388)),
    ('waterfall', (1672, 388), (1672, 743)),
    ('tiger',     (1672, 743), (1672, 900)),
    ('maldives',  (1672, 900), (985, 941)),
    ('streets',   (640, 941),  (0, 941)),
    ('temple',    (0, 750),    (640, 941)),
    ('dal-lake',  (0, 196),    (0, 750)),
]

CORNERS = {'T': (W, 0), 'R': (W, H), 'B': (0, H), 'L': (0, 0)}

def edge_of(pt):
    x, y = pt
    if y <= 2: return 'T'
    if x >= W - 2: return 'R'
    if y >= H - 2: return 'B'
    if x <= 2: return 'L'
    raise ValueError(pt)

ORDER = ['T', 'R', 'B', 'L']  # clockwise screen order
CORNER_AFTER = {'T': (W, 0), 'R': (W, H), 'B': (0, H), 'L': (0, 0)}

def poly(A, B):
    ea, eb = edge_of(A), edge_of(B)
    ia, ib = ORDER.index(ea), ORDER.index(eb)
    # walk clockwise from ea to eb inclusive
    path = []
    i = ia
    while True:
        path.append(ORDER[i])
        if ORDER[i] == eb:
            break
        i = (i + 1) % 4
    pts = [HUB, A]
    for j, e in enumerate(path):
        if j == 0 and ea == eb:
            pass  # same edge: no corner
        elif j > 0:
            pts.append(CORNER_AFTER[path[j - 1]])
        if e == eb:
            break
    pts.append(B)
    pts.append(HUB)
    return pts

polys = {}
for name, A, B in SECTORS:
    polys[name] = poly(A, B)

im = Image.open('My/HOMEPAGE.png').convert('RGB')
d = ImageDraw.Draw(im, 'RGBA')
for name, pts in polys.items():
    d.polygon(pts, outline=(255, 0, 255, 255), width=4)
im.save('.freebuff/polys2.png')
im2 = im.copy(); im2.thumbnail((900, 900)); im2.save('.freebuff/polys2_small.jpg', quality=85)

for name, pts in polys.items():
    s = ', '.join(f'{round(x/W*100,1)}% {round(y/H*100,1)}%' for x, y in pts)
    print(f'  {name}: [{s}],')
