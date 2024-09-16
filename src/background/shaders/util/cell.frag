// From https://www.shadertoy.com/view/4djSRW
vec2 hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * vec3(.1031, .1030, .0973));
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.xx + p3.yz) * p3.zy);
}

// Based off of https://thebookofshaders.com/12/
// A simple voronoi based cellular animation that jitters back and forth
void cellAnimation(vec2 p, float jitter, inout float minDist, inout vec2 minPoint) {
  // Split the space into tiles
  vec2 tileInt = floor(p);
  vec2 tileFrac = fract(p);
  // Query the surrounding tiles to find the minimum values
  for(int j = -1; j <= 1; j++) {
    for(int i = -1; i <= 1; i++) {
      vec2 neighbor = vec2(float(i), float(j));
      vec2 point = hash(tileInt + neighbor);
      // Animate the point
      point = 0.5 + 0.5 * sin(time + jitter * point);
      vec2 diff = neighbor + point - tileFrac;
      float dist = length(diff);
      if(dist < minDist) {
        minDist = dist;
        minPoint = point;
      }
    }
  }
}