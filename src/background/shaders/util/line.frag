#include hash.frag

// Line 2D distance function from iq https://iquilezles.org/articles/distfunctions2d/
float line(vec2 p, vec2 start, vec2 end) {
  vec2 ba = end - start;
  vec2 pa = p - start;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - h * ba);
}

vec2 rotate(vec2 p, float angle) {
  return mat2(cos(angle), sin(angle), -sin(angle), cos(angle)) * p;
}

void animatedLine(vec2 p, float jitter, float baseLength, float speed, vec2 direction, inout float minDist, inout vec2 minPoint) {
  // Split the space into tiles
  vec2 tileInt = floor(p);
  vec2 tileFrac = fract(p);
  // Query the surrounding tiles to find the minimum values
  for(int j = -1; j <= 1; j++) {
    for(int i = -1; i <= 1; i++) {
      vec2 neighbor = vec2(float(i), float(j));
      vec2 point = hash(tileInt + neighbor);
      // Randomise the size
      float s = (point.x * 2.0 - 1.0) * 0.01;
      // Animate the point
      point = 0.5 + 0.5 * sin(time * speed * point * jitter);
      vec2 diff = neighbor + point - tileFrac;
      // Randomise the line length and direction
      float lineLen = dot(point, vec2(0.520, 0.440)) * 0.05 * baseLength;
      vec2 dir = direction * speed - point;
      vec2 rotated = rotate(diff, -atan(dir.y, dir.x));
      float dist = line(rotated, -vec2(lineLen, 0.0), vec2(lineLen, 0.0)) - s;
      if(dist < minDist) {
        minDist = dist;
        minPoint = point;
      }
    }
  }
}