uniform sampler2D uBakedDayTexture;
uniform sampler2D uBakedNightTexture;
// uniform sampler2D uBakedNeutralTexture;
// uniform sampler2D uLightMapTexture;

uniform float uNightMix;
// uniform float uNeutralMix;

uniform vec3 uLightTvColor;
uniform float uLightTvStrength;

// uniform vec3 uLightDeskColor;
// uniform float uLightDeskStrength;

// uniform vec3 uLightPcColor;
// uniform float uLightPcStrength;

varying vec2 vUv;

// #pragma glslify: blend = require(glsl-blend/add)
// #pragma glslify: blend = require(glsl-blend/lighten)
// #pragma glslify: blend = require(glsl-blend/normal)
// #pragma glslify: blend = require(glsl-blend/screen)

float blendLighten(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}

void main()
{
    vec3 bakedDayColor = texture2D(uBakedDayTexture, vUv).rgb;
    vec3 bakedNightColor = texture2D(uBakedNightTexture, vUv).rgb;
    // vec3 bakedNeutralColor = texture2D(uBakedNeutralTexture, vUv).rgb;
    vec3 bakedColor = mix(bakedDayColor, bakedNightColor, uNightMix);
    // vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;

    float lightTvStrength = bakedDayColor.r * uLightTvStrength;
    bakedColor = blendLighten(bakedColor, uLightTvColor, lightTvStrength);

    // float lightPcStrength = lightMapColor.b * uLightPcStrength;
    // bakedColor = blend(bakedColor, uLightPcColor, lightPcStrength);

    // float lightDeskStrength = lightMapColor.g * uLightDeskStrength;
    // bakedColor = blend(bakedColor, uLightDeskColor, lightDeskStrength);

    gl_FragColor = vec4(bakedColor, 1.0);
}
