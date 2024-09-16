uniform float time;
uniform vec2 size;
uniform vec2 direction;
uniform float tiling;
uniform float speed;

#include util/fbm.frag;

float func(vec2 p) {
  // Animate the space in the given direction
  vec2 anim = direction * time * speed;

  // Calculate the inner deformation with a slower animation
  vec2 innerP = p + anim * 0.5;
  vec2 q = vec2(fbm4(innerP), fbm4(innerP + vec2(5.452)));

  // Feed the inner fBM into another fBM like https://iquilezles.org/articles/warp/
  return fbm6(p + anim + q * 1.3);
}

half4 main(float2 coord) {
  vec2 p = coord / size;
  p.x *= size.x / size.y;
  float f = func(p * tiling);
  return vec4(1.0) * f;
}