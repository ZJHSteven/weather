uniform float time;
uniform vec2 size;
uniform vec2 direction;
uniform float tiling;
uniform float speed;

#include util/cell.frag

float snow(vec2 p, float jitter, vec2 direction, float speed) {
  // Move the input space in the given direction
  p += time * direction * speed;
  // Animate the swaying of the snow
  float minDist = 10.;
  vec2 minPoint;
  cellAnimation(p, jitter, minDist, minPoint);
  // Scale the circle by the progress of the animation
  float scale = dot(minPoint, vec2(0.4, 0.4)) - 0.3;
  // Convert the distance to a circle
  float circle = step(.04 * scale, minDist);
  return 1.0 - circle;
}

half4 main(float2 coord) {
  vec2 p = coord / size;
  // Remove aspect ratio
  p.x *= size.x / size.y;
  float alpha = 0.0;

  // Overlap snow falls of different sizes and speeds
  alpha += snow(p * 3.0 * tiling, 14.227, direction, 0.252);
  alpha += snow(p * 5.0 * tiling, 11.683, direction, 0.524);
  alpha += snow(p * 8.0 * tiling, 8.363, direction, 0.884);

  return vec4(1.0) * alpha * 0.8;
}