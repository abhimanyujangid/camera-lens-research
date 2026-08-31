/* VisionBench — closure inspection calculator */

const cameraCatalog = [
  { id: "compact-2mp", name: "Example — Compact 2 MP mono", x: 1920, y: 1200, pitch: 5.86, mount: "C", fps: 60, mode: "mono", shutter: "global", bits: 12 },
  { id: "detail-5mp", name: "Example — Detail 5 MP mono", x: 2448, y: 2048, pitch: 3.45, mount: "C", fps: 35, mode: "mono", shutter: "global", bits: 12 },
  { id: "color-12mp", name: "Example — Color 12 MP", x: 4096, y: 3000, pitch: 3.45, mount: "C", fps: 24, mode: "color", shutter: "rolling", bits: 10 },
  { id: "large-20mp", name: "Example — Large-sensor 20 MP", x: 5472, y: 3648, pitch: 2.74, mount: "F", fps: 18, mode: "mono", shutter: "global", bits: 12 },
  { id: "g3-gc10-c1940", name: "Teledyne G3-GC10-C1940", x: 1936, y: 1216, pitch: 5.86, mount: "C", fps: 53, mode: "color", shutter: "global", bits: 10, manufacturer: "Teledyne DALSA", sensor: "Sony IMX174", diagonal: 13.4, interface: "1 GigE", verified: true },
  { id: "a2a2840-67g5c", name: "Basler a2A2840-67g5cBAS", x: 2840, y: 2840, pitch: 2.74, mount: "C", fps: 67, mode: "color", shutter: "global", bits: 12, manufacturer: "Basler", sensor: "Sony IMX546", diagonal: 11.0, interface: "5GigE", verified: true },
  { id: "aca1440-73gc", name: "Basler acA1440-73gc", x: 1440, y: 1080, pitch: 3.45, mount: "C", fps: 73, mode: "color", shutter: "global", bits: 12, manufacturer: "Basler", sensor: "Sony IMX273", diagonal: 6.21, interface: "GigE", verified: true },
  { id: "custom", name: "Custom camera specifications" }
];

const lensCatalog = [
  { id: "c16", name: "Example — 16 mm C-mount", focal: 16, wd: 250, fno: 8, mount: "C", circle: 12, mp: 5, type: "fixed", mag: 0.25 },
  { id: "c25", name: "Example — 25 mm C-mount", focal: 25, wd: 350, fno: 8, mount: "C", circle: 16, mp: 12, type: "fixed", mag: 0.25 },
  { id: "c35", name: "Example — 35 mm C-mount", focal: 35, wd: 500, fno: 8, mount: "C", circle: 17.6, mp: 12, type: "fixed", mag: 0.25 },
  { id: "f50", name: "Example — 50 mm F-mount", focal: 50, wd: 700, fno: 8, mount: "F", circle: 43.3, mp: 24, type: "fixed", mag: 0.25 },
  { id: "tele025", name: "Example — 0.25× telecentric", focal: 60, wd: 300, fno: 6.4, mount: "C", circle: 16, mp: 12, type: "telecentric", mag: 0.25 },
  { id: "pchi3m", name: "Opto PCHI3M — hole inspection (SACMI thread)", focal: 60, wd: 300, fno: 13, mount: "C", circle: 10, mp: 12, type: "hole-inspection", mag: 0.25, role: "thread", systemId: "system1", catalogFovW: 33, catalogFovH: 28, useCatalogGeometry: true, verified: true, notes: "Dedicated 360° cavity optic for thread/bore inspection." },
  { id: "hcsi023", name: "Opto HCSI023 — hypercentric (Basler thread)", focal: 60, wd: 92.6, fno: 13, mount: "C", circle: 6.7, mp: 12, type: "hypercentric", mag: 0.15, role: "thread", systemId: "system2", catalogFovW: 50, catalogFovH: 50, useCatalogGeometry: true, verified: true, notes: "Basler config: 50 mm Ø × 150 mm height at WD 92.6 mm." },
  { id: "pchil023", name: "Opto PCHIL023 — hole inspection (Opto thread)", focal: 60, wd: 300, fno: 13, mount: "C", circle: 6.7, mp: 12, type: "hole-inspection", mag: 0.25, role: "thread", systemId: "system3", catalogFovW: 33, catalogFovH: 28, useCatalogGeometry: true, verified: true, notes: "Verify image circle covers 1/1.2-inch sensor (13.4 mm diag)." },
  { id: "pchil013", name: "Opto PCHIL013 — hole inspection (Current thread)", focal: 60, wd: 300, fno: 13, mount: "C", circle: 3.6, mp: 5, type: "hole-inspection", mag: 0.25, role: "thread", systemId: "system4", catalogFovW: 33, catalogFovH: 28, useCatalogGeometry: true, verified: true, notes: "Designed for 1/2.9-inch sensors; matches acA1440-73gc." },
  { id: "m2514-mp2", name: "Computar M2514-MP2 — 25 mm (SACMI normal)", focal: 25, wd: 250, fno: 1.4, mount: "C", circle: 11, mp: 1.5, type: "fixed", mag: 0.25, role: "normal", systemId: "system1", verified: true, notes: "2/3-inch lens on 1/1.2-inch sensor — verify coverage/vignetting." },
  { id: "tc23048", name: "Opto TC23048 — 0.184× telecentric (Basler normal)", focal: 60, wd: 132.9, fno: 8, mount: "C", circle: 11, mp: 12, type: "telecentric", mag: 0.184, role: "normal", systemId: "system2", catalogFovW: 46.2, catalogFovH: 38.53, useCatalogGeometry: true, verified: true },
  { id: "c125-2522-5m", name: "Basler C125-2522-5M — 25 mm (Current normal)", focal: 25, wd: 250, fno: 2.2, mount: "C", circle: 7.3, mp: 5, type: "fixed", mag: 0.25, role: "normal", systemId: "system4", verified: true, notes: "1/2.5-inch lens on 1/2.9-inch sensor — verify vignetting." },
  { id: "custom", name: "Custom lens specifications" }
];

const verifiedSystems = [
  { id: "system1", label: "System 1 — SACMI", cameraId: "g3-gc10-c1940", threadLensId: "pchi3m", normalLensId: "m2514-mp2", notes: "Normal lens is 2/3-inch format on 1/1.2-inch sensor — coverage test required." },
  { id: "system2", label: "System 2 — Basler", cameraId: "a2a2840-67g5c", threadLensId: "hcsi023", normalLensId: "tc23048", notes: "5GigE PC required. Basler-team WD/FOV values used for HCSI023 and TC23048." },
  { id: "system3", label: "System 3 — Opto", cameraId: "g3-gc10-c1940", threadLensId: "pchil023", normalLensId: null, notes: "Normal-view lens not provided in verified comparison sheet." },
  { id: "system4", label: "System 4 — Current", cameraId: "aca1440-73gc", threadLensId: "pchil013", normalLensId: "c125-2522-5m", notes: "Compact current stack; verify lens image circle on 1/2.9-inch sensor." }
];

const verifiedInspectionDefaults = {
  fovWidth: 35, fovHeight: 35, featureSize: 0.3, minFeaturePixels: 4,
  partsPerMinute: 120, imagesPerPart: 1, minFps: 50,
  objectDepthNormal: 16.9, objectDepthThread: 10
};

const applicationPresets = [
  { id: "custom", name: "Custom application (manual entry)", stations: [] },
  {
    id: "tds-top-surface",
    name: "TDS Closures — Station 1: Top surface (no threads)",
    note: "Top-down view of cap face: cell top, bridges, slitting ring, bore plug, color, scratches. Threads are not visible at this station.",
    cameraPreset: "detail-5mp", lensPreset: "c16", stations: ["station1"],
    values: {
      fovWidth: 35, fovHeight: 35, featureSize: 0.25, minFeaturePixels: 4, objectDepth: 1.5, imagesPerPart: 1,
      partsPerMinute: 120, objectSpeed: 0, allowedBlur: 1,
      surfaceType: "glossy", inspectionGoal: "surface", ambientLight: "controlled", lightingMode: "strobe", wavelength: "auto"
    }
  },
  {
    id: "tds-thread-bore",
    name: "TDS Closures — Station 2: Thread / bore (threads visible)",
    note: "Top-down view into the cap bore. Low-angle lighting reveals internal threads, flash, and contamination.",
    cameraPreset: "detail-5mp", lensPreset: "tele025", stations: ["station2"],
    values: {
      fovWidth: 33, fovHeight: 28, featureSize: 0.10, minFeaturePixels: 5, objectDepth: 8, imagesPerPart: 1,
      partsPerMinute: 120, objectSpeed: 0, allowedBlur: 1,
      surfaceType: "mixed", inspectionGoal: "scratch", ambientLight: "controlled", lightingMode: "strobe", wavelength: "blue",
      dofUseCase: "inspection", fNumber: 8
    }
  },
  {
    id: "tds-color-shade",
    name: "TDS Closures — Station 1 variant: Color / shade check",
    note: "Same top-surface geometry configured for PSS shade verification (DENIM BLUE, RED, WHITE, etc.).",
    cameraPreset: "color-12mp", lensPreset: "c35", stations: ["station1"],
    values: {
      fovWidth: 35, fovHeight: 35, featureSize: 0.30, minFeaturePixels: 3, objectDepth: 1.5, imagesPerPart: 1,
      partsPerMinute: 60, objectSpeed: 0, allowedBlur: 1,
      surfaceType: "glossy", inspectionGoal: "color", ambientLight: "controlled", lightingMode: "continuous", wavelength: "white"
    }
  }
];

const closureSkus = [
  { id: "2622w", name: "2622 Water", code: "2622W", shade: "DARK BLUE PSS BAI-004", material: "HDPE", height: 14.05, knurlDia: 27.5, threadDia: 24.65, cellTop: 0.5, borePlugDia: 22.2, borePlugHeight: 5.1, slitting: "10.0–10.1", bridges: 10, weight: 1.7, flatness: null },
  { id: "2622csd", name: "2622 CSD", code: "2622CSD", shade: "DARK BLUE PSS BAI-006", material: "HDPE", height: 14.05, knurlDia: 28.5, threadDia: 24.8, cellTop: 0.9, borePlugDia: 22.5, borePlugHeight: 4.5, slitting: "10.5–10.8", bridges: 12, weight: 1.6, flatness: null },
  { id: "27alaska", name: "27 mm Alaska Water", code: "—", shade: "DENIM BLUE PSS BAI-003", material: "HDPE", height: 13.7, knurlDia: 28.5, threadDia: 25.6, cellTop: 0.45, borePlugDia: 22.2, borePlugHeight: 3.7, slitting: "10.3–10.5", bridges: null, weight: 1.30, flatness: null },
  { id: "28csd1", name: "28 mm CSD 1 Pcs", code: "BAI-1881-CSD-001", shade: "Red PSS-002", material: "HDPE", height: 16.0, knurlDia: 29.7, threadDia: 25.7, cellTop: 1.25, borePlugDia: 22.4, borePlugHeight: 7.0, slitting: "12.4–12.5", bridges: 10, weight: 2.30, flatness: "−0.35 to −0.15 mm" },
  { id: "28csd2", name: "28 mm CSD 2 Pcs", code: "PC1881", shade: "White PSS BAI-001", material: "PP", height: 16.6, knurlDia: 29.7, threadDia: 25.8, cellTop: 1.4, borePlugDia: null, borePlugHeight: null, slitting: "12.8–12.9", bridges: 10, weight: 2.60, flatness: "−0.45 to −0.15 mm", liner: 0.2 },
  { id: "ab27w", name: "27 mm Alaska Water RCRC", code: "AB27W", shade: "DENIM BLUE PSS BAI-003", material: "HDPE", height: 14.4, knurlDia: 28.9, threadDia: 25.6, cellTop: 0.9, borePlugDia: 22.2, borePlugHeight: 3.7, slitting: "10.4–10.5", bridges: null, weight: 1.65, flatness: null },
  { id: "ucm8449", name: "27 mm Alaska Water (UCM)", code: "UCM001A8449", shade: "DENIM BLUE", material: "HDPE", height: 13.7, knurlDia: 28.5, threadDia: 25.6, cellTop: 0.45, borePlugDia: 22.2, borePlugHeight: 3.7, slitting: "10.3–10.5", bridges: null, weight: 1.30, flatness: null }
];

const closureAnatomy = [
  { id: "knurl", label: "Knurl", tdsParameter: "Knurl Dia 27.5–29.7 mm", description: "Outer serrated grip diameter of the closure skirt. Defines the maximum horizontal extent of the part in a top view.", visibleAt: ["station1", "station2"], defects: ["Flash", "Short shot", "Diameter out of spec", "Contamination"], svg: { type: "ring", cx: 210, cy: 210, rOuter: 148, rInner: 128 } },
  { id: "cellTop", label: "Cell top", tdsParameter: "Cell top thickness 0.45–1.4 mm", description: "Flat top surface above the bore opening. Primary inspection region for scratches, dents, and shade variation on Station 1.", visibleAt: ["station1"], defects: ["Scratch", "Dent", "Discoloration", "Top flatness out of spec"], svg: { type: "circle", cx: 210, cy: 210, r: 118 } },
  { id: "borePlug", label: "Bore plug", tdsParameter: "Bore plug dia ~22–22.5 mm; height 3.7–5.1 mm", description: "Central plug feature visible from the top. Its diameter, height, and surface condition are checked on Station 1.", visibleAt: ["station1", "station2"], defects: ["Missing plug", "Plug flash", "Plug height out of spec", "Surface defect"], svg: { type: "circle", cx: 210, cy: 210, r: 72 } },
  { id: "bridges", label: "Bridges", tdsParameter: "10–12 bridges; strength 5–17 kg", description: "Tamper-evident break-away tabs on the cap top. Count, presence, and break condition are verified on Station 1.", visibleAt: ["station1"], defects: ["Missing bridge", "Broken bridge", "Weak bridge", "Extra bridge"], svg: { type: "bridges", cx: 210, cy: 210, count: 10, r: 100 } },
  { id: "slitting", label: "Slitting zone", tdsParameter: "Slitting height 10.0–12.9 mm", description: "Height zone where the cap skirt is slit for tamper evidence. The top ring of the slit pattern may appear at the cap edge in top view.", visibleAt: ["station1"], defects: ["Incomplete slit", "Slitting depth wrong", "Burrs at slit"], svg: { type: "ring", cx: 210, cy: 210, rOuter: 128, rInner: 118 } },
  { id: "threadRing", label: "Thread ring", tdsParameter: "Thread dia 24.65–25.8 mm", description: "Internal helical thread visible when looking into the bore from above. Primary target for Station 2 with grazing light.", visibleAt: ["station2"], defects: ["Thread damage", "Incomplete thread", "Thread flash", "Contamination"], svg: { type: "ring", cx: 210, cy: 210, rOuter: 98, rInner: 78 } },
  { id: "boreWall", label: "Bore wall", tdsParameter: "Internal bore depth ~10–13 mm (slitting zone)", description: "Inner cylindrical surface below the cell top. Inspected on Station 2 for flash, contamination, and wall defects.", visibleAt: ["station2"], defects: ["Flash", "Contamination", "Short shot", "Surface roughness"], svg: { type: "ring", cx: 210, cy: 210, rOuter: 78, rInner: 72 } },
  { id: "liner", label: "Liner", tdsParameter: "Liner thickness 0–0.2 mm (where present)", description: "Seal liner visible inside the cap on some SKUs. May appear as a thin ring at the bore opening.", visibleAt: ["station1", "station2"], defects: ["Missing liner", "Liner crease", "Liner misalignment"], svg: { type: "ring", cx: 210, cy: 210, rOuter: 88, rInner: 82 } },
  { id: "topFlatness", label: "Top flatness zone", tdsParameter: "Top flatness −0.45 to −0.15 mm (28 mm CSD)", description: "Flatness tolerance across the cell top on measurement-critical SKUs. Requires controlled lighting and often telecentric optics for gauging.", visibleAt: ["station1"], defects: ["Dome / sink", "Flatness out of spec"], svg: { type: "circle", cx: 210, cy: 210, r: 108, dash: true } }
];

const glossaryCategories = ["All", "Optics", "Camera", "Lighting", "Geometry", "Compatibility", "Motion", "Closures", "Defects", "Units", "Requirements", "Assumption"];

const glossary = [
  ["Acquisition interval", "Maximum time available per image at the required production rate. Equal to 60 ÷ required frame rate in milliseconds.", "Motion"],
  ["Allowed motion blur", "Maximum image movement tolerated during one exposure, in pixels. One pixel is a strict starting point for moving lines.", "Motion"],
  ["Ambient light", "Uncontrolled light in the inspection area. Enclosures, filters, and strobes reduce its effect.", "Lighting"],
  ["Applied torque", "Torque applied when closing the cap onto a bottle. TDS values range from about 10 to 18 in-lbs depending on SKU.", "Closures"],
  ["Aperture diameter", "Approximate clear lens opening: focal length divided by F-number.", "Optics"],
  ["Aspect ratio mismatch", "Warning when required field aspect ratio differs from the sensor aspect ratio, leaving unused sensor area.", "Geometry"],
  ["Back focal distance", "Distance from rear lens reference to sensor. Not the same as working distance.", "Optics"],
  ["Backlight", "Illumination behind the part producing a high-contrast silhouette.", "Lighting"],
  ["Binning", "Combining neighboring pixels for sensitivity or speed at the cost of resolution.", "Camera"],
  ["Bit depth", "Digital intensity bits per pixel or color channel.", "Camera"],
  ["Bore", "Internal cylindrical cavity of the closure where threads and liner are located.", "Closures"],
  ["Bore plug", "Central plug feature on the cap top. Diameter about 22–22.5 mm on most TDS SKUs.", "Closures"],
  ["Bore wall", "Inner vertical surface of the cap bore inspected on Station 2.", "Closures"],
  ["Bridge", "Tamper-evident break-away tab. TDS specifies 10–12 bridges with strength limits.", "Closures"],
  ["Bridge break defect", "Bridge broken, missing, or failing strength specification.", "Defects"],
  ["Bridge breaking torque", "Torque to break bridges open, typically 3–9 in-lbs per TDS.", "Closures"],
  ["Bright field", "Light reflected directly into the lens from the object surface.", "Lighting"],
  ["C-mount", "Industrial mount: 1 inch thread, 17.526 mm flange focal distance.", "Compatibility"],
  ["Camera headroom", "Difference between camera maximum fps and required fps.", "Motion"],
  ["Camera mount", "Mechanical interface connecting lens to camera (C, CS, F, M42, M72).", "Compatibility"],
  ["Camera resolution", "Active pixel count: horizontal × vertical or megapixels.", "Camera"],
  ["Cell top", "Flat top surface above the bore. Thickness 0.45–1.4 mm across your SKUs.", "Closures"],
  ["Color camera", "Sensor with Bayer filter measuring RGB. Use when shade or color is required.", "Camera"],
  ["Color shade mismatch", "Cap color deviates from approved PSS shade card.", "Defects"],
  ["Compatibility checks", "Automated pass/fail list for mount, image circle, sampling, DoF, and frame rate.", "Requirements"],
  ["Contamination defect", "Foreign particles, dust, or residue on cap surface or in bore.", "Defects"],
  ["Continuous light", "Light that stays on during operation. Simpler but lower peak than strobe.", "Lighting"],
  ["Coaxial light", "On-axis illumination via beam splitter for flat reflective surfaces.", "Lighting"],
  ["Cross-polarization", "Crossed polarizers on light and lens to suppress specular glare.", "Lighting"],
  ["CS-mount", "Same thread as C-mount but 12.526 mm flange distance.", "Compatibility"],
  ["Dark field", "Low-angle light where defects scatter light into the lens.", "Lighting"],
  ["Defect inspection DoF", "Depth-of-field criterion k = 0.015 for general defect detection.", "Assumption"],
  ["Depth of field (DoF)", "Approximate object-depth range in acceptable focus.", "Optics"],
  ["Diffuse dome light", "Curved diffuse source suppressing hot spots on glossy caps.", "Lighting"],
  ["Distortion", "Geometric error where magnification varies across the field.", "Optics"],
  ["DoF use case", "Selects the k constant: defect inspection (0.015) or precision measurement (0.008).", "Requirements"],
  ["Duty cycle", "Fraction of time a strobe is on. Must respect LED thermal limits.", "Lighting"],
  ["Engineering estimate", "All calculator outputs are planning estimates requiring physical validation.", "Assumption"],
  ["Entocentric lens", "Standard fixed-focal lens with perspective; magnification changes with depth.", "Optics"],
  ["Exposure time", "Duration the sensor collects light. Longer exposure increases blur risk.", "Motion"],
  ["F-mount", "Bayonet mount for larger sensors. No back-focal adjustment.", "Compatibility"],
  ["F-number (F/#)", "Focal length ÷ aperture diameter. Controls light and approximate DoF.", "Optics"],
  ["Field height", "Required vertical object area the image must cover, in mm.", "Requirements"],
  ["Field of view (FoV)", "Total object area imaged on the sensor.", "Geometry"],
  ["Field width", "Required horizontal object area the image must cover, in mm.", "Requirements"],
  ["Flash defect", "Excess moulded material on threads, bore, or top surface.", "Defects"],
  ["Flange focal distance", "Mount seating surface to sensor distance.", "Compatibility"],
  ["Focal length", "Lens property in mm controlling angle of view.", "Optics"],
  ["fps (frames per second)", "Complete images acquired per second.", "Units"],
  ["Frame rate", "Maximum camera acquisition rate in fps.", "Motion"],
  ["Gain", "Electronic amplification. Brightens image but not fundamental quality.", "Camera"],
  ["Global shutter", "All rows expose simultaneously; preferred for moving caps.", "Camera"],
  ["HDPE", "High-density polyethylene base material used on most TDS water and CSD caps.", "Closures"],
  ["Horizontal resolution", "Active sensor pixels in the X direction.", "Camera"],
  ["Image circle", "Circular image area from the lens; must cover sensor diagonal.", "Compatibility"],
  ["Image circle coverage", "Check that lens image circle exceeds sensor diagonal.", "Compatibility"],
  ["Image scale", "Object distance per pixel (mm/px) or its reciprocal (px/mm).", "Geometry"],
  ["Images per part", "Number of captures required per closure.", "Requirements"],
  ["Inspection goal", "Primary task: surface, scratch, color, edge, presence, or recessed feature.", "Requirements"],
  ["Irradiance", "Optical power per unit area at the object or sensor.", "Lighting"],
  ["Knurl", "Outer serrated grip surface. Knurl dia 27.5–29.7 mm in TDS.", "Closures"],
  ["Knurl diameter", "Outer cap diameter per TDS knurl specification.", "Closures"],
  ["Lens mount", "Mechanical lens-to-camera interface.", "Compatibility"],
  ["Lens resolution", "Coarse megapixel rating of lens detail capacity.", "Optics"],
  ["Lens type", "Fixed focal length or telecentric/macro mode.", "Requirements"],
  ["Liner", "Seal insert inside cap bore. Thickness up to 0.2 mm on some SKUs.", "Closures"],
  ["Line-scan camera", "Single-row sensor building 2D images through motion.", "Camera"],
  ["Low-angle ring light", "Grazing ring illumination for thread and scratch detection in bore.", "Lighting"],
  ["M42 / M72 mount", "Metric threaded mounts for large-format lenses.", "Compatibility"],
  ["Magnification", "Ratio of sensor image size to object field size.", "Geometry"],
  ["Maximum exposure", "Longest exposure before motion blur exceeds allowed limit.", "Motion"],
  ["Megapixel (MP)", "One million pixels.", "Units"],
  ["Millimetre (mm)", "Standard unit for cap dimensions and field of view.", "Units"],
  ["Missing bridge defect", "Expected bridge absent or not fully formed.", "Defects"],
  ["Modulation transfer function (MTF)", "Lens contrast versus spatial frequency.", "Optics"],
  ["Monochrome camera", "Intensity-only sensor without color filter array.", "Camera"],
  ["Mount mismatch", "Camera and lens mounts differ; adapter may be required.", "Compatibility"],
  ["Near infrared (NIR)", "Wavelength band beyond visible red.", "Lighting"],
  ["Nominal magnification", "Fixed magnification for telecentric/macro lenses.", "Optics"],
  ["Object depth", "Axial height variation that must stay in focus.", "Requirements"],
  ["Object image scale", "Calculated mm per pixel in object space.", "Geometry"],
  ["Object speed", "Linear speed of the cap during exposure in mm/s.", "Motion"],
  ["Object-space resolution", "Field distance represented by one pixel.", "Geometry"],
  ["Opening torque", "Torque to open cap, typically 5–14 in-lbs per TDS.", "Closures"],
  ["Paraxial approximation", "Optical model using small-angle ray assumptions.", "Assumption"],
  ["Part rate", "Production throughput in parts per minute.", "Requirements"],
  ["Pixel (px)", "Single sensor picture element.", "Units"],
  ["Pixel pitch", "Centre-to-centre pixel spacing in micrometres.", "Camera"],
  ["Pixels per feature", "Number of pixels spanning the smallest required detail.", "Geometry"],
  ["Polarizer", "Filter passing one polarization direction.", "Lighting"],
  ["PP (polypropylene)", "Base material on 28 mm CSD 2 Pcs SKU.", "Closures"],
  ["Precision measurement DoF", "Depth-of-field criterion k = 0.008 for gauging.", "Assumption"],
  ["Preferred wavelength", "LED colour band: white, red, blue, green, NIR, or UV.", "Lighting"],
  ["PSS shade", "Approved colour shade code (e.g. DENIM BLUE, RED PSS-002).", "Closures"],
  ["Quantum efficiency", "Fraction of photons converted to electrons.", "Camera"],
  ["Region of interest (ROI)", "Software crop of sensor pixels around the cap.", "Camera"],
  ["Required frame rate", "Minimum fps = parts per minute × images per part ÷ 60.", "Motion"],
  ["Required sampling", "Minimum pixels across the smallest feature.", "Requirements"],
  ["Rolling shutter", "Rows expose at different times; can skew moving objects.", "Camera"],
  ["Scratch defect", "Linear surface mark on cell top or bore wall.", "Defects"],
  ["Sensor diagonal", "Corner-to-corner active sensor dimension.", "Camera"],
  ["Sensor format", "Nominal size class such as 2/3 inch or 1 inch.", "Camera"],
  ["Sensor mode", "Monochrome or color acquisition.", "Camera"],
  ["Sensor size", "Calculated active width × height from pixels and pitch.", "Geometry"],
  ["Set aperture", "Configured F-number of the lens.", "Optics"],
  ["Shutter type", "Global or rolling shutter readout mode.", "Camera"],
  ["Short shot defect", "Incomplete mould fill leaving missing material.", "Defects"],
  ["Signal-to-noise ratio (SNR)", "Useful signal divided by noise in dB.", "Camera"],
  ["Skirt", "Outer vertical wall of the closure below the cell top.", "Closures"],
  ["Slitting defect", "Incomplete or incorrect tamper-evident slit.", "Defects"],
  ["Slitting height", "Axial zone of skirt slitting, about 10–13 mm per TDS.", "Closures"],
  ["Smallest feature", "Minimum defect or detail size to detect, in mm.", "Requirements"],
  ["Station 1", "Top-surface inspection without visible internal threads.", "Requirements"],
  ["Station 2", "Bore inspection with threads visible via grazing light.", "Requirements"],
  ["Strobe", "Short high-intensity pulse synchronized with exposure.", "Lighting"],
  ["Suggested focal length", "Maximum focal length to fit required field at entered WD.", "Geometry"],
  ["Surface type", "Matte, glossy, mixed, or transparent — affects lighting choice.", "Requirements"],
  ["Tamper-evident", "Bridge and slitting features showing if cap was opened.", "Closures"],
  ["Telecentric lens", "Parallel chief rays minimizing perspective error for gauging.", "Optics"],
  ["Thin-lens approximation", "Lens treated as having negligible thickness.", "Assumption"],
  ["Thread damage defect", "Chipped, incomplete, or deformed internal thread.", "Defects"],
  ["Thread diameter", "Internal thread major diameter 24.65–25.8 mm per TDS.", "Closures"],
  ["Thread ring", "Helical thread region inside the bore.", "Closures"],
  ["Top flatness", "Flatness tolerance of cell top on some 28 mm CSD SKUs.", "Closures"],
  ["Top flatness defect", "Cell top dome or sink beyond flatness tolerance.", "Defects"],
  ["Trigger", "External signal synchronizing camera and strobe.", "Motion"],
  ["Tunnel light", "Enclosed diffuse source similar to dome for glossy parts.", "Lighting"],
  ["Ultraviolet (UV)", "Short-wavelength band requiring safety controls.", "Lighting"],
  ["Vertical resolution", "Active sensor pixels in the Y direction.", "Camera"],
  ["Vignetting", "Corner brightness loss from image circle or optics.", "Optics"],
  ["Wavelength", "Spectral band of illumination.", "Lighting"],
  ["Working distance (WD)", "Lens front to object distance at best focus.", "Geometry"],
  ["Working F-number", "Effective F/# at finite magnification: (1 + M) × F/#.", "Optics"],
  ["Actual field of view", "Calculated object area covered by the current setup.", "Geometry"],
  ["Approximate DoF", "Estimated in-focus depth from Opto Engineering formula.", "Geometry"],
  ["Flat field correction (FFC)", "Camera calibration removing pixel non-uniformity.", "Camera"],
  ["Ring light", "Circular LED source around the lens axis.", "Lighting"],
  ["Structured light", "Projected pattern for 3D or enhanced contrast.", "Lighting"],
  ["grm (gram)", "Unit for closure weight in TDS specifications.", "Units"],
  ["in-lbs", "Inch-pound unit for torque specifications in TDS.", "Units"],
  ["micrometre (µm)", "Micron; unit for pixel pitch.", "Units"],
  ["Engineering estimate disclaimer", "Results shortlist hardware; confirm with datasheets and sample images.", "Assumption"],
  ["Angle of view", "Angular extent of the scene captured by the lens. Narrower with longer focal length.", "Optics"],
  ["Bayer filter", "Color filter array on RGB sensors: alternating R, G, B pixels per 2×2 block.", "Camera"],
  ["Beam splitter", "Optical element directing coaxial illumination into the lens axis.", "Lighting"],
  ["Chief ray", "Central ray through the aperture stop; defines perspective in entocentric lenses.", "Optics"],
  ["Contrast", "Difference in intensity between feature and background. Lighting geometry sets contrast.", "Lighting"],
  ["Depth of focus", "Acceptable sensor-side focus range. Related to but not identical to object-side DoF.", "Optics"],
  ["Diffraction limit", "Softening of detail at very small apertures (high F/#). Warns above about F/16.", "Optics"],
  ["Dynamic range", "Ratio of brightest to darkest distinguishable signal in one exposure.", "Camera"],
  ["Effective focal length", "Focal length referenced to a full-frame equivalent when using crop sensors.", "Optics"],
  ["Entrance pupil", "Apparent aperture as seen from object space. Diameter ≈ f ÷ F/#.", "Optics"],
  ["Fixed focal length", "Lens with one nominal focal length (prime lens), as opposed to zoom.", "Optics"],
  ["Flange back", "Distance from lens mount flange to sensor plane at infinity focus.", "Compatibility"],
  ["Full well capacity", "Maximum electrons one pixel can hold before saturation.", "Camera"],
  ["Grazing angle", "Light striking the surface at a shallow angle to reveal texture and scratches.", "Lighting"],
  ["Hot spot", "Specular reflection from glossy surfaces caused by direct light.", "Lighting"],
  ["Illuminance", "Visible light falling on the object, in lux. Strobes raise peak illuminance.", "Lighting"],
  ["Interference filter", "Band-pass filter passing only one wavelength (e.g. red, blue LED match).", "Lighting"],
  ["LED strobing", "Pulsed LED illumination synchronized with short camera exposure.", "Lighting"],
  ["Lens speed", "How much light a lens collects; faster lenses have lower F/# numbers.", "Optics"],
  ["Machine vision lens", "Industrial lens designed for fixed working distance and repeatable imaging.", "Optics"],
  ["Macro lens", "Lens optimized for close working distances and higher magnification.", "Optics"],
  ["Nyquist sampling", "Need at least 2 pixels across a periodic feature to resolve it reliably.", "Geometry"],
  ["Optical axis", "Line through the centre of the lens perpendicular to the sensor.", "Optics"],
  ["Overexposure", "Sensor saturation from too much light or too long an exposure.", "Camera"],
  ["Parallax", "Apparent shift of features with depth in perspective (entocentric) imaging.", "Optics"],
  ["Perspective distortion", "Apparent size change with object height in non-telecentric imaging.", "Optics"],
  ["Photon noise", "Shot noise from random arrival of photons; limits SNR at low light.", "Camera"],
  ["Pixel saturation", "Pixel at maximum digital value; detail is lost in that region.", "Camera"],
  ["Principal plane", "Reference plane used in thin-lens ray tracing.", "Optics"],
  ["Read noise", "Electronic noise added when converting sensor charge to digital values.", "Camera"],
  ["Spatial frequency", "Detail rate in line pairs per mm on the sensor or object.", "Optics"],
  ["Specular reflection", "Mirror-like reflection from glossy cap surfaces.", "Lighting"],
  ["Telecentricity", "Property where chief rays are parallel to the optical axis in object space.", "Optics"],
  ["Underexposure", "Too little light; features may fall below noise floor.", "Camera"],
  ["Uniformity", "Even brightness across the field. Dome/tunnel lights improve uniformity.", "Lighting"],
  ["Working F/# formula", "Effective F-number at magnification: (1 + |M|) × set F/#.", "Optics"],
  ["Zoom lens", "Variable focal length lens; less common in fixed-station inspection.", "Optics"]
];

const fieldGlossaryMap = {
  fovWidth: "Field width", fovHeight: "Field height", featureSize: "Smallest feature",
  minFeaturePixels: "Required sampling", objectDepth: "Object depth", imagesPerPart: "Images per part",
  resolutionX: "Horizontal resolution", resolutionY: "Vertical resolution", pixelPitch: "Pixel pitch",
  cameraMount: "Camera mount", cameraFps: "Frame rate", sensorMode: "Sensor mode",
  shutterType: "Shutter type", bitDepth: "Bit depth", focalLength: "Focal length",
  workingDistance: "Working distance (WD)", fNumber: "Set aperture", lensMount: "Lens mount",
  imageCircle: "Image circle", lensResolution: "Lens resolution", dofUseCase: "DoF use case",
  lensType: "Lens type", nominalMagnification: "Nominal magnification",
  partsPerMinute: "Part rate", objectSpeed: "Object speed", allowedBlur: "Allowed motion blur",
  surfaceType: "Surface type", inspectionGoal: "Inspection goal", ambientLight: "Ambient light",
  lightingMode: "Strobe", wavelength: "Preferred wavelength"
};

const ids = [
  "fovWidth", "fovHeight", "featureSize", "minFeaturePixels", "objectDepth", "imagesPerPart",
  "resolutionX", "resolutionY", "pixelPitch", "cameraMount", "cameraFps", "sensorMode", "shutterType", "bitDepth",
  "focalLength", "workingDistance", "fNumber", "lensMount", "imageCircle", "lensResolution", "dofUseCase", "lensType", "nominalMagnification",
  "partsPerMinute", "objectSpeed", "allowedBlur", "surfaceType", "inspectionGoal", "ambientLight", "lightingMode", "wavelength"
];

let selectedSkuId = "";
let selectedAnatomyId = "";
let activeGlossaryCategory = "All";
let selectedSystemId = "";
let activeLensCatalogId = "";
let activeCameraCatalogId = "";
let el = {};
let form = null;
let formError = null;

function bindElements() {
  el = Object.fromEntries(ids.map(id => [id, document.getElementById(id)]));
  form = document.getElementById("calculatorForm");
  formError = document.getElementById("formError");
}

const formulaLibrary = [
  { name: "Sensor width", equation: "W_sensor = N_x × p ÷ 1000", variables: "N_x = horizontal pixels; p = pixel pitch (µm)", usedFor: "Active sensor width in mm" },
  { name: "Sensor height", equation: "H_sensor = N_y × p ÷ 1000", variables: "N_y = vertical pixels; p = pixel pitch (µm)", usedFor: "Active sensor height in mm" },
  { name: "Sensor diagonal", equation: "D_sensor = √(W_sensor² + H_sensor²)", variables: "W_sensor, H_sensor in mm", usedFor: "Image circle coverage check" },
  { name: "Camera megapixels", equation: "MP = (N_x × N_y) ÷ 10⁶", variables: "N_x, N_y = resolution", usedFor: "Camera/lens MP comparison" },
  { name: "Magnification (fixed lens)", equation: "M = f ÷ (WD − f)", variables: "f = focal length (mm); WD = working distance (mm)", usedFor: "Object-to-image scale (thin-lens)" },
  { name: "Magnification (telecentric)", equation: "M = M_nom", variables: "M_nom = catalog nominal magnification", usedFor: "Fixed-mag telecentric lenses" },
  { name: "Actual FoV width", equation: "FoV_w = W_sensor ÷ |M|", variables: "M = magnification", usedFor: "Horizontal field covered" },
  { name: "Actual FoV height", equation: "FoV_h = H_sensor ÷ |M|", variables: "M = magnification", usedFor: "Vertical field covered" },
  { name: "Image scale (X)", equation: "s_x = FoV_w ÷ N_x", variables: "mm per pixel in object space", usedFor: "Horizontal sampling" },
  { name: "Image scale (Y)", equation: "s_y = FoV_h ÷ N_y", variables: "mm per pixel in object space", usedFor: "Vertical sampling" },
  { name: "Limiting scale", equation: "s = max(s_x, s_y)", variables: "Worst-case mm/px", usedFor: "Feature pixel calculation" },
  { name: "Feature pixels", equation: "px_feat = d_feat ÷ s", variables: "d_feat = smallest feature (mm)", usedFor: "Sampling pass/fail" },
  { name: "Required magnification (X)", equation: "M_req_x = W_sensor ÷ FoV_req_w", variables: "FoV_req = required field", usedFor: "Minimum mag to fit width" },
  { name: "Required magnification (Y)", equation: "M_req_y = H_sensor ÷ FoV_req_h", variables: "FoV_req = required field", usedFor: "Minimum mag to fit height" },
  { name: "Max magnification to fit", equation: "M_fit = min(M_req_x, M_req_y)", variables: "Binding axis sets FoV", usedFor: "Focal length suggestion" },
  { name: "Required focal length", equation: "f_req = WD × M_fit ÷ (1 + M_fit)", variables: "Thin-lens rearrangement", usedFor: "Suggested max focal length" },
  { name: "Aperture diameter", equation: "D_ap = f ÷ F/#", variables: "F/# = set aperture", usedFor: "Physical aperture size" },
  { name: "Working F-number", equation: "F/#_work = (1 + |M|) × F/#", variables: "Effective aperture at magnification", usedFor: "DoF and exposure" },
  { name: "Depth of field", equation: "DoF ≈ F/#_work × p × k ÷ M²", variables: "p = pitch (µm); k = 0.015 inspection or 0.008 measurement", usedFor: "Estimated in-focus depth" },
  { name: "Required frame rate", equation: "fps_req = ppm × n_img ÷ 60", variables: "ppm = parts/min; n_img = images/part", usedFor: "Throughput check" },
  { name: "Maximum exposure", equation: "t_exp_max = blur_px × s ÷ v", variables: "blur_px = allowed blur; v = object speed (mm/s)", usedFor: "Motion blur limit" },
  { name: "Acquisition interval", equation: "Δt = 1 ÷ fps_req", variables: "Time budget per image", usedFor: "Cycle-time planning" },
  { name: "Thin-lens equation", equation: "1/f = 1/s + 1/s′", variables: "s = object distance; s′ = image distance", usedFor: "Basis for M = f/(WD−f)" },
  { name: "Field fit check", equation: "FoV_w ≥ FoV_req_w AND FoV_h ≥ FoV_req_h", variables: "Calculated vs required field", usedFor: "Geometry pass/fail" },
  { name: "Sampling check", equation: "px_feat ≥ px_min", variables: "px_min = required sampling", usedFor: "Resolution pass/fail" },
  { name: "DoF check", equation: "DoF ≥ object_depth", variables: "object_depth = axial variation", usedFor: "Focus pass/fail" },
  { name: "Image circle check", equation: "image_circle ≥ D_sensor", variables: "Lens circle vs sensor diagonal", usedFor: "Vignetting check" },
  { name: "Lens resolution check", equation: "lens_MP ≥ camera_MP", variables: "Coarse rating comparison", usedFor: "Detail capacity check" },
  { name: "Frame rate check", equation: "camera_fps ≥ fps_req", variables: "Camera headroom", usedFor: "Throughput pass/fail" },
  { name: "Pixels per millimetre", equation: "px/mm = 1 ÷ s", variables: "Reciprocal of limiting scale", usedFor: "Spatial resolution display" }
];

function renderFormulaLibrary() {
  const body = document.getElementById("formulaTableBody");
  if (!body) return;
  body.innerHTML = formulaLibrary.map(row => `
    <tr>
      <td><strong>${row.name}</strong></td>
      <td><code>${row.equation}</code></td>
      <td>${row.variables}</td>
      <td>${row.usedFor}</td>
    </tr>`).join("");
}

function renderFormulaNotes(r) {
  const k = r ? r.k : 0.015;
  const lines = [
    "W_sensor = N_x × p ÷ 1000 &nbsp;|&nbsp; H_sensor = N_y × p ÷ 1000",
    "D_sensor = √(W_sensor² + H_sensor²) &nbsp;|&nbsp; MP = (N_x × N_y) ÷ 10⁶",
    "M = f ÷ (WD − f) &nbsp; [fixed] &nbsp;|&nbsp; M = M_nom &nbsp; [telecentric]",
    "FoV_w = W_sensor ÷ |M| &nbsp;|&nbsp; FoV_h = H_sensor ÷ |M|",
    "s = max(FoV_w÷N_x, FoV_h÷N_y) &nbsp;|&nbsp; px_feat = d_feat ÷ s",
    "f_req = WD × min(W_sensor÷FoV_w, H_sensor÷FoV_h) ÷ (1 + M_fit)",
    "D_ap = f ÷ F/# &nbsp;|&nbsp; F/#_work = (1 + |M|) × F/#",
    `DoF ≈ F/#_work × p × k ÷ M² &nbsp; (k = ${k})`,
    "fps_req = ppm × n_img ÷ 60 &nbsp;|&nbsp; t_exp_max = blur_px × s ÷ v",
    "Δt = 1 ÷ fps_req"
  ];
  return lines.map(line => `<p><code>${line}</code></p>`).join("");
}

function fillCatalog(select, catalog) {
  select.innerHTML = catalog.map(item => `<option value="${item.id}">${item.name}</option>`).join("");
}

function getActiveLensCatalogEntry() {
  return lensCatalog.find(entry => entry.id === activeLensCatalogId) || null;
}

function isThreadStationPreset(presetId) {
  return presetId === "tds-thread-bore";
}

function getLensIdForSystem(system, presetId) {
  if (!system) return null;
  return isThreadStationPreset(presetId) ? system.threadLensId : system.normalLensId;
}

function applyCameraPreset(id) {
  activeCameraCatalogId = id;
  const item = cameraCatalog.find(entry => entry.id === id);
  if (!item || item.id === "custom") return;
  el.resolutionX.value = item.x;
  el.resolutionY.value = item.y;
  el.pixelPitch.value = item.pitch;
  el.cameraMount.value = item.mount;
  el.cameraFps.value = item.fps;
  el.sensorMode.value = item.mode;
  el.shutterType.value = item.shutter;
  el.bitDepth.value = item.bits;
}

function applyLensPreset(id) {
  activeLensCatalogId = id;
  const item = lensCatalog.find(entry => entry.id === id);
  if (!item || item.id === "custom") return;
  el.focalLength.value = item.focal;
  el.workingDistance.value = item.wd;
  el.fNumber.value = item.fno;
  el.lensMount.value = item.mount;
  el.imageCircle.value = item.circle;
  el.lensResolution.value = item.mp;
  el.lensType.value = item.type;
  el.nominalMagnification.value = item.mag;
}

function applyApplicationPreset(id) {
  const preset = applicationPresets.find(entry => entry.id === id);
  renderPresetBanner(preset);
  if (!preset || preset.id === "custom") {
    renderStationMap([]);
    renderSystemComparison();
    return;
  }
  if (selectedSystemId) {
    applySystemPreset(selectedSystemId, false);
  } else {
    document.getElementById("cameraPreset").value = preset.cameraPreset;
    applyCameraPreset(preset.cameraPreset);
    document.getElementById("lensPreset").value = preset.lensPreset;
    applyLensPreset(preset.lensPreset);
  }
  Object.entries(preset.values).forEach(([key, value]) => {
    if (el[key]) el[key].value = value;
  });
  renderStationMap(preset.stations);
  highlightAnatomyForStations(preset.stations);
  renderSystemComparison();
}

function applySystemPreset(systemId, resetManual = true) {
  selectedSystemId = systemId || "";
  const systemSelect = document.getElementById("systemPreset");
  if (systemSelect && resetManual) systemSelect.value = systemId || "";
  const badge = document.getElementById("systemLensBadge");
  if (!systemId) {
    if (badge) badge.hidden = true;
    return;
  }
  const system = verifiedSystems.find(entry => entry.id === systemId);
  if (!system) return;
  const presetId = document.getElementById("applicationPreset")?.value || "tds-top-surface";
  const lensId = getLensIdForSystem(system, presetId);
  document.getElementById("cameraPreset").value = system.cameraId;
  applyCameraPreset(system.cameraId);
  if (lensId) {
    document.getElementById("lensPreset").value = lensId;
    applyLensPreset(lensId);
    if (badge) {
      badge.hidden = false;
      badge.textContent = lensCatalog.find(l => l.id === lensId)?.name || "Lens loaded";
      badge.className = "system-lens-badge";
    }
  } else if (badge) {
    badge.hidden = false;
    badge.textContent = "Normal lens not provided for this system";
    badge.className = "system-lens-badge warn";
  }
}

function applySkuPreset(id, updateForm = true) {
  selectedSkuId = id;
  const sku = closureSkus.find(entry => entry.id === id);
  const summary = document.getElementById("skuSummary");
  if (!sku) {
    summary.hidden = true;
    renderSkuTable();
    renderSystemComparison();
    return;
  }
  const fov = Math.ceil(sku.knurlDia + 5);
  if (updateForm) {
    el.fovWidth.value = fov;
    el.fovHeight.value = fov;
    const presetId = document.getElementById("applicationPreset").value;
    if (presetId === "tds-thread-bore") {
      el.featureSize.value = 0.10;
      el.objectDepth.value = Math.min(12, Math.max(8, parseFloat(String(sku.slitting).split("–")[1]) || 10));
    } else {
      el.featureSize.value = 0.25;
      el.objectDepth.value = Math.max(1.5, sku.cellTop * 2);
    }
  }
  summary.hidden = false;
  summary.innerHTML = `
    <strong>${sku.name}</strong> (${sku.code}) · ${sku.shade}<br>
    Knurl ${sku.knurlDia} mm · Thread ${sku.threadDia} mm · Height ${sku.height} mm · Cell top ${sku.cellTop} mm
    ${sku.bridges ? ` · ${sku.bridges} bridges` : ""}${sku.flatness ? ` · Flatness ${sku.flatness}` : ""}`;
  renderSkuTable();
  renderSystemComparison();
}

function renderPresetBanner(preset) {
  const banner = document.getElementById("presetBanner");
  if (!preset || !preset.note) {
    banner.hidden = true;
    return;
  }
  banner.hidden = false;
  banner.innerHTML = `<strong>${preset.name}</strong><p>${preset.note}</p>`;
}

function renderStationMap(stations) {
  const map = document.getElementById("stationMap");
  if (!stations || !stations.length) {
    map.className = "station-map empty-state";
    map.textContent = "Select a TDS preset to see inspected anatomy regions.";
    return;
  }
  const visible = closureAnatomy.filter(part =>
    part.visibleAt.some(st => stations.includes(st) || (st === "station1" && stations.includes("station1")) || (st === "station2" && stations.includes("station2")))
  );
  map.className = "station-map";
  map.innerHTML = visible.map(part => {
    const badges = part.visibleAt.map(st =>
      `<span class="station-tag ${st}">${st === "station1" ? "Station 1" : "Station 2"}</span>`
    ).join("");
    return `<div class="station-map-item"><strong>${part.label}</strong><span>${part.tdsParameter}</span>${badges}</div>`;
  }).join("");
}

function highlightAnatomyForStations(stations) {
  document.querySelectorAll(".anatomy-part").forEach(node => {
    const part = closureAnatomy.find(p => p.id === node.dataset.partId);
    const active = part && part.visibleAt.some(st => stations.includes(st));
    node.classList.toggle("station-active", active);
    node.classList.toggle("station-inactive", !active && stations.length);
  });
}

function buildAnatomySvg() {
  const svg = document.getElementById("anatomySvg");
  const parts = [];
  parts.push(`<circle cx="210" cy="210" r="155" class="cap-outline"/>`);
  closureAnatomy.forEach(part => {
    const cls = `anatomy-part ${part.visibleAt.join(" ")}`;
    if (part.svg.type === "circle") {
      parts.push(`<circle data-part-id="${part.id}" class="${cls}" cx="${part.svg.cx}" cy="${part.svg.cy}" r="${part.svg.r}"${part.svg.dash ? ' stroke-dasharray="6 4"' : ""}/>`);
    } else if (part.svg.type === "ring") {
      parts.push(`<circle data-part-id="${part.id}" class="${cls}" cx="${part.svg.cx}" cy="${part.svg.cy}" r="${part.svg.rOuter}"/>`);
      parts.push(`<circle cx="${part.svg.cx}" cy="${part.svg.cy}" r="${part.svg.rInner}" class="cutout"/>`);
    } else if (part.svg.type === "bridges") {
      for (let i = 0; i < part.svg.count; i++) {
        const angle = (i / part.svg.count) * Math.PI * 2 - Math.PI / 2;
        const x1 = part.svg.cx + Math.cos(angle) * (part.svg.r - 8);
        const y1 = part.svg.cy + Math.sin(angle) * (part.svg.r - 8);
        const x2 = part.svg.cx + Math.cos(angle) * (part.svg.r + 14);
        const y2 = part.svg.cy + Math.sin(angle) * (part.svg.r + 14);
        parts.push(`<line data-part-id="${part.id}" class="${cls}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`);
      }
    }
  });
  parts.push(`<text x="210" y="28" text-anchor="middle" class="svg-label">Top view — camera looking down</text>`);
  svg.innerHTML = parts.join("");
  svg.querySelectorAll("[data-part-id]").forEach(node => {
    node.addEventListener("mouseenter", () => selectAnatomyPart(node.dataset.partId));
    node.addEventListener("click", () => selectAnatomyPart(node.dataset.partId));
  });
}

function selectAnatomyPart(id) {
  selectedAnatomyId = id;
  const part = closureAnatomy.find(p => p.id === id);
  if (!part) return;
  document.getElementById("anatomyPartTitle").textContent = part.label;
  document.getElementById("anatomyPartDesc").textContent = part.description;
  document.getElementById("anatomyPartMeta").innerHTML = `
    <dt>TDS parameter</dt><dd>${part.tdsParameter}</dd>
    <dt>Typical defects</dt><dd>${part.defects.join(", ")}</dd>`;
  document.getElementById("anatomyPartStations").innerHTML = part.visibleAt.map(st =>
    `<span class="station-tag ${st}">${st === "station1" ? "Station 1 — top surface" : "Station 2 — bore / threads"}</span>`
  ).join("");
  document.querySelectorAll(".anatomy-part").forEach(node => {
    node.classList.toggle("selected", node.dataset.partId === id);
  });
}

function renderSkuTable() {
  const body = document.getElementById("skuTableBody");
  body.innerHTML = closureSkus.map(sku => `
    <tr class="${sku.id === selectedSkuId ? "selected" : ""}">
      <td>${sku.name}</td><td>${sku.code}</td><td>${sku.shade}</td>
      <td>${sku.knurlDia}</td><td>${sku.threadDia}</td><td>${sku.height}</td>
      <td>${sku.cellTop}</td><td>${sku.borePlugDia ?? "—"}</td><td>${sku.bridges ?? "—"}</td>
      <td><button type="button" class="text-button sku-select-btn" data-sku="${sku.id}">Use in calculator</button></td>
    </tr>`).join("");
  body.querySelectorAll(".sku-select-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("skuPreset").value = btn.dataset.sku;
      applySkuPreset(btn.dataset.sku);
      calculate();
      document.getElementById("calculator").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function injectHelpIcons() {
  document.querySelectorAll("[data-field]").forEach(label => {
    const term = fieldGlossaryMap[label.dataset.field];
    if (!term) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "help-link";
    btn.title = `Look up: ${term}`;
    btn.textContent = "?";
    btn.addEventListener("click", e => {
      e.preventDefault();
      openGlossaryTerm(term);
    });
    label.insertBefore(btn, label.firstChild);
  });
}

function openGlossaryTerm(term) {
  document.getElementById("glossarySearch").value = term;
  activeGlossaryCategory = "All";
  renderCategoryFilters();
  renderGlossary(term);
  document.getElementById("vocabulary").scrollIntoView({ behavior: "smooth" });
  setTimeout(() => {
    const card = [...document.querySelectorAll(".glossary-card")].find(c => c.querySelector("h3")?.textContent === term);
    card?.classList.add("highlight");
    card?.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => card?.classList.remove("highlight"), 2000);
  }, 300);
}

function renderCategoryFilters() {
  const wrap = document.getElementById("categoryFilters");
  wrap.innerHTML = glossaryCategories.map(cat => {
    const count = cat === "All" ? glossary.length : glossary.filter(([, , c]) => c === cat).length;
    return `<button type="button" class="category-chip${cat === activeGlossaryCategory ? " active" : ""}" data-category="${cat}">${cat} (${count})</button>`;
  }).join("");
  wrap.querySelectorAll(".category-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      activeGlossaryCategory = btn.dataset.category;
      renderCategoryFilters();
      renderGlossary(document.getElementById("glossarySearch").value);
    });
  });
}

function n(id) { return Number.parseFloat(el[id].value); }

function readInputs() {
  const values = {};
  ids.forEach(id => { values[id] = el[id].type === "number" ? n(id) : el[id].value; });
  return values;
}

function validate(v, lensItem = null) {
  const positive = ["fovWidth", "fovHeight", "featureSize", "minFeaturePixels", "imagesPerPart", "resolutionX", "resolutionY", "pixelPitch", "cameraFps", "bitDepth", "focalLength", "workingDistance", "fNumber", "imageCircle", "lensResolution", "allowedBlur", "nominalMagnification"];
  const invalid = positive.filter(key => !Number.isFinite(v[key]) || v[key] <= 0);
  if (invalid.length) return "Enter a positive number in every required numeric field.";
  const lens = lensItem || getActiveLensCatalogEntry();
  const thinLens = v.lensType === "fixed" && !lens?.useCatalogGeometry;
  if (thinLens && v.workingDistance <= v.focalLength) return "For this thin-lens model, working distance must be greater than focal length.";
  if (v.objectDepth < 0 || v.partsPerMinute < 0 || v.objectSpeed < 0) return "Depth, production rate, and speed cannot be negative.";
  return "";
}

function compute(v, lensItem = null) {
  const lens = lensItem || getActiveLensCatalogEntry();
  const sensorWidth = v.resolutionX * v.pixelPitch / 1000;
  const sensorHeight = v.resolutionY * v.pixelPitch / 1000;
  const sensorDiagonal = Math.hypot(sensorWidth, sensorHeight);
  const cameraMP = v.resolutionX * v.resolutionY / 1e6;
  let magnification;
  let actualFovWidth;
  let actualFovHeight;

  if (lens?.useCatalogGeometry && lens.catalogFovW && lens.catalogFovH) {
    actualFovWidth = lens.catalogFovW;
    actualFovHeight = lens.catalogFovH;
    magnification = lens.mag || sensorWidth / actualFovWidth;
  } else if (v.lensType === "telecentric" || v.lensType === "hole-inspection" || v.lensType === "hypercentric") {
    magnification = v.nominalMagnification;
    actualFovWidth = sensorWidth / magnification;
    actualFovHeight = sensorHeight / magnification;
  } else {
    magnification = v.focalLength / (v.workingDistance - v.focalLength);
    actualFovWidth = sensorWidth / magnification;
    actualFovHeight = sensorHeight / magnification;
  }

  const scaleX = actualFovWidth / v.resolutionX;
  const scaleY = actualFovHeight / v.resolutionY;
  const limitingScale = Math.max(scaleX, scaleY);
  const featurePixels = v.featureSize / limitingScale;
  const requiredMagX = sensorWidth / v.fovWidth;
  const requiredMagY = sensorHeight / v.fovHeight;
  const maxMagnificationToFit = Math.min(requiredMagX, requiredMagY);
  const requiredFocal = v.workingDistance * maxMagnificationToFit / (1 + maxMagnificationToFit);
  const apertureDiameter = v.focalLength / v.fNumber;
  const workingFNumber = (1 + magnification) * v.fNumber;
  const k = v.dofUseCase === "measurement" ? 0.008 : 0.015;
  const dof = workingFNumber * v.pixelPitch * k / (magnification ** 2);
  const requiredFps = v.partsPerMinute * v.imagesPerPart / 60;
  const maxExposureSec = v.objectSpeed > 0 ? v.allowedBlur * limitingScale / v.objectSpeed : Infinity;
  const throughputIntervalSec = requiredFps > 0 ? 1 / requiredFps : Infinity;
  return {
    sensorWidth, sensorHeight, sensorDiagonal, cameraMP, magnification,
    actualFovWidth, actualFovHeight, scaleX, scaleY, limitingScale,
    featurePixels, requiredFocal, apertureDiameter, workingFNumber, dof,
    requiredFps, maxExposureSec, throughputIntervalSec,
    fieldFits: actualFovWidth >= v.fovWidth && actualFovHeight >= v.fovHeight,
    samplingPass: featurePixels >= v.minFeaturePixels,
    dofPass: dof >= v.objectDepth,
    framePass: v.cameraFps >= requiredFps,
    mountPass: v.cameraMount === v.lensMount,
    circlePass: v.imageCircle >= sensorDiagonal,
    lensResolutionPass: v.lensResolution >= cameraMP,
    aspectDifference: Math.abs(v.fovWidth / v.fovHeight / (sensorWidth / sensorHeight) - 1),
    k
  };
}

function format(value, decimals = 2) {
  if (!Number.isFinite(value)) return "No limit";
  if (value === 0) return "0";
  if (Math.abs(value) >= 1000) return value.toLocaleString(undefined, { maximumFractionDigits: 1 });
  if (Math.abs(value) < 0.01) return value.toPrecision(2);
  return value.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

function metric(label, value, note = "") {
  return `<div class="metric"><span>${label}</span><strong>${value}</strong>${note ? `<small>${note}</small>` : ""}</div>`;
}

function makeCheck(level, title, detail) {
  const icon = level === "good" ? "✓" : level === "warn" ? "!" : "×";
  return { level, title, detail, html: `<li class="check ${level}"><span class="check-icon">${icon}</span><div><strong>${title}</strong><p>${detail}</p></div></li>` };
}

function buildChecks(v, r) {
  const checks = [];
  checks.push(r.fieldFits ? makeCheck("good", "Required field fits", `Calculated FoV is ${format(r.actualFovWidth)} × ${format(r.actualFovHeight)} mm.`) : makeCheck("bad", "Required field does not fit", `Need at least ${format(v.fovWidth)} × ${format(v.fovHeight)} mm. Use focal length ≤ ${format(r.requiredFocal)} mm.`));
  checks.push(r.samplingPass ? makeCheck("good", "Feature sampling passes", `${format(r.featurePixels)} px span the smallest feature; need ${format(v.minFeaturePixels)} px.`) : makeCheck("bad", "Insufficient feature sampling", `${format(r.featurePixels)} px available. Increase resolution or reduce FoV.`));
  checks.push(r.dofPass ? makeCheck("good", "Estimated depth of field passes", `${format(r.dof)} mm DoF covers ${format(v.objectDepth)} mm object depth.`) : makeCheck("warn", "Depth of field may be insufficient", `${format(r.dof)} mm estimated vs ${format(v.objectDepth)} mm required.`));
  checks.push(r.mountPass ? makeCheck("good", "Mounts match", `Both use ${v.cameraMount}-mount.`) : makeCheck("bad", "Mount mismatch", `${v.cameraMount} camera vs ${v.lensMount} lens — verify adapter.`));
  checks.push(r.circlePass ? makeCheck("good", "Image circle covers sensor", `${format(v.imageCircle)} mm circle covers ${format(r.sensorDiagonal)} mm diagonal.`) : makeCheck("bad", "Image circle too small", `${format(v.imageCircle)} mm vs ${format(r.sensorDiagonal)} mm diagonal.`));
  checks.push(r.lensResolutionPass ? makeCheck("good", "Lens rating matches pixel count", `${format(v.lensResolution)} MP lens ≥ ${format(r.cameraMP)} MP camera.`) : makeCheck("warn", "Lens may limit detail", `Verify lens MTF at required spatial frequency.`));
  checks.push(r.framePass ? makeCheck("good", "Frame rate passes", `${format(v.cameraFps)} fps exceeds ${format(r.requiredFps)} fps required.`) : makeCheck("bad", "Frame rate too low", `Need ${format(r.requiredFps)} fps; camera is ${format(v.cameraFps)} fps.`));
  checks.push(v.shutterType === "rolling" && v.objectSpeed > 0 ? makeCheck("warn", "Rolling-shutter motion risk", "Prefer global shutter for moving caps.") : makeCheck("good", "Shutter suits motion", v.shutterType === "global" ? "Global shutter active." : "No motion entered."));
  if (r.aspectDifference > 0.05) checks.push(makeCheck("warn", "Aspect ratio differs", "Use ROI crop if needed."));
  if (v.fNumber > 16 || v.fNumber < 2) checks.push(makeCheck("warn", "Extreme aperture", v.fNumber > 16 ? "Diffraction may soften detail." : "Wide open may reduce sharpness."));
  return checks;
}

function lightingRecommendation(v, r) {
  let geometry = "Diffuse front bright field", reason = "Even illumination for general appearance.";
  if (v.inspectionGoal === "edge" || v.surfaceType === "transparent") { geometry = "Bright-field backlight"; reason = "Silhouette for edges and openings."; }
  else if (v.inspectionGoal === "scratch") { geometry = "Low-angle dark field ring light"; reason = "Grazing light reveals threads, scratches, and bore texture."; }
  else if (v.surfaceType === "glossy" && v.inspectionGoal === "surface") { geometry = "Diffuse dome or tunnel light"; reason = "Suppresses hot spots on glossy HDPE/PP caps."; }
  else if (v.surfaceType === "mixed") { geometry = "Diffuse ring with polarizers"; reason = "Mixed texture with glare reduction."; }
  const mode = v.lightingMode === "auto" ? ((Number.isFinite(r.maxExposureSec) && r.maxExposureSec < 0.002) || v.ambientLight !== "controlled" ? "Strobed" : "Continuous") : (v.lightingMode === "strobe" ? "Strobed" : "Continuous");
  let wl = v.wavelength;
  if (wl === "auto") { wl = v.inspectionGoal === "color" ? "white" : v.inspectionGoal === "scratch" ? "blue" : "white"; }
  const names = { white: "White", red: "Red", blue: "Blue", green: "Green", nir: "Near infrared", uv: "Ultraviolet" };
  return { geometry, reason, mode, wavelength: names[wl], sensor: v.inspectionGoal === "color" ? "Color camera" : "Monochrome camera", safety: mode === "Strobed" ? "Verify LED pulse current and trigger timing." : "Check LED temperature and glare." };
}

function buildSystemInputs(system, presetId, skuId) {
  const preset = applicationPresets.find(p => p.id === presetId) || applicationPresets.find(p => p.id === "tds-top-surface");
  const camera = cameraCatalog.find(c => c.id === system.cameraId);
  const lensId = getLensIdForSystem(system, presetId);
  const lens = lensId ? lensCatalog.find(l => l.id === lensId) : null;
  const sku = closureSkus.find(s => s.id === skuId);
  const thread = isThreadStationPreset(presetId);
  const fov = sku ? Math.ceil(sku.knurlDia + 5) : verifiedInspectionDefaults.fovWidth;

  const v = {
    ...(preset?.values || {}),
    fovWidth: thread ? 33 : fov,
    fovHeight: thread ? 28 : fov,
    featureSize: thread ? 0.10 : verifiedInspectionDefaults.featureSize,
    minFeaturePixels: thread ? 5 : verifiedInspectionDefaults.minFeaturePixels,
    objectDepth: thread ? verifiedInspectionDefaults.objectDepthThread : verifiedInspectionDefaults.objectDepthNormal,
    partsPerMinute: preset?.values?.partsPerMinute ?? 120,
    imagesPerPart: preset?.values?.imagesPerPart ?? 1,
    allowedBlur: preset?.values?.allowedBlur ?? 1,
    objectSpeed: preset?.values?.objectSpeed ?? 0,
    ambientLight: preset?.values?.ambientLight ?? "controlled",
    lightingMode: preset?.values?.lightingMode ?? "strobe",
    wavelength: preset?.values?.wavelength ?? "auto",
    surfaceType: preset?.values?.surfaceType ?? "glossy",
    inspectionGoal: preset?.values?.inspectionGoal ?? "surface",
    dofUseCase: preset?.values?.dofUseCase ?? "inspection",
    resolutionX: camera?.x ?? 2448,
    resolutionY: camera?.y ?? 2048,
    pixelPitch: camera?.pitch ?? 3.45,
    cameraMount: camera?.mount ?? "C",
    cameraFps: camera?.fps ?? 35,
    sensorMode: camera?.mode ?? "mono",
    shutterType: camera?.shutter ?? "global",
    bitDepth: camera?.bits ?? 12,
    focalLength: lens?.focal ?? 16,
    workingDistance: lens?.wd ?? 250,
    fNumber: lens?.fno ?? 8,
    lensMount: lens?.mount ?? "C",
    imageCircle: lens?.circle ?? 12,
    lensResolution: lens?.mp ?? 5,
    lensType: lens?.type ?? "fixed",
    nominalMagnification: lens?.mag ?? 0.25
  };
  return { v, lens, camera, lensId };
}

function statusChip(level, text) {
  return `<span class="status-chip ${level}">${text}</span>`;
}

function chipFromBool(pass, warn = false) {
  if (pass) return statusChip("pass", "Pass");
  if (warn) return statusChip("warn", "Review");
  return statusChip("fail", "Fail");
}

function evaluateAllSystems() {
  const presetId = document.getElementById("applicationPreset")?.value || "tds-top-surface";
  const preset = applicationPresets.find(p => p.id === presetId);
  const stationLabel = isThreadStationPreset(presetId) ? "Thread / bore lens" : "Normal-view lens";

  return verifiedSystems.map(system => {
    const { v, lens, camera, lensId } = buildSystemInputs(system, presetId, selectedSkuId);
    if (!lensId) {
      return { system, stationLabel, na: true, overall: "na", note: system.notes };
    }
    const err = validate(v, lens);
    if (err) return { system, stationLabel, lens, camera, na: false, overall: "fail", error: err, note: system.notes };
    const r = compute(v, lens);
    const fpsRequired = Math.max(r.requiredFps, verifiedInspectionDefaults.minFps);
    const framePass = v.cameraFps >= fpsRequired;
    const overall = !r.fieldFits || !r.samplingPass || !r.circlePass || !framePass ? "fail"
      : !r.dofPass || !r.lensResolutionPass ? "warn" : "pass";
    return {
      system, stationLabel, v, r, lens, camera, lensId, na: false, overall, framePass, fpsRequired,
      note: [system.notes, lens.notes].filter(Boolean).join(" ")
    };
  });
}

function renderSystemComparison() {
  const body = document.getElementById("systemComparisonBody");
  const meta = document.getElementById("systemComparisonMeta");
  if (!body) return;
  const presetId = document.getElementById("applicationPreset")?.value || "tds-top-surface";
  const preset = applicationPresets.find(p => p.id === presetId);
  const results = evaluateAllSystems();
  if (meta) {
    meta.textContent = `${preset?.name || "Application"} · Cap Ø 30 mm · defect 0.3 mm · min 50 fps · from verified comparison sheet`;
  }
  body.innerHTML = results.map(row => {
    if (row.na) {
      return `<tr>
        <td><strong>${row.system.label}</strong><br><small>${row.note || ""}</small></td>
        <td>${cameraCatalog.find(c => c.id === row.system.cameraId)?.name || "—"}</td>
        <td>${statusChip("na", "N/A")}<br><small>Lens not provided for this station</small></td>
        <td colspan="5">${statusChip("na", "Cannot evaluate")}</td>
        <td><button type="button" class="text-button load-system-btn" data-system="${row.system.id}">Load camera</button></td>
      </tr>`;
    }
    const r = row.r;
    const overall = row.overall === "pass" ? statusChip("pass", "Pass")
      : row.overall === "warn" ? statusChip("warn", "Review") : statusChip("fail", "Fail");
    return `<tr>
      <td><strong>${row.system.label}</strong><br><small>${row.note || ""}</small></td>
      <td>${row.camera?.name || "—"}</td>
      <td>${row.lens?.name || "—"}<br><small>${row.stationLabel}</small></td>
      <td>${chipFromBool(r.fieldFits)}<br><small>${format(r.actualFovWidth)} × ${format(r.actualFovHeight)} mm</small></td>
      <td>${chipFromBool(r.samplingPass)}<br><small>${format(r.featurePixels)} px / ${format(row.v.featureSize)} mm</small></td>
      <td>${chipFromBool(r.circlePass, !r.circlePass)}<br><small>${format(row.v.imageCircle)} / ${format(r.sensorDiagonal)} mm</small></td>
      <td>${chipFromBool(row.framePass)}<br><small>${format(row.v.cameraFps)} / ${format(row.fpsRequired)} fps</small></td>
      <td>${chipFromBool(r.dofPass, !r.dofPass)}<br><small>${format(r.dof)} mm</small></td>
      <td>${overall}</td>
      <td><button type="button" class="text-button load-system-btn" data-system="${row.system.id}">Load system</button></td>
    </tr>`;
  }).join("");
  body.querySelectorAll(".load-system-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.getElementById("systemPreset").value = btn.dataset.system;
      applySystemPreset(btn.dataset.system);
      calculate();
      document.getElementById("calculator").scrollIntoView({ behavior: "smooth" });
    });
  });
}

let lastMiniRequirements = null;

function getRequirementsContext() {
  const presetId = document.getElementById("applicationPreset")?.value || "tds-top-surface";
  const preset = applicationPresets.find(p => p.id === presetId) || applicationPresets.find(p => p.id === "tds-top-surface");
  const sku = closureSkus.find(s => s.id === selectedSkuId);
  let v = null;
  let r = null;
  let lighting = null;

  if (form && el.fovWidth) {
    v = readInputs();
    const err = validate(v);
    if (!err) {
      r = compute(v);
      lighting = lightingRecommendation(v, r);
    }
  }

  if (!v && preset?.values) {
    const cam = cameraCatalog.find(c => c.id === preset.cameraPreset);
    const lensItem = lensCatalog.find(l => l.id === preset.lensPreset);
    v = {
      ...preset.values,
      partsPerMinute: preset.values.partsPerMinute ?? 120,
      resolutionX: cam?.x ?? 2448,
      resolutionY: cam?.y ?? 2048,
      pixelPitch: cam?.pitch ?? 3.45,
      cameraMount: cam?.mount ?? "C",
      cameraFps: cam?.fps ?? 35,
      sensorMode: cam?.mode ?? "mono",
      shutterType: cam?.shutter ?? "global",
      bitDepth: cam?.bits ?? 12,
      focalLength: lensItem?.focal ?? 16,
      workingDistance: lensItem?.wd ?? 250,
      fNumber: preset.values.fNumber ?? lensItem?.fno ?? 8,
      lensMount: lensItem?.mount ?? "C",
      imageCircle: lensItem?.circle ?? 12,
      lensResolution: lensItem?.mp ?? 5,
      lensType: lensItem?.type ?? "fixed",
      nominalMagnification: lensItem?.mag ?? 0.25,
      dofUseCase: preset.values.dofUseCase ?? "inspection",
      allowedBlur: preset.values.allowedBlur ?? 1,
      objectSpeed: preset.values.objectSpeed ?? 0,
      ambientLight: preset.values.ambientLight ?? "controlled",
      lightingMode: preset.values.lightingMode ?? "strobe",
      wavelength: preset.values.wavelength ?? "auto",
      surfaceType: preset.values.surfaceType ?? "glossy",
      inspectionGoal: preset.values.inspectionGoal ?? "surface"
    };
    if (sku) {
      const fov = Math.ceil(sku.knurlDia + 5);
      v.fovWidth = fov;
      v.fovHeight = fov;
      if (presetId === "tds-thread-bore") {
        v.featureSize = 0.10;
        v.objectDepth = Math.min(12, Math.max(8, parseFloat(String(sku.slitting).split("–")[1]) || 10));
      } else if (presetId !== "tds-color-shade") {
        v.featureSize = 0.25;
        v.objectDepth = Math.max(1.5, sku.cellTop * 2);
      }
    }
    r = compute(v);
    lighting = lightingRecommendation(v, r);
  }

  return buildMiniRequirements(preset, sku, v, r, lighting);
}

function buildMiniRequirements(preset, sku, v, r, lighting) {
  const presetId = preset?.id || "custom";
  const fovW = v?.fovWidth ?? 35;
  const fovH = v?.fovHeight ?? 35;
  const featureSize = v?.featureSize ?? 0.25;
  const minPx = v?.minFeaturePixels ?? 4;
  const objectDepth = v?.objectDepth ?? 1.5;
  const fps = r ? format(r.requiredFps) : format(((v?.partsPerMinute ?? 120) * (v?.imagesPerPart ?? 1)) / 60);
  const dof = r ? format(r.dof) : "—";
  const featurePx = r ? format(r.featurePixels) : "—";
  const reqFocal = r ? format(r.requiredFocal) : "16";
  const wd = format(v?.workingDistance ?? 250);
  const fno = format(v?.fNumber ?? 8);

  const title = preset?.name || "Custom application";
  const subtitle = preset?.note || "Configure inspection target and run the calculator for live values.";

  const capFacts = sku
    ? [`Knurl Ø ${sku.knurlDia} mm`, `Thread Ø ${sku.threadDia} mm`, `Height ${sku.height} mm`, `Cell top ${sku.cellTop} mm`, sku.shade ? `Shade: ${sku.shade}` : null].filter(Boolean)
    : ["Knurl Ø 27.5–29.7 mm", "Thread Ø 24.65–25.8 mm", "Height 13.7–16.6 mm", "Cell top 0.45–1.4 mm"];

  const stations = preset?.stations || [];
  const inspects = stations.length
    ? closureAnatomy.filter(p => p.visibleAt.some(st => stations.includes(st))).map(p => p.label)
    : closureAnatomy.map(p => p.label);

  let camera;
  let lens;
  let light;

  if (presetId === "tds-top-surface") {
    camera = [
      "≥ 5 MP monochrome",
      "Global shutter",
      "C-mount",
      "Pixel pitch ≤ 3.45 µm",
      `Frame rate ≥ ${fps} fps (${format(v?.partsPerMinute ?? 120)} ppm, ${v?.imagesPerPart ?? 1} img/part)`,
      `≥ ${minPx} px across ${featureSize} mm features (${featurePx} px calculated)`
    ];
    lens = [
      `FoV ≥ ${format(fovW)} × ${format(fovH)} mm`,
      `Working distance ≈ ${wd} mm`,
      `Focal length ≤ ${reqFocal} mm`,
      `F/${fno}`,
      "Image circle ≥ sensor diagonal"
    ];
    light = [
      "Diffuse dome or tunnel light",
      "Strobed white LED",
      "Controlled ambient / light enclosure",
      "Suppress hot spots on glossy HDPE/PP caps"
    ];
  } else if (presetId === "tds-thread-bore") {
    camera = [
      "≥ 5 MP monochrome",
      "Global shutter",
      "C-mount",
      "Pixel pitch ≤ 3.45 µm",
      `Frame rate ≥ ${fps} fps`,
      `≥ ${minPx} px across ${featureSize} mm thread/flash features (${featurePx} px calculated)`
    ];
    lens = [
      "0.25× telecentric (or equivalent fixed magnification)",
      `FoV ≥ ${format(fovW)} × ${format(fovH)} mm`,
      `Working distance ≈ ${wd} mm`,
      `F/${fno}`,
      `DoF ≥ ${objectDepth} mm (estimated ${dof} mm)`
    ];
    light = [
      "Low-angle dark-field ring light",
      "Strobed blue LED",
      "Grazing angle into bore",
      "Reveal threads, flash, and contamination"
    ];
  } else if (presetId === "tds-color-shade") {
    camera = [
      "≥ 12 MP color",
      "C-mount",
      "Stable white balance / colour calibration",
      `Frame rate ≥ ${fps} fps`,
      "Monochrome not suitable for PSS shade match"
    ];
    lens = [
      `FoV ≥ ${format(fovW)} × ${format(fovH)} mm`,
      `Working distance ≈ ${wd} mm`,
      `~${format(v?.focalLength ?? 35)} mm focal length`,
      `F/${fno}`
    ];
    light = [
      "Diffuse dome or tunnel light",
      "Continuous white LED",
      "Enclosed station — no ambient colour cast",
      "Even illumination for PSS shade verification"
    ];
  } else {
    camera = [
      v?.sensorMode === "color" ? "Color camera" : "Monochrome camera",
      v?.shutterType === "global" ? "Global shutter preferred" : "Shutter per motion needs",
      `${v?.cameraMount ?? "C"}-mount`,
      `Pixel pitch ≤ ${format(v?.pixelPitch ?? 3.45)} µm`,
      `Frame rate ≥ ${fps} fps`
    ];
    lens = [
      `FoV ≥ ${format(fovW)} × ${format(fovH)} mm`,
      v?.lensType === "telecentric" ? `${format(v?.nominalMagnification ?? 0.25)}× telecentric` : `Focal length ≤ ${reqFocal} mm`,
      `Working distance ≈ ${wd} mm`,
      `F/${fno}`
    ];
    light = lighting
      ? [lighting.geometry, `${lighting.mode} — ${lighting.wavelength}`, lighting.reason]
      : ["Configure surface type and inspection goal for lighting guidance"];
  }

  if (lighting && presetId !== "custom") {
    light = [
      lighting.geometry,
      `${lighting.mode} — ${lighting.wavelength}`,
      lighting.reason,
      lighting.safety
    ];
  }

  return { title, subtitle, capFacts, inspects, camera, lens, light };
}

function miniRequirementsToText(req) {
  return [
    req.title,
    req.subtitle,
    "",
    "Cap facts: " + req.capFacts.join(" · "),
    "",
    "What we inspect:",
    ...req.inspects.map(i => `  • ${i}`),
    "",
    "Camera:",
    ...req.camera.map(c => `  • ${c}`),
    "",
    "Lens:",
    ...req.lens.map(l => `  • ${l}`),
    "",
    "Light:",
    ...req.light.map(l => `  • ${l}`)
  ].join(String.fromCharCode(10));
}

function renderMiniRequirements() {
  const panel = document.getElementById("miniRequirementsPanel");
  if (!panel) return;
  const req = getRequirementsContext();
  lastMiniRequirements = req;

  const capFactsHtml = req.capFacts.map(f => `<span class="cap-fact">${f}</span>`).join("");
  const inspectsHtml = req.inspects.map(i => `<span class="inspect-tag">${i}</span>`).join("");
  const card = (title, items) => `
    <article class="req-card">
      <h3>${title}</h3>
      <ul>${items.map(item => `<li>${item}</li>`).join("")}</ul>
    </article>`;

  panel.innerHTML = `
    <div class="mini-req-header">
      <div>
        <p class="eyebrow">Vendor-ready spec</p>
        <h2>${req.title}</h2>
        <p class="mini-req-subtitle">${req.subtitle}</p>
      </div>
      <button type="button" class="button button-quiet" id="copyRequirements">Copy spec</button>
    </div>
    <div class="cap-facts">${capFactsHtml}</div>
    <div class="mini-req-inspects">
      <strong>What we inspect</strong>
      <div class="inspect-tags">${inspectsHtml}</div>
    </div>
    <div class="req-card-grid">
      ${card("Camera", req.camera)}
      ${card("Lens", req.lens)}
      ${card("Light", req.light)}
    </div>`;

  document.getElementById("copyRequirements")?.addEventListener("click", async () => {
    const text = miniRequirementsToText(lastMiniRequirements);
    try {
      await navigator.clipboard.writeText(text);
      const btn = document.getElementById("copyRequirements");
      btn.textContent = "Copied!";
      setTimeout(() => { btn.textContent = "Copy spec"; }, 2000);
    } catch {
      window.prompt("Copy this spec:", text);
    }
  });
}

function setBadge(id, text, level) {
  const badge = document.getElementById(id);
  badge.textContent = text;
  badge.className = `badge ${level}`;
}

function render(v, r) {
  document.getElementById("geometryMetrics").innerHTML = [
    metric("Sensor size", `${format(r.sensorWidth)} × ${format(r.sensorHeight)} mm`, `${format(r.sensorDiagonal)} mm diagonal`),
    metric("Actual field of view", `${format(r.actualFovWidth)} × ${format(r.actualFovHeight)} mm`, `Target ${format(v.fovWidth)} × ${format(v.fovHeight)} mm`),
    metric("Magnification", `${format(r.magnification, 4)}×`),
    metric("Object image scale", `${format(r.limitingScale, 4)} mm/px`, `${format(1 / r.limitingScale)} px/mm`),
    metric("Smallest feature", `${format(r.featurePixels)} px`, `${format(v.featureSize)} mm`),
    metric("Approximate DoF", `${format(r.dof)} mm`, `${format(r.workingFNumber)} working F/#`),
    metric("Suggested focal length", v.lensType === "fixed" ? `≤ ${format(r.requiredFocal)} mm` : "Use catalog match"),
    metric("Aperture diameter", `${format(r.apertureDiameter)} mm`, `F/${format(v.fNumber)}`)
  ].join("");
  document.getElementById("motionMetrics").innerHTML = [
    metric("Required frame rate", `${format(r.requiredFps)} fps`),
    metric("Camera headroom", `${format(v.cameraFps - r.requiredFps)} fps`),
    metric("Maximum exposure", Number.isFinite(r.maxExposureSec) ? `${format(r.maxExposureSec * 1000, 3)} ms` : "Not motion-limited"),
    metric("Acquisition interval", Number.isFinite(r.throughputIntervalSec) ? `${format(r.throughputIntervalSec * 1000)} ms` : "No rate entered")
  ].join("");
  const lighting = lightingRecommendation(v, r);
  document.getElementById("lightingResult").innerHTML = `<h4>${lighting.geometry}</h4><p>${lighting.reason}</p><div class="recommendation-tags"><span>${lighting.mode}</span><span>${lighting.wavelength}</span><span>${lighting.sensor}</span></div><p style="margin-top:12px"><strong>Setup:</strong> ${lighting.safety}</p>`;
  const checks = buildChecks(v, r);
  document.getElementById("checksList").innerHTML = checks.map(c => c.html).join("");
  document.getElementById("checkCount").textContent = `${checks.length} checks`;
  const bad = checks.filter(c => c.level === "bad").length;
  const warnings = checks.filter(c => c.level === "warn").length;
  const verdict = document.getElementById("verdict");
  if (bad) { verdict.className = "verdict bad"; verdict.innerHTML = `<span class="verdict-icon">×</span><div><strong>Revise this combination</strong><p>${bad} blocking issue(s), ${warnings} warning(s).</p></div>`; }
  else if (warnings) { verdict.className = "verdict warn"; verdict.innerHTML = `<span class="verdict-icon">!</span><div><strong>Promising — review warnings</strong><p>${warnings} warning(s) before selecting hardware.</p></div>`; }
  else { verdict.className = "verdict good"; verdict.innerHTML = `<span class="verdict-icon">✓</span><div><strong>Passes initial checks</strong><p>Shortlist this setup and capture a sample image.</p></div>`; }
  setBadge("geometryBadge", r.fieldFits && r.samplingPass && r.dofPass ? "Pass" : "Review", r.fieldFits && r.samplingPass ? (r.dofPass ? "good" : "warn") : "bad");
  setBadge("motionBadge", r.framePass ? "Pass" : "Review", r.framePass ? "good" : "bad");
  setBadge("lightingBadge", "Guidance", "good");
  document.getElementById("formulaNotes").innerHTML = renderFormulaNotes(r);
  renderMiniRequirements();
  renderSystemComparison();
}

function calculate(event) {
  if (event) event.preventDefault();
  const values = readInputs();
  const error = validate(values);
  formError.hidden = !error;
  formError.textContent = error;
  if (error) {
    renderMiniRequirements();
    renderSystemComparison();
    return;
  }
  render(values, compute(values));
}

function renderGlossary(query = "") {
  const normalized = query.trim().toLowerCase();
  const filtered = glossary.filter(([term, definition, category]) => {
    const matchSearch = `${term} ${definition} ${category}`.toLowerCase().includes(normalized);
    const matchCat = activeGlossaryCategory === "All" || category === activeGlossaryCategory;
    return matchSearch && matchCat;
  });
  document.getElementById("glossaryGrid").innerHTML = filtered.length
    ? filtered.map(([term, definition, category]) => `<article class="glossary-card" data-term="${term}"><h3>${term}</h3><p>${definition}</p><span class="category">${category}</span></article>`).join("")
    : `<div class="no-results">No terms match your search.</div>`;
  document.getElementById("glossaryCount").textContent = `${filtered.length} of ${glossary.length} terms`;
  document.getElementById("clearSearch").hidden = !normalized && activeGlossaryCategory === "All";
}

function init() {
  bindElements();
  if (!form) return;
  fillCatalog(document.getElementById("applicationPreset"), applicationPresets);
  fillCatalog(document.getElementById("systemPreset"), [{ id: "", name: "Manual selection" }, ...verifiedSystems.map(s => ({ id: s.id, name: s.label }))]);
  fillCatalog(document.getElementById("cameraPreset"), cameraCatalog);
  fillCatalog(document.getElementById("lensPreset"), lensCatalog);
  fillCatalog(document.getElementById("skuPreset"), [{ id: "", name: "— Select a SKU (optional) —" }, ...closureSkus.map(s => ({ id: s.id, name: `${s.name} (${s.code})` }))]);
  injectHelpIcons();
  buildAnatomySvg();
  renderSkuTable();
  renderCategoryFilters();
  selectAnatomyPart("cellTop");
  document.getElementById("applicationPreset").value = "tds-top-surface";
  applyApplicationPreset("tds-top-surface");
  document.getElementById("applicationPreset").addEventListener("change", e => { applyApplicationPreset(e.target.value); calculate(); });
  document.getElementById("systemPreset").addEventListener("change", e => { applySystemPreset(e.target.value); calculate(); });
  document.getElementById("skuPreset").addEventListener("change", e => { applySkuPreset(e.target.value); calculate(); });
  document.getElementById("cameraPreset").addEventListener("change", e => { applyCameraPreset(e.target.value); document.getElementById("systemPreset").value = ""; selectedSystemId = ""; calculate(); });
  document.getElementById("lensPreset").addEventListener("change", e => { applyLensPreset(e.target.value); document.getElementById("systemPreset").value = ""; selectedSystemId = ""; calculate(); });
  form.addEventListener("submit", calculate);
  form.addEventListener("input", e => { if (!["cameraPreset", "lensPreset", "applicationPreset", "skuPreset", "systemPreset"].includes(e.target.id)) calculate(); });
  document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("applicationPreset").value = "tds-top-surface";
    document.getElementById("skuPreset").value = "";
    document.getElementById("systemPreset").value = "";
    selectedSkuId = "";
    selectedSystemId = "";
    applyApplicationPreset("tds-top-surface");
    applySkuPreset("", false);
    calculate();
  });
  document.getElementById("printButton").addEventListener("click", () => window.print());
  document.getElementById("glossarySearch").addEventListener("input", e => renderGlossary(e.target.value));
  document.getElementById("clearSearch").addEventListener("click", () => {
    document.getElementById("glossarySearch").value = "";
    activeGlossaryCategory = "All";
    renderCategoryFilters();
    renderGlossary();
  });
  renderGlossary();
  renderFormulaLibrary();
  renderSystemComparison();
  calculate();
}

function boot() {
  if (document.getElementById("calculatorForm")) init();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}

window.VisionBench = { compute, validate, lightingRecommendation, cameraCatalog, lensCatalog, verifiedSystems, applicationPresets, closureAnatomy, closureSkus, glossary, formulaLibrary, buildMiniRequirements, getRequirementsContext, evaluateAllSystems };
