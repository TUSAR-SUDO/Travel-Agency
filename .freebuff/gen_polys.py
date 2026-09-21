from PIL import Image, ImageDraw

W, H = 1672, 941
HUB = (772, 502)

# seam rays: hub -> border crossings (measured)
SEAMS = {
    'himalaya|taj':      (1119, 0),     # top
    'taj|amer':          (150 + 0, None),  # right edge y=150 -> point (1672,150)
    'amer|waterfall':    (1672, 388),
    'waterfall|tiger':   (1672, 743),
    'tiger|maldives':    (1672, 900),
    'himalaya|dal':      (0, 196),      # left edge y=196
    'dal|temple':        (0, 437),
    'temple|streets':    (0, 750),
}
# road: hub -> bottom (measured approx, then validated visually)
ROAD_L = (640, 941)
ROAD_R = (985, 941)

# sectors (clockwise from top-left of top edge): each = (name, seamA, seamB or road)
# order around hub: top edge 0deg is up... use points:
def P(pt): return pt

sectors = [
    ('himalaya',  (0, 0),        (1119, 0),      'himalaya|taj'),
    ('taj',       (1119, 0),     (1672, 150),    'taj|amer'),
    ('amer-fort', (1672, 150),   (1672, 388),    'amer|waterfall'),
    ('waterfall', (1672, 388),   (1672, 743),    'waterfall|tiger'),
    ('tiger',     (1672, 743),   (1672, 900),    'tiger|maldives'),
    ('maldives',  (1672, 900),   ROAD_R,          None),
    ('streets',   ROAD_L,        (0, 941),        None),
    ('temple',    (0, 750),      ROAD_L,          None),
    ('dal-lake',  (0, 196),      (0, 750),        None),
]
# dal-lake actually spans left edge 196..437; temple 437..750; streets 750..941
sectors = [
    ('himalaya',  (0, 0),      (1119, 0)),
    ('taj',       (1119, 0),   (1672, 150)),
    ('amer-fort', (1672, 150), (1672, 388)),
    ('waterfall', (1672, 388), (1672, 743)),
    ('tiger',     (1672, 743), (1672, 900)),
    ('maldives',  (1672, 900), ROAD_R),
    ('streets',   ROAD_L,      (0, 941)),
    ('temple',    (0, 750),    ROAD_L),
    ('dal-lake',  (0, 437),    (0, 750)),
]
# dal-lake needs top bound at left y=196: split correctly:
sectors = [
    ('himalaya',  (0, 0),      (1119, 0)),
    ('taj',       (1119, 0),   (1672, 150)),
    ('amer-fort', (1672, 150), (1672, 388)),
    ('waterfall', (1672, 388), (1672, 743)),
    ('tiger',     (1672, 743), (1672, 900)),
    ('maldives',  (1672, 900), ROAD_R),
    ('streets',   ROAD_L,      (0, 941)),
    ('temple',    (0, 750),    ROAD_L),
    ('dal-lake',  (0, 437),    (0, 750)),
]

def poly(name, A, B):
    # polygon: hub -> ray to A -> border corner path -> ray to B -> hub
    # corners between A and B along the border (clockwise screen order)
    corners = []
    (ax, ay), (bx, by) = A, B
    # border walk: right edge, bottom, left, top handled by explicit corner sets
    def edge(pt):
        x, y = pt
        if x >= W - 2: return 'R'
        if y >= H - 2: return 'B'
        if x <= 2: return 'L'
        if y <= 2: return 'T'
        return None
    ea, eb = edge(A), edge(B)
    order = ['T', 'R', 'B', 'L']
    ia, ib = order.index(ea), order.index(eb)
    cur = []
    i = ia
    while True:
        cur.append(order[i])
        if order[i] == eb: break
        i = (i + 1) % 4
    for e in cur:
        if e == 'T': corners.append((W, 0))
        if e == 'R': corners.append((W, H))
        if e == 'B': corners.append((0, H))
        if e == 'L': corners.append((0, 0))
    return [HUB, A] + corners + [B, HUB]

polys = {name: poly(name, A, B) for name, A, B in sectors}

# draw for validation
im = Image.open('My/HOMEPAGE.png').convert('RGB')
d = ImageDraw.Draw(im, 'RGBA')
for name, pts in polys.items():
    d.polygon(pts, outline=(255, 0, 255, 255), width=4)
im.save('.freebuff/polys.png')
im2 = im.copy(); im2.thumbnail((900, 900)); im2.save('.freebuff/polys_small.jpg', quality=85)

# emit percentages
for name, pts in polys.items():
    s = ', '.join(f'{round(x/W*100,1)}% {round(y/H*100,1)}%' for x, y in pts)
    print(f'{name}: polygon({s})')
