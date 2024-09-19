#include hash.frag

// Moon 2D distance function from iq https://iquilezles.org/articles/distfunctions2d/
float petal(vec2 p, float d, float ra, float rb) {
  p.y = abs(p.y);
  float a = (ra * ra - rb * rb + d * d) / (2.0 * d);
  float b = sqrt(max(ra * ra - a * a, 0.0));
  if(d * (p.x * b - p.y * a) > d * d * max(b - p.y, 0.0))
    return length(p - vec2(a, b));
  return max((length(p) - ra), -(length(p - vec2(d, 0)) - rb));
}

vec2 rotate(vec2 p, float angle) {
  return mat2(cos(angle), sin(angle), -sin(angle), cos(angle)) * p;
}

void animatedPetal(vec2 p, float jitter, float size, float shapeJitter, float speed, vec2 direction, inout float minDist, inout vec2 minPoint, inout vec2 minStaticPoint) {
  // Split the space into tiles
  vec2 tileInt = floor(p);
  vec2 tileFrac = fract(p);
  // Query the surrounding tiles to find the minimum values
  for(int j = -1; j <= 1; j++) {
    for(int i = -1; i <= 1; i++) {
      vec2 neighbor = vec2(float(i), float(j));
      vec2 point = hash(tileInt + neighbor);
      // Randomise the size and shape
      float s = (point.x * 2.0 - 1.0) * 0.02;
      float r = point.y * shapeJitter;

      // Animate the point
      point = 0.5 + 0.5 * sin(time * speed * point * jitter);
      vec2 diff = neighbor + point - tileFrac;

      // Randomise rotation and follow direction 
      vec2 rotated = rotate(diff, sin(time + point.x) * 0.5 + atan(direction.y, direction.x));
      float dist = petal(rotated, (0.1 + s + r) * size, (0.1 + s) * size, (0.15 + s) * size) - 0.005;

      if(dist < minDist) {
        minDist = dist;
        minPoint = point;
        minStaticPoint = hash(tileInt + neighbor);
      }
    }
  }
}