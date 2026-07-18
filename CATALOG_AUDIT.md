# Furniture Catalog Audit

- Total variants: 93
- Contract: Schema 1.0 · meter · floor-center · +X right / +Y up / +Z front · radian rotations
- Invalid variants: 0
- Unknown material references: none
- Unused global materials: none
- Duplicate global material definitions: none

## Variant inventory and projection review

Projection values are `[horizontal min, horizontal max, vertical min, vertical max]` in meters. Each entry was reconstructed by the React Three Fiber renderer and checked with front, side, and top geometric projections.

### 책상 (4)

- Missing style tags: none
- Missing lifestyle tags: REST

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| desk-compact | 1.2 × 0.6 × 0.73 | minimal, classic | WORK_STUDY | paintedWhite, metal, metalLight | [-0.600, 0.600, 0.000, 0.730] | [-0.300, 0.300, 0.000, 0.730] | [-0.600, 0.600, -0.300, 0.300] | pass |
| desk-storage | 1.4 × 0.62 × 0.73 | natural, classic | WORK_STUDY, STORAGE | woodLight, wood, woodDark, metal | [-0.700, 0.700, 0.000, 0.730] | [-0.310, 0.310, 0.000, 0.730] | [-0.700, 0.700, -0.310, 0.310] | pass |
| desk-corner | 1.3 × 1 × 1.42 | minimal, modern | WORK_STUDY, STORAGE, HOBBY_LEISURE | paintedWhite, metalLight | [-0.650, 0.650, 0.000, 1.420] | [-0.500, 0.500, 0.000, 1.420] | [-0.650, 0.650, -0.500, 0.500] | pass |
| desk-midcentury-glass | 1.75 × 0.74 × 0.812 | midcentury, modern | WORK_STUDY | glass, woodDark, brass | [-0.875, 0.875, 0.000, 0.812] | [-0.370, 0.370, 0.000, 0.812] | [-0.875, 0.875, -0.370, 0.370] | pass |

### 침대 (6)

- Missing style tags: none
- Missing lifestyle tags: HOBBY_LEISURE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| bed-low-platform | 0.83 × 2.05 × 0.7 | natural, minimal | REST | wood, woodLight, fabric, fabricLight, fabricDark | [-0.415, 0.415, 0.000, 0.700] | [-1.025, 1.025, 0.000, 0.700] | [-0.415, 0.415, -1.025, 1.025] | pass |
| bed-storage | 0.96 × 2.06 × 0.635 | natural, minimal | REST, STORAGE | woodLight, fabric, fabricLight, metal | [-0.480, 0.480, 0.000, 0.635] | [-1.030, 1.030, 0.000, 0.635] | [-0.480, 0.480, -1.030, 1.030] | pass |
| bed-fabric-headboard | 0.94 × 2.06 × 0.85 | natural, minimal | REST | fabric, fabricLight, fabricDark | [-0.470, 0.470, 0.000, 0.850] | [-1.030, 1.030, 0.000, 0.850] | [-0.470, 0.470, -1.030, 1.030] | pass |
| bed-midcentury-teal | 1.8 × 2.31 × 1.19 | midcentury, modern | REST | wood, woodDark, fabric, fabricLight, tealFabric, orangeFabric, brass | [-0.900, 0.900, 0.000, 1.190] | [-1.155, 1.155, 0.000, 1.190] | [-0.900, 0.900, -1.155, 1.155] | pass |
| bed-classic-idanaes | 1.57 × 2.22 × 1.21 | classic, natural | REST | woodDark, fabric, fabricLight, fabricDark | [-0.785, 0.785, 0.000, 1.210] | [-1.110, 1.110, 0.000, 1.210] | [-0.785, 0.785, -1.110, 1.110] | pass |
| bed-loft-desk | 2.07 × 1.04 × 1.82 | modern, minimal | REST, WORK_STUDY, STORAGE | paintedWhite, woodLight, fabric, fabricLight, metalLight | [-1.035, 1.035, 0.000, 1.820] | [-0.520, 0.520, 0.000, 1.820] | [-1.035, 1.035, -0.520, 0.520] | pass |

### 소파베드 (5)

- Missing style tags: none
- Missing lifestyle tags: WORK_STUDY

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| sofa-bed-compact | 1.42 × 1 × 0.87 | modern, minimal | REST | fabric, fabricLight, fabricDark, metal | [-0.710, 0.710, 0.000, 0.870] | [-0.500, 0.500, 0.000, 0.870] | [-0.710, 0.710, -0.500, 0.500] | pass |
| sofa-bed-folding | 2 × 0.97 × 0.9 | modern, minimal | REST | fabric, fabricLight, metal, metalLight | [-1.000, 1.000, 0.000, 0.900] | [-0.485, 0.485, 0.000, 0.900] | [-1.000, 1.000, -0.485, 0.485] | pass |
| sofa-bed-daybed | 2.05 × 0.87 × 0.63 | modern, minimal | REST | paintedWhite, fabric, fabricLight, fabricDark, metalLight | [-1.025, 1.025, 0.000, 0.630] | [-0.435, 0.435, 0.000, 0.630] | [-1.025, 1.025, -0.435, 0.435] | pass |
| sofa-bed-midcentury-orange | 1.89 × 1.02 × 0.88 | midcentury, modern | REST, HOBBY_LEISURE | woodDark, orangeFabric, orangeFabricDark, brass | [-0.945, 0.945, 0.000, 0.880] | [-0.510, 0.510, 0.000, 0.880] | [-0.945, 0.945, -0.510, 0.510] | pass |
| sofa-bed-classic-storage | 2.09 × 0.89 × 0.83 | classic, natural | REST, STORAGE, HOBBY_LEISURE | paintedWhite, woodLight, fabric, fabricLight, metalLight | [-1.045, 1.045, 0.000, 0.830] | [-0.445, 0.445, 0.000, 0.830] | [-1.045, 1.045, -0.445, 0.445] | pass |

### 협탁 (5)

- Missing style tags: none
- Missing lifestyle tags: WORK_STUDY, HOBBY_LEISURE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nightstand-drawer | 0.35 × 0.426 × 0.49 | minimal, natural | REST, STORAGE | woodLight, metalLight | [-0.175, 0.175, 0.000, 0.490] | [-0.213, 0.213, 0.000, 0.490] | [-0.175, 0.175, -0.213, 0.213] | pass |
| nightstand-open | 0.37 × 0.28 × 0.45 | minimal, natural | REST, STORAGE | metal, metalLight | [-0.185, 0.185, 0.000, 0.450] | [-0.140, 0.140, 0.000, 0.450] | [-0.185, 0.185, -0.140, 0.140] | pass |
| nightstand-round | 0.45 × 0.45 × 0.53 | minimal, natural | REST, STORAGE | metal, metalLight | [-0.225, 0.225, 0.000, 0.530] | [-0.225, 0.225, 0.000, 0.530] | [-0.225, 0.225, -0.225, 0.225] | pass |
| nightstand-classic-gullaberg | 0.53 × 0.43 × 0.69 | classic, natural | REST, STORAGE | mustardPaint, woodDark | [-0.265, 0.265, 0.000, 0.690] | [-0.215, 0.215, 0.000, 0.690] | [-0.265, 0.265, -0.215, 0.215] | pass |
| nightstand-midcentury-trolley | 0.32 × 0.32 × 0.4 | midcentury, modern | REST, STORAGE | redPlastic, redVinyl | [-0.160, 0.160, 0.000, 0.400] | [-0.160, 0.160, 0.000, 0.400] | [-0.160, 0.160, -0.160, 0.160] | pass |

### 책상 의자 (6)

- Missing style tags: none
- Missing lifestyle tags: REST, STORAGE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| chair-basic | 0.46 × 0.54 × 0.8 | modern, minimal | WORK_STUDY | metal, woodLight | [-0.230, 0.230, 0.000, 0.800] | [-0.270, 0.270, 0.000, 0.800] | [-0.230, 0.230, -0.270, 0.270] | pass |
| chair-armrest | 0.71 × 0.71 × 1.14 | modern, minimal | WORK_STUDY | metal, metalLight, fabric, fabricDark | [-0.355, 0.355, 0.000, 1.140] | [-0.355, 0.355, 0.000, 1.140] | [-0.355, 0.355, -0.355, 0.355] | pass |
| chair-compact-swivel | 0.67 × 0.67 × 0.9 | modern, minimal | WORK_STUDY | metal, metalLight, fabric, fabricDark | [-0.335, 0.335, 0.000, 0.900] | [-0.335, 0.335, 0.000, 0.900] | [-0.335, 0.335, -0.335, 0.335] | pass |
| chair-classic-tonstad | 0.42 × 0.56 × 0.86 | classic, natural | WORK_STUDY | woodLight, woodDark, fabricDark | [-0.210, 0.210, 0.000, 0.860] | [-0.280, 0.280, 0.000, 0.860] | [-0.210, 0.210, -0.280, 0.280] | pass |
| chair-gaming-matchspel | 0.66 × 0.66 × 1.32 | modern, minimal | WORK_STUDY, HOBBY_LEISURE | metal, metalLight, fabric, fabricLight, fabricDark | [-0.330, 0.330, 0.000, 1.320] | [-0.330, 0.330, 0.000, 1.320] | [-0.330, 0.330, -0.330, 0.330] | pass |
| chair-midcentury-shell | 0.56 × 0.54 × 0.88 | midcentury, modern | WORK_STUDY, HOBBY_LEISURE | woodDark, chrome, tealFabric, fabricLight | [-0.280, 0.280, 0.000, 0.880] | [-0.270, 0.270, 0.000, 0.880] | [-0.280, 0.280, -0.270, 0.270] | pass |

### 책장/오픈 선반 (5)

- Missing style tags: none
- Missing lifestyle tags: none

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| bookshelf-low | 0.8 × 0.28 × 1.06 | minimal, modern | STORAGE, WORK_STUDY | wood, woodLight, woodDark | [-0.400, 0.400, 0.000, 1.060] | [-0.140, 0.140, 0.000, 1.060] | [-0.400, 0.400, -0.140, 0.140] | pass |
| bookshelf-high | 0.8 × 0.28 × 2.02 | minimal, modern | STORAGE, WORK_STUDY | wood, woodLight, woodDark | [-0.400, 0.400, 0.000, 2.020] | [-0.140, 0.140, 0.000, 2.020] | [-0.400, 0.400, -0.140, 0.140] | pass |
| bookshelf-double-open | 0.765 × 0.39 × 1.465 | minimal, modern | STORAGE, WORK_STUDY | wood, woodLight, woodDark | [-0.383, 0.383, 0.000, 1.465] | [-0.195, 0.195, 0.000, 1.465] | [-0.383, 0.383, -0.195, 0.195] | pass |
| bookshelf-classic-havsta | 1.21 × 0.37 × 1.34 | classic, natural | STORAGE, REST, HOBBY_LEISURE | paintedWhite, glass, metalLight | [-0.605, 0.605, 0.000, 1.340] | [-0.185, 0.185, 0.000, 1.340] | [-0.605, 0.605, -0.185, 0.185] | pass |
| bookshelf-midcentury-stockholm | 1.524 × 0.381 × 1.8034 | midcentury, modern | STORAGE, HOBBY_LEISURE | chrome, gentianBlueMetal | [-0.762, 0.762, 0.000, 1.803] | [-0.191, 0.191, 0.000, 1.803] | [-0.762, 0.762, -0.191, 0.191] | pass |

### 모니터 (4)

- Missing style tags: natural, classic, midcentury
- Missing lifestyle tags: REST, STORAGE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| monitor-basic | 0.556 × 0.181 × 0.417 | modern, minimal | WORK_STUDY | metal, metalLight, screenFrame, screen | [-0.278, 0.278, 0.000, 0.417] | [-0.090, 0.090, 0.000, 0.417] | [-0.278, 0.278, -0.090, 0.090] | pass |
| monitor-ultrawide | 0.809 × 0.223 × 0.483 | modern, minimal | WORK_STUDY | metal, metalLight, screenFrame, screen | [-0.405, 0.405, 0.000, 0.483] | [-0.112, 0.112, 0.000, 0.483] | [-0.405, 0.405, -0.112, 0.112] | pass |
| monitor-dual | 1.132 × 0.181 × 0.417 | modern, minimal | WORK_STUDY | metal, metalLight, screenFrame, screen | [-0.566, 0.566, 0.000, 0.417] | [-0.090, 0.090, 0.000, 0.417] | [-0.566, 0.566, -0.090, 0.090] | pass |
| monitor-gaming-odyssey | 0.7142 × 0.2635 × 0.5819 | modern, minimal | WORK_STUDY, HOBBY_LEISURE | metal, metalLight, screenFrame, screen, brass | [-0.357, 0.357, 0.000, 0.582] | [-0.132, 0.132, 0.000, 0.582] | [-0.357, 0.357, -0.132, 0.132] | pass |

### 옷장 (5)

- Missing style tags: midcentury
- Missing lifestyle tags: REST, WORK_STUDY, HOBBY_LEISURE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| wardrobe-hinged | 0.79 × 0.55 × 1.76 | minimal, modern | STORAGE | wood, woodLight, woodDark, metal | [-0.395, 0.395, 0.000, 1.760] | [-0.275, 0.275, 0.000, 1.760] | [-0.395, 0.395, -0.275, 0.275] | pass |
| wardrobe-sliding | 1.17 × 0.55 × 1.76 | minimal, modern | STORAGE | wood, woodLight, woodDark, metal, metalLight | [-0.585, 0.585, 0.000, 1.760] | [-0.275, 0.275, 0.000, 1.760] | [-0.585, 0.585, -0.275, 0.275] | pass |
| wardrobe-open | 0.99 × 0.51 × 1.73 | minimal, modern | STORAGE | woodLight, metal, metalLight | [-0.495, 0.495, 0.000, 1.730] | [-0.255, 0.255, 0.000, 1.730] | [-0.495, 0.495, -0.255, 0.255] | pass |
| wardrobe-natural-nordkisa | 1.2 × 0.47 × 1.86 | natural, minimal | STORAGE | wood, woodLight, woodDark, metalLight | [-0.600, 0.600, 0.000, 1.860] | [-0.235, 0.235, 0.000, 1.860] | [-0.600, 0.600, -0.235, 0.235] | pass |
| wardrobe-classic-gullaberg | 1.28 × 0.64 × 2.01 | classic, natural | STORAGE | paintedWhite, wood, mirror | [-0.640, 0.640, 0.000, 2.010] | [-0.320, 0.320, 0.000, 2.010] | [-0.640, 0.640, -0.320, 0.320] | pass |

### 서랍장 (4)

- Missing style tags: midcentury
- Missing lifestyle tags: REST, WORK_STUDY, HOBBY_LEISURE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| drawer-chest-low-wide | 1.4 × 0.4 × 0.72 | minimal, modern | STORAGE | wood, woodLight, metal | [-0.700, 0.700, 0.000, 0.720] | [-0.200, 0.200, 0.000, 0.720] | [-0.700, 0.700, -0.200, 0.200] | pass |
| drawer-chest-vertical | 0.7 × 0.4 × 1.12 | minimal, modern | STORAGE | wood, woodLight, woodDark, metal | [-0.350, 0.350, 0.000, 1.120] | [-0.200, 0.200, 0.000, 1.120] | [-0.350, 0.350, -0.200, 0.200] | pass |
| drawer-chest-bedside | 0.35 × 0.4 × 0.49 | minimal, modern | STORAGE | wood, woodLight, woodDark, metal | [-0.175, 0.175, 0.000, 0.490] | [-0.200, 0.200, 0.000, 0.490] | [-0.175, 0.175, -0.200, 0.200] | pass |
| drawer-chest-classic-gullaberg | 0.89 × 0.48 × 1.22 | classic, natural | STORAGE | paintedWhite, wood | [-0.445, 0.445, 0.000, 1.220] | [-0.240, 0.240, 0.000, 1.220] | [-0.445, 0.445, -0.240, 0.240] | pass |

### 행거 (4)

- Missing style tags: classic, midcentury
- Missing lifestyle tags: REST, WORK_STUDY, HOBBY_LEISURE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| hanger-basic | 1.11 × 0.51 × 1.75 | minimal, modern | STORAGE | paintedWhite, metal, metalLight | [-0.555, 0.555, 0.000, 1.750] | [-0.255, 0.255, 0.000, 1.750] | [-0.555, 0.555, -0.255, 0.255] | pass |
| hanger-shelf | 0.9 × 0.36 × 1.75 | minimal, modern | STORAGE | woodDark, woodLight, metal, metalLight | [-0.450, 0.450, 0.000, 1.750] | [-0.180, 0.180, 0.000, 1.750] | [-0.450, 0.450, -0.180, 0.180] | pass |
| hanger-corner | 0.8 × 0.8 × 1.75 | minimal, modern | STORAGE | metal, metalLight | [-0.400, 0.400, 0.000, 1.750] | [-0.400, 0.400, 0.000, 1.750] | [-0.400, 0.400, -0.400, 0.400] | pass |
| hanger-natural-morsning | 0.54 × 0.47 × 1.39 | natural, minimal | STORAGE | wood, woodLight | [-0.270, 0.270, 0.000, 1.390] | [-0.235, 0.235, 0.000, 1.390] | [-0.270, 0.270, -0.235, 0.235] | pass |

### 소파 (5)

- Missing style tags: minimal
- Missing lifestyle tags: WORK_STUDY, STORAGE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| sofa-single | 0.93 × 0.99 × 0.83 | modern, natural | REST, HOBBY_LEISURE | metal, fabric, fabricLight, fabricDark | [-0.465, 0.465, 0.000, 0.830] | [-0.495, 0.495, 0.000, 0.830] | [-0.465, 0.465, -0.495, 0.495] | pass |
| sofa-two-seat | 1.21 × 0.78 × 0.68 | modern, natural | REST, HOBBY_LEISURE | woodDark, fabric, fabricLight, fabricDark | [-0.605, 0.605, 0.000, 0.680] | [-0.390, 0.390, 0.000, 0.680] | [-0.605, 0.605, -0.390, 0.390] | pass |
| sofa-modular | 1.4 × 0.95 × 0.71 | modern, natural | REST, HOBBY_LEISURE | fabric, fabricLight, fabricDark | [-0.700, 0.700, 0.000, 0.710] | [-0.475, 0.475, 0.000, 0.710] | [-0.700, 0.700, -0.475, 0.475] | pass |
| sofa-classic-ektorp | 2.18 × 0.88 × 0.88 | classic, natural | REST, HOBBY_LEISURE | fabric, fabricLight, fabricDark | [-1.090, 1.090, 0.000, 0.880] | [-0.440, 0.440, 0.000, 0.880] | [-1.090, 1.090, -0.440, 0.440] | pass |
| sofa-midcentury-stockholm | 1.32 × 0.74 × 0.79 | midcentury, modern | REST, HOBBY_LEISURE | chrome, metal, redVinyl, yellowVinyl, tealFabric, blueVinyl, orangeFabric | [-0.660, 0.660, 0.000, 0.790] | [-0.370, 0.370, 0.000, 0.790] | [-0.660, 0.660, -0.370, 0.370] | pass |

### 사이드 테이블 (4)

- Missing style tags: classic
- Missing lifestyle tags: WORK_STUDY

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| side-table-round | 0.49 × 0.49 × 0.51 | minimal, natural | REST, HOBBY_LEISURE | wood, woodLight, woodDark | [-0.245, 0.245, 0.000, 0.510] | [-0.245, 0.245, 0.000, 0.510] | [-0.245, 0.245, -0.245, 0.245] | pass |
| side-table-coffee | 0.9 × 0.55 × 0.45 | minimal, natural | REST, HOBBY_LEISURE | wood, woodLight, woodDark | [-0.450, 0.450, 0.000, 0.450] | [-0.275, 0.275, 0.000, 0.450] | [-0.450, 0.450, -0.275, 0.275] | pass |
| side-table-storage | 0.8 × 0.31 × 0.52 | minimal, natural | REST, STORAGE | wood, woodLight, woodDark | [-0.400, 0.400, 0.000, 0.520] | [-0.155, 0.155, 0.000, 0.520] | [-0.400, 0.400, -0.155, 0.155] | pass |
| side-table-midcentury-stockholm | 0.48 × 0.48 × 0.51 | midcentury, modern | REST, HOBBY_LEISURE | transparentAmberPlastic, redPlastic | [-0.240, 0.240, 0.000, 0.510] | [-0.240, 0.240, 0.000, 0.510] | [-0.240, 0.240, -0.240, 0.240] | pass |

### TV (4)

- Missing style tags: classic, midcentury
- Missing lifestyle tags: REST, WORK_STUDY, STORAGE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| tv-small | 0.7374 × 0.1505 × 0.4654 | modern, minimal | HOBBY_LEISURE | metal, metalLight, screenFrame, screen | [-0.369, 0.369, 0.000, 0.465] | [-0.075, 0.075, 0.000, 0.465] | [-0.369, 0.369, -0.075, 0.075] | pass |
| tv-medium | 0.9675 × 0.191 × 0.6097 | modern, minimal | HOBBY_LEISURE | metal, metalLight, screenFrame, screen | [-0.484, 0.484, 0.000, 0.610] | [-0.096, 0.096, 0.000, 0.610] | [-0.484, 0.484, -0.096, 0.096] | pass |
| tv-wide | 1.2341 × 0.237 × 0.758 | modern, minimal | HOBBY_LEISURE | metal, metalLight, screenFrame, screen | [-0.617, 0.617, 0.000, 0.758] | [-0.118, 0.118, 0.000, 0.758] | [-0.617, 0.617, -0.118, 0.118] | pass |
| tv-natural-frame | 0.9695 × 0.1968 × 0.5919 | modern, natural | HOBBY_LEISURE | metal, woodLight, screenFrame, screen | [-0.485, 0.485, 0.000, 0.592] | [-0.098, 0.098, 0.000, 0.592] | [-0.485, 0.485, -0.098, 0.098] | pass |

### TV장/미디어 콘솔 (4)

- Missing style tags: natural, classic
- Missing lifestyle tags: REST, WORK_STUDY

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| media-console-low | 1.2 × 0.35 × 0.36 | minimal, modern | STORAGE, HOBBY_LEISURE | wood, woodLight, woodDark | [-0.600, 0.600, 0.000, 0.360] | [-0.175, 0.175, 0.000, 0.360] | [-0.600, 0.600, -0.175, 0.175] | pass |
| media-console-drawer | 1.2 × 0.42 × 0.48 | minimal, modern | STORAGE, HOBBY_LEISURE | wood, woodLight, woodDark, metal | [-0.600, 0.600, 0.000, 0.480] | [-0.210, 0.210, 0.000, 0.480] | [-0.600, 0.600, -0.210, 0.210] | pass |
| media-console-open | 1.2 × 0.4 × 0.64 | minimal, modern | STORAGE, HOBBY_LEISURE | wood, woodLight, woodDark, metal | [-0.600, 0.600, 0.000, 0.640] | [-0.200, 0.200, 0.000, 0.640] | [-0.600, 0.600, -0.200, 0.200] | pass |
| media-console-midcentury-stockholm | 1.27 × 0.381 × 0.6604 | midcentury, modern | STORAGE, HOBBY_LEISURE | chrome, goldenYellowMetal | [-0.635, 0.635, 0.000, 0.660] | [-0.191, 0.191, 0.000, 0.660] | [-0.635, 0.635, -0.191, 0.191] | pass |

### 다용도 테이블 (4)

- Missing style tags: midcentury
- Missing lifestyle tags: REST

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| multi-table-compact | 0.67 × 0.67 × 0.73 | minimal, modern | WORK_STUDY, HOBBY_LEISURE | metal, woodLight | [-0.335, 0.335, 0.000, 0.730] | [-0.335, 0.335, 0.000, 0.730] | [-0.335, 0.335, -0.335, 0.335] | pass |
| multi-table-two-seat | 0.8 × 0.6 × 0.75 | minimal, modern | WORK_STUDY, HOBBY_LEISURE | wood, woodLight, woodDark | [-0.400, 0.400, 0.000, 0.750] | [-0.300, 0.300, 0.000, 0.750] | [-0.400, 0.400, -0.300, 0.300] | pass |
| multi-table-storage | 1.26 × 0.79 × 0.9 | minimal, modern | WORK_STUDY, STORAGE | woodDark, metal, metalLight | [-0.630, 0.630, 0.000, 0.900] | [-0.395, 0.395, 0.000, 0.900] | [-0.630, 0.630, -0.395, 0.395] | pass |
| multi-table-gateleg | 1.52 × 0.8 × 0.74 | classic, natural | STORAGE, HOBBY_LEISURE | wood, woodLight, woodDark, metal | [-0.760, 0.760, 0.000, 0.740] | [-0.400, 0.400, 0.000, 0.740] | [-0.760, 0.760, -0.400, 0.400] | pass |

### 파티션·양면 선반 (4)

- Missing style tags: classic, midcentury
- Missing lifestyle tags: REST

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| partition-shelf-slim | 1.5 × 0.32 × 1.41 | modern, minimal | STORAGE, WORK_STUDY | metal, wood, woodLight, woodDark | [-0.750, 0.750, 0.000, 1.410] | [-0.160, 0.160, 0.000, 1.410] | [-0.750, 0.750, -0.160, 0.160] | pass |
| partition-shelf-translucent | 1.52 × 0.3 × 1.52 | modern, minimal | STORAGE, WORK_STUDY | paintedWhite, screenFrame | [-0.760, 0.760, 0.000, 1.520] | [-0.150, 0.150, 0.000, 1.520] | [-0.760, 0.760, -0.150, 0.150] | pass |
| partition-shelf-storage | 0.77 × 0.39 × 1.49 | modern, minimal | STORAGE, WORK_STUDY | paintedWhite | [-0.385, 0.385, 0.000, 1.490] | [-0.195, 0.195, 0.000, 1.490] | [-0.385, 0.385, -0.195, 0.195] | pass |
| partition-shelf-kallax | 1.47 × 0.39 × 0.77 | minimal, natural | STORAGE, HOBBY_LEISURE | paintedWhite | [-0.735, 0.735, 0.000, 0.770] | [-0.195, 0.195, 0.000, 0.770] | [-0.735, 0.735, -0.195, 0.195] | pass |

### 러그 (4)

- Missing style tags: classic
- Missing lifestyle tags: WORK_STUDY, STORAGE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| rug-round | 1.3 × 1.3 × 0.018 | natural, minimal | REST | fabric, fabricDark | [-0.650, 0.650, 0.000, 0.018] | [-0.650, 0.650, 0.000, 0.018] | [-0.650, 0.650, -0.650, 0.650] | pass |
| rug-rectangular | 1.2 × 1.8 × 0.002 | natural, minimal | REST | fabricLight, fabricDark | [-0.600, 0.600, 0.000, 0.002] | [-0.900, 0.900, 0.000, 0.002] | [-0.600, 0.600, -0.900, 0.900] | pass |
| rug-runner | 0.7 × 1.8 × 0.006 | natural, minimal | REST | fabric, fabricLight, fabricDark | [-0.350, 0.350, 0.000, 0.006] | [-0.900, 0.900, 0.000, 0.006] | [-0.350, 0.350, -0.900, 0.900] | pass |
| rug-geometric | 1.3 × 1.6 × 0.009 | midcentury, modern | REST, HOBBY_LEISURE | fabricLight, fabricDark, tealFabric, orangeFabric, orangeFabricDark | [-0.650, 0.650, 0.000, 0.009] | [-0.800, 0.800, 0.000, 0.009] | [-0.650, 0.650, -0.800, 0.800] | pass |

### 화분 (4)

- Missing style tags: classic
- Missing lifestyle tags: WORK_STUDY, STORAGE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| plant-tabletop | 0.09667013873202057 × 0.10344419281736927 × 0.1400000007522717 | natural, minimal | REST | ceramic, soil, plantStem, plant, plantLight | [-0.048, 0.048, 0.000, 0.140] | [-0.052, 0.052, 0.000, 0.140] | [-0.048, 0.048, -0.052, 0.052] | pass |
| plant-floor | 0.32917215269250133 × 0.33407750271294784 × 0.3999999965988789 | natural, minimal | REST | terracotta, soil, plantStem, plant, plantLight | [-0.165, 0.165, 0.000, 0.400] | [-0.167, 0.167, 0.000, 0.400] | [-0.165, 0.165, -0.167, 0.167] | pass |
| plant-corner | 0.6005779884792202 × 0.6231243531863027 × 0.899999992237431 | natural, minimal | REST | ceramic, soil, plantStem, plant, plantLight | [-0.300, 0.300, 0.000, 0.900] | [-0.312, 0.312, 0.000, 0.900] | [-0.300, 0.300, -0.312, 0.312] | pass |
| plant-midcentury | 0.3418371500697426 × 0.3570907760380737 × 0.6499999931191831 | midcentury, modern | REST, HOBBY_LEISURE | redPlastic, soil, plantStem, plant, plantLight | [-0.171, 0.171, 0.000, 0.650] | [-0.179, 0.179, 0.000, 0.650] | [-0.171, 0.171, -0.179, 0.179] | pass |

### 전신거울 (4)

- Missing style tags: midcentury
- Missing lifestyle tags: WORK_STUDY

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| mirror-standing | 0.45 × 0.36 × 1.6825 | modern, minimal | STORAGE | screenFrame, metal, mirror | [-0.225, 0.225, 0.000, 1.682] | [-0.180, 0.180, 0.000, 1.682] | [-0.225, 0.225, -0.180, 0.180] | pass |
| mirror-wall | 0.42 × 0.072 × 1.55 | modern, minimal | STORAGE | screenFrame, metal, mirror | [-0.210, 0.210, 0.000, 1.550] | [-0.036, 0.036, 0.000, 1.550] | [-0.210, 0.210, -0.036, 0.036] | pass |
| mirror-storage | 0.485 × 0.36 × 1.585 | modern, minimal | STORAGE | paintedWhite, metal, mirror | [-0.242, 0.242, 0.000, 1.585] | [-0.180, 0.180, 0.000, 1.585] | [-0.242, 0.242, -0.180, 0.180] | pass |
| mirror-classic-rounded | 0.78 × 0.097 × 1.968 | classic, natural | REST, HOBBY_LEISURE | woodDark, metal, mirror | [-0.390, 0.390, 0.000, 1.968] | [-0.049, 0.049, 0.000, 1.968] | [-0.390, 0.390, -0.049, 0.049] | pass |

### 무드등 (4)

- Missing style tags: natural, classic
- Missing lifestyle tags: WORK_STUDY, STORAGE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| lamp-table | 0.28 × 0.28 × 0.46 | modern, minimal | REST | metal, metalLight, lampShade, light | [-0.140, 0.140, 0.000, 0.460] | [-0.140, 0.140, 0.000, 0.460] | [-0.140, 0.140, -0.140, 0.140] | pass |
| lamp-floor | 0.52 × 0.52 × 1.48 | modern, minimal | REST | metal, metalLight, lampShade, light | [-0.260, 0.260, 0.000, 1.480] | [-0.260, 0.260, 0.000, 1.480] | [-0.260, 0.260, -0.260, 0.260] | pass |
| lamp-indirect | 0.19 × 0.19 × 0.3745 | modern, minimal | REST | paintedWhite, ledDiffuser, light | [-0.095, 0.095, 0.000, 0.374] | [-0.095, 0.095, 0.000, 0.374] | [-0.095, 0.095, -0.095, 0.095] | pass |
| lamp-midcentury-globe | 0.28 × 0.28 × 0.285 | midcentury, modern | REST, HOBBY_LEISURE | redPlastic, ledDiffuser, light | [-0.140, 0.140, 0.000, 0.285] | [-0.140, 0.140, 0.000, 0.285] | [-0.140, 0.140, -0.140, 0.140] | pass |

### 커튼·블라인드 (4)

- Missing style tags: classic, midcentury
- Missing lifestyle tags: WORK_STUDY, STORAGE

| variantId | dimensions (W×D×H) | styleTags | lifestyleTags | Material IDs | front | side | top | QA |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| curtain-fabric | 2.96 × 0.18 × 2.54 | minimal, natural | REST | fabricDark, metal | [-1.480, 1.480, 0.000, 2.540] | [-0.090, 0.090, 0.000, 2.540] | [-1.480, 1.480, -0.090, 0.090] | pass |
| blind-roller | 1.28 × 0.1 × 1.79 | minimal, natural | REST | fabricLight, fabricDark, metal, metalLight | [-0.640, 0.640, 0.000, 1.790] | [-0.050, 0.050, 0.000, 1.790] | [-0.640, 0.640, -0.050, 0.050] | pass |
| blind-wood | 1.25 × 0.1 × 1.8 | minimal, natural | REST | wood, woodLight, woodDark, fabricDark | [-0.625, 0.625, 0.000, 1.800] | [-0.050, 0.050, 0.000, 1.800] | [-0.625, 0.625, -0.050, 0.050] | pass |
| curtain-blackout | 1.82 × 0.2 × 2.4 | modern, minimal | REST, HOBBY_LEISURE | fabricDark, metalLight | [-0.910, 0.910, 0.000, 2.400] | [-0.100, 0.100, 0.000, 2.400] | [-0.910, 0.910, -0.100, 0.100] | pass |

## Recommendation differentiation review

- These variants share the same furniture type and exact tag profile. They remain distinct by structure or dimensions, but should be differentiated by variant-specific recommendation rules if both are surfaced together:
  - bed-low-platform, bed-fabric-headboard
  - sofa-bed-compact, sofa-bed-folding, sofa-bed-daybed
  - nightstand-drawer, nightstand-open, nightstand-round
  - chair-basic, chair-armrest, chair-compact-swivel
  - bookshelf-low, bookshelf-high, bookshelf-double-open
  - monitor-basic, monitor-ultrawide, monitor-dual
  - wardrobe-hinged, wardrobe-sliding, wardrobe-open
  - drawer-chest-low-wide, drawer-chest-vertical, drawer-chest-bedside
  - hanger-basic, hanger-shelf, hanger-corner
  - sofa-single, sofa-two-seat, sofa-modular
  - side-table-round, side-table-coffee
  - tv-small, tv-medium, tv-wide
  - media-console-low, media-console-drawer, media-console-open
  - multi-table-compact, multi-table-two-seat
  - partition-shelf-slim, partition-shelf-translucent, partition-shelf-storage
  - rug-round, rug-rectangular, rug-runner
  - plant-tabletop, plant-floor, plant-corner
  - mirror-standing, mirror-wall, mirror-storage
  - lamp-table, lamp-floor, lamp-indirect
  - curtain-fabric, blind-roller, blind-wood

## Material coverage

- Referenced Material IDs (35): blueVinyl, brass, ceramic, chrome, fabric, fabricDark, fabricLight, gentianBlueMetal, glass, goldenYellowMetal, lampShade, ledDiffuser, light, metal, metalLight, mirror, mustardPaint, orangeFabric, orangeFabricDark, paintedWhite, plant, plantLight, plantStem, redPlastic, redVinyl, screen, screenFrame, soil, tealFabric, terracotta, transparentAmberPlastic, wood, woodDark, woodLight, yellowVinyl
