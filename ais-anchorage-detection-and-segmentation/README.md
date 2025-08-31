## Anchorage Detection & Segmentation
### Introduction
This project will work with `Automatic Identification System (AIS)` data to extract vessel mobility information. Probabilistic model will be developed to `detect` and `segment` anchorage event from AIS data. Also identifying when vessel is anchored, determining the start and end of each anchorage, distinguishing anchoring from other low-speed behaviour such as `berthing`, also improve the understanding of vessel mobility pattern like how ship move, stop, anchor, berth, drift, or change route over time, so it can be easier to analyze, and more predictable. In the meantime, also supporting the `quantification of navigational risk` and provide valuable input for downstream application such as `risk scorecard`, `maritime traffic analysis`, `port safety management`, etc.

`Anchoring` is one of the activities a vessel may undertake during its voyage. It is the maritime term which mean a vessel drop its anchor into the seabed to hold position offshore instead of moving. In AIS data analysis, `anchoring` is typically characterized by a `speed-over-ground (SOG)` between `0` and `1 knot`, usually at speed `<= 0.5 knot`. Depending on current tidal pattern, anchorage can occur `above 0.5 knot`. Another behaviour that should not be confused with anchoring is `berthing`. `Berthing` also occur at very low speeds `below 0.5 knot`, in the range of `0 to 0.2 knot`, unlike anchoring, it take place alongside a wharf or pier where the vessel is secured and does not swing or drift.

There are two type of anchorage, `Traditional SPOT Anchorage` and `Single Buoy Mooring (SBM)`/`Single Point Mooring (SPM)`.

`Traditional SPOT Anchorage`: This is when a vessel drop its anchor directly on the seabed at a chosen spot offshore. It can still swing or drift due to wind and current. Because the anchor may drag, the swing radius and shape of the vessel’s movement is often `irregular`.

`Single Buoy Mooring (SBM)/Single Point Mooring (SPM)`: It is when a vessel is moored to a fixed offshore buoy or structure. This keep the ship in place and allow it to rotate in a `regular` circular pattern.

Anchorage can take many shapes and sizes, such as `half-moon`, `full-moon`, or even `quarter-moon` pattern. The shape  depending on the anchorage duration and the tidal current pattern at an area. The lesser the anchorage duration, the lesser the likelihood of forming a full moon shape. However, in some area with calm sea, vessel may not form full-moon even when anchor for a long time, because there is little wind or current to move them around.
![alt text](image/image-1.png)

### Technology Used
1. `Duckdb` - Handle and query AIS data, AIS consist of million of record, and require fast processing.
2. `H3` - Convert AIS lat/lon into a hexagonal grid system so vessel movement pattern can be analyzed and visualized more effectively.

### Dataset Insight

### Reference
1. Technical documentation explaining how to decode and interpret AIS message transmitted by ship: https://gpsd.gitlab.io/gpsd/AIVDM.html#_types_1_2_and_3_position_report_class_a