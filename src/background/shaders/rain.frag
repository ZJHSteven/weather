uniform float time;
uniform vec2 size;
uniform vec2 direction;
uniform float speed;
uniform float density;

#include util/fbm.frag;
#include util/line.frag;

float rain(vec2 p, float jitter, vec2 direction, float speed, float size, float lineLength) {
  // Move the input space in the given direction
  p += time * direction * speed * vec2(-1, 1);
  // Animate the fall of the rain
  float minDist = 10.;
  vec2 minPoint;
  animatedLine(p, jitter, lineLength * speed, speed, direction * vec2(-1, 1), minDist, minPoint);
  float line = step(size, minDist);
  return 1.0 - line;
}

float mist(vec2 p, float speed) {
  // Animate the space in the given direction
  vec2 anim = direction * time * speed * vec2(-1, 1) * 0.1;

  // Calculate the inner deformation with a slower animation
  vec2 innerP = p + anim * 0.1;
  vec2 q = vec2(fbm4(innerP), fbm4(innerP + vec2(5.452)));

  // Feed the inner fBM into another fBM like https://iquilezles.org/articles/warp/
  return fbm6(p + anim + q * 0.1);
}

half4 main(float2 coord) {
  vec2 p = coord / size;
  // Remove aspect ratio
  p.x *= size.x / size.y;
  float alpha = 0.0;

  // Exponential speed from the input
  float baseSpeed = pow(speed - 0.5, 2.0);
  // Tile per 20 grid cells
  float tiling = max(size.x, size.y) / 150.0 / 20.0;

  // Overlap rain with decreasing size and increasing jitter
  alpha += rain(p * 10.0 * tiling, 0.1, direction, baseSpeed + 1, 0.0044, 0.4);
  alpha += rain(p * 20.0 * tiling, 0.15, direction, baseSpeed + 3, 0.008, 0.4);
  if(density > 1) {
    alpha += rain(p * 30.0 * tiling, 0.2, direction, baseSpeed + 5, 0.014, 0.4);
  }
  if(density > 2) {
    alpha += rain(p * 50.0 * tiling, 0.4, direction, baseSpeed + 10, 0.008, 0.8);
  }
  if(density > 3) {
    alpha += rain(p * 80.0 * tiling, 0.8, direction, baseSpeed + 12, 0.008, 1.6);
  }
  if(density > 2) {
    float intensity = density > 3 ? 1.0 : 0.5;
    alpha += mist(p * 5.0 * tiling, baseSpeed + 5) * intensity;
  }

  return vec4(1.0) * alpha * 0.5;
}