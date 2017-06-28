THREE.ShapeUtils.triangulateShape = function(contour, holes) {
    function removeDupEndPts(points) {
        var l = points.length;
        if (l > 2 && points[l - 1].equals(points[0])) {
            points.pop();
        }
    }
    function addContour(vertices, contour) {
        for (var i = 0; i < contour.length; i++) {
            vertices.push(contour[i].x);
            vertices.push(contour[i].y);
        }
    }
    removeDupEndPts(contour);
    holes.forEach(removeDupEndPts);
    var vertices = [];
    addContour(vertices, contour);
    var holeIndices = [];
    var holeIndex = contour.length;
    for (i = 0; i < holes.length; i++) {
        holeIndices.push(holeIndex);
        holeIndex += holes[i].length;
        addContour(vertices, holes[i]);
    }
    var result = earcut(vertices, holeIndices, 2);
    var grouped = [];
    for (var i = 0; i < result.length; i += 3) {
        grouped.push(result.slice(i, i + 3));
    }
    return grouped;
}
