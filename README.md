# aframe-triangulation-component
Replace built-in THREE.js triangulation with: earcut, libtess, poly2tri, pnltri, polyk, pts

## Why?

Built-in THREE.js triangulation show error massages sometimes.

`THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()`

### earcut

paste it after aframe.js 
[more](https://github.com/mrdoob/three.js/blob/master/examples/webgl_geometry_text_earcut.html)

```html
<script src="https://rawgit.com/aframevr/aframe/master/dist/aframe-master.js"></script>

<script src="https://rawgit.com/mapbox/earcut/master/src/earcut.js"></script>
<script>
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
</script>
```

U can add: libtess, poly2tri, pnltri, polyk, pts
PR welcome.

7dir
