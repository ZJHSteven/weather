import { Vector2 } from "@owlbear-rodeo/sdk";

export interface WeatherConfig {
  type: "SNOW" | "RAIN" | "CLOUD" | "SAND" | "FIRE" | "FLOWER" | "BLOSSOM";
  tiling?: number;
  speed?: number;
  direction?: Vector2;
  density?: number;
}
