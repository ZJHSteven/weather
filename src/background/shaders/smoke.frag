uniform float time;
uniform vec2 size;
uniform float tiling;
uniform float speed;

mat2 m = mat2(0.80, 0.60, -0.60, 0.80);

float noise(in vec2 p) {
  return sin(p.x) * sin(p.y);
}

float fbm4(vec2 p) {
  float f = 0.0;
  f += 0.5000 * noise(p);
  p = m * p * 2.02;
  f += 0.2500 * noise(p);
  p = m * p * 2.03;
  f += 0.1250 * noise(p);
  p = m * p * 2.01;
  f += 0.0625 * noise(p);
  return f / 0.9375;
}

float fbm6(vec2 p) {
  float f = 0.0;
  f += 0.500000 * (0.5 + 0.5 * noise(p));
  p = m * p * 2.02;
  f += 0.250000 * (0.5 + 0.5 * noise(p));
  p = m * p * 2.03;
  f += 0.125000 * (0.5 + 0.5 * noise(p));
  p = m * p * 2.01;
  f += 0.062500 * (0.5 + 0.5 * noise(p));
  p = m * p * 2.04;
  f += 0.031250 * (0.5 + 0.5 * noise(p));
  p = m * p * 2.01;
  f += 0.015625 * (0.5 + 0.5 * noise(p));
  return f / 0.96875;
}

vec2 fbm4_2(vec2 p) {
  return vec2(fbm4(p), fbm4(p + vec2(7.8)));
}

float func(vec2 p) {
  vec2 q = fbm4_2(p + (time) * speed);
  return fbm6(p + (4.0 * q));
}

half4 main(float2 coord) {
  vec2 p = (coord / size) * 2.0 - 1.0;
  float f = func(p * tiling);
  float alpha = clamp(f * (f * 0.5), 0, 0.35);
  return vec4(f) * alpha;
}